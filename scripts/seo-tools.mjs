import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
// Run from the project root (npm scripts / Astro build); bundling changes import.meta.url, so cwd is the stable root.
const root=process.cwd();
const read=(p)=>JSON.parse(fs.readFileSync(path.join(root,'src',p),'utf8'));
export const content=read('data/content.sq.json');
export const routes=read('data/routes.seo.json');
export const template=read('data/site-config.template.json');
const countries={AL:'Albania',IT:'Italy',GB:'United Kingdom',US:'United States'};
const absolute=(base,p)=>new URL(p,base).href;
const esc=(s)=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const schemaText=(obj)=>JSON.stringify(obj).replaceAll('<','\\u003c');

function assertConfig(c,production){
  if(!c.siteUrl)throw new Error('Plotëso siteUrl; domeni final ende nuk është konfirmuar.');
  const u=new URL(c.siteUrl);
  if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.pathname!=='/')throw new Error('siteUrl duhet të jetë origin HTTPS, pa path, query ose credentials.');
  if(production&&(u.hostname.endsWith('.invalid')||u.hostname==='example.com'||!c.productionReady))throw new Error('Konfigurim prove ose publikim i pakonfirmuar.');
  if(c.businessMode!=='online')throw new Error('Modeli aktual është online. Ndryshimi kërkon rishikim të schema-s.');
  if(c.physicalAddress||c.geo)throw new Error('Mos shto adresë/koordinata për modelin online të konfirmuar.');
  // English (src/data/content.en.json) was added as a full translation; other languages still need real text.
  if(c.languagesPublished.some(l=>!['sq','en'].includes(l)))throw new Error('Gjuhët e mbështetura janë sq dhe en. Gjuhët shtesë kërkojnë tekst dhe metadata reale.');
  if(production&&(!c.privacyReady||!c.formDeliveryVerified))throw new Error('Plotëso privatësinë dhe verifiko dërgimin real të formularit para publikimit.');
  if(production&&c.publishablePaths.some(p=>!routes.some(r=>r.path===p)))throw new Error('publishablePaths përmban URL të panjohur.');
  if(production&&c.publishablePaths.includes('/privatesia')&&content.privacy.draftOnly)throw new Error('Privatësia është ende draft në përmbajtje.');
  if(production&&(!c.publicEmail&&!c.publicPhone))throw new Error('Duhet të konfirmohet të paktën një kontakt publik.');
}
function imageNode(r,c){
  const image=r.featuredImage;
  if(!c.confirmedAssets.includes(image.path))return null;
  return {'@type':'ImageObject','@id':absolute(c.siteUrl,r.path)+'#primaryimage',url:absolute(c.siteUrl,image.path),contentUrl:absolute(c.siteUrl,image.path),caption:image.alt,...(image.width?{width:image.width,height:image.height}: {})};
}
function org(c){
  const o={'@type':['Organization','LocalBusiness'],'@id':absolute(c.siteUrl,'/#organization'),name:c.brand,url:absolute(c.siteUrl,'/'),description:c.brandDescription,areaServed:c.areaServed.map(a=>({'@type':'Country',name:countries[a.code]})),priceRange:'$$',knowsAbout:['Web design','Web development','Online booking systems','Digital menus','E-commerce'],knowsLanguage:['sq','en']};
  if(c.logoPath&&c.confirmedAssets.includes(c.logoPath))o.logo={'@type':'ImageObject',url:absolute(c.siteUrl,c.logoPath)};
  if(c.publicEmail)o.email=c.publicEmail;
  if(c.publicPhone)o.telephone=c.publicPhone;
  if(c.socialProfiles.length)o.sameAs=c.socialProfiles;
  if(c.publicEmail||c.publicPhone)o.contactPoint=[{'@type':'ContactPoint',contactType:'project enquiries',...(c.publicEmail?{email:c.publicEmail}:{}),...(c.publicPhone?{telephone:c.publicPhone}:{}),availableLanguage:['sq']}];
  return o;
}
function faqSchema(items,pageUrl){
  if(!items||!items.length)return null;
  return {'@type':'FAQPage','@id':pageUrl+'#faq',mainEntity:items.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))};
}
function crumbs(r,c){
  const list=[['Kreu','/']];
  if(r.path==='/')return null;
  if(r.kind==='service')list.push(['Shërbimet','/sherbimet']);
  if(r.kind==='project')list.push(['Projektet','/projektet']);
  const label=r.kind==='service'?content.services.find(s=>s.path===r.path).name:r.kind==='project'?content.projects.find(p=>p.path===r.path).name:r.path==='/sherbimet'?'Shërbimet':r.path==='/projektet'?'Projektet':r.path==='/privatesia'?'Privatësia':'Kontakt';
  list.push([label,r.path]);
  return {'@type':'BreadcrumbList','@id':absolute(c.siteUrl,r.path)+'#breadcrumb',itemListElement:list.map(([name,p],i)=>({'@type':'ListItem',position:i+1,name,item:absolute(c.siteUrl,p)}))};
}
export function makeSeo(routePath,c,{production=false}={}){
  assertConfig(c,production);
  const r=routes.find(r=>r.path===routePath);
  if(!r)throw new Error('URL e panjohur: '+routePath);
  const url=absolute(c.siteUrl,r.path),orgId=absolute(c.siteUrl,'/#organization'),websiteId=absolute(c.siteUrl,'/#website');
  const graph=[org(c),{'@type':'WebSite','@id':websiteId,url:absolute(c.siteUrl,'/'),name:c.brand,inLanguage:'sq',publisher:{'@id':orgId}}];
  const primary=imageNode(r,c),bc=crumbs(r,c);
  const page={'@type':r.kind==='collection'?'CollectionPage':r.kind==='contact'?'ContactPage':'WebPage','@id':url+'#webpage',url,name:r.title,description:r.description,inLanguage:'sq',isPartOf:{'@id':websiteId},publisher:{'@id':orgId}};
  if(primary){graph.push(primary);page.primaryImageOfPage={'@id':primary['@id']};}
  if(bc){graph.push(bc);page.breadcrumb={'@id':bc['@id']};}
  if(r.kind==='service'){
    const s=content.services.find(s=>s.path===r.path),id=url+'#service';
    page.mainEntity={'@id':id};
    graph.push({'@type':'Service','@id':id,name:s.name,serviceType:s.name,description:s.intro,url,provider:{'@id':orgId},areaServed:c.areaServed.map(a=>({'@type':'Country',name:countries[a.code]})),...(primary?{image:primary.url}:{}),mainEntityOfPage:{'@id':page['@id']}});
    const faq=faqSchema(s.faq,url);if(faq)graph.push(faq);
  }
  if(r.kind==='project'){
    const p=content.projects.find(p=>p.path===r.path),id=url+'#portfolio-presentation';
    page.mainEntity={'@id':id};
    graph.push({'@type':'CreativeWork','@id':id,name:p.name,description:p.intro,url,inLanguage:'sq',publisher:{'@id':orgId},mainEntityOfPage:{'@id':page['@id']},...(primary?{image:primary.url}:{})});
  }
  if(r.kind==='home'){
    const faq=faqSchema(content.home.faq,url);if(faq)graph.push(faq);
  }
  if(r.kind==='collection'){
    const items=(r.path==='/sherbimet'?content.services:content.projects).filter(it=>!production||c.publishablePaths.includes(it.path));
    const id=url+'#items';page.mainEntity={'@id':id};
    graph.push({'@type':'ItemList','@id':id,itemListElement:items.map((it,i)=>({'@type':'ListItem',position:i+1,name:it.name,url:absolute(c.siteUrl,it.path)}))});
  }
  graph.push(page);
  const publish=production&&c.publishablePaths.includes(r.path);
  const og=c.confirmedAssets.includes(r.featuredImage.ogPath)?absolute(c.siteUrl,r.featuredImage.ogPath):null;
  const metadata={title:r.title,description:r.description,canonical:url,language:'sq',robots:publish?'index,follow,max-image-preview:large':'noindex,follow',openGraph:{type:'website',title:r.title,description:r.description,url,siteName:c.brand,locale:c.openGraphLocale||'sq_AL',...(og?{images:[{url:og,width:r.featuredImage.ogWidth||1200,height:r.featuredImage.ogHeight||630,alt:r.featuredImage.ogAlt||r.featuredImage.alt}]}:{})},twitter:{card:og?'summary_large_image':'summary',title:r.title,description:r.description,...(og?{images:[og]}:{})}};
  // Open Graph locale uses language_TERRITORY. Confirm platform previews after publishing.
  const tags=['<title>'+esc(metadata.title)+'</title>','<meta name="description" content="'+esc(metadata.description)+'">','<link rel="canonical" href="'+esc(url)+'">','<meta name="robots" content="'+esc(metadata.robots)+'">'];
  for(const [property,val] of Object.entries({type:'website',title:r.title,description:r.description,url,site_name:c.brand,locale:c.openGraphLocale||'sq_AL'}))tags.push('<meta property="og:'+property+'" content="'+esc(val)+'">');
  if(og)for(const [property,val]of Object.entries({image:og,'image:width':r.featuredImage.ogWidth||1200,'image:height':r.featuredImage.ogHeight||630,'image:alt':r.featuredImage.ogAlt||r.featuredImage.alt}))tags.push('<meta property="og:'+property+'" content="'+esc(val)+'">');
  for(const [name,val]of Object.entries({card:metadata.twitter.card,title:r.title,description:r.description,...(og?{image:og}: {})}))tags.push('<meta name="twitter:'+name+'" content="'+esc(val)+'">');
  const schema={'@context':'https://schema.org','@graph':graph};
  tags.push('<script type="application/ld+json">'+schemaText(schema)+'</script>');
  return {metadata,jsonLd:schema,headHtml:tags.join('\n')};
}
export function makeSitemap(c,{production=false}={}){
  assertConfig(c,production);
  const active=production?routes.filter(r=>c.publishablePaths.includes(r.path)):[];
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+active.map(r=>'  <url><loc>'+esc(absolute(c.siteUrl,r.path))+'</loc></url>').join('\n')+'\n</urlset>\n';
}
export function makeRobots(c,{production=false}={}){
  assertConfig(c,production);
  if(!production)return '# Preview: use noindex on all pages; protect staging with authentication.\nUser-agent: *\nAllow: /\n';
  return 'User-agent: *\nAllow: /\n\nSitemap: '+absolute(c.siteUrl,'/sitemap.xml')+'\n';
}
const isMain=process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url);
if(isMain){
  const demo=process.argv.includes('--demo');
  const c=demo?{...template,siteUrl:'https://example.invalid/'}:JSON.parse(fs.readFileSync(process.argv[2]||path.join(root,'src/data/site-config.json'),'utf8'));
  const out=path.join(root,demo?'.seo-preview':'.seo-production');fs.mkdirSync(out,{recursive:true});
  const production=!demo;
  for(const r of routes){const data=makeSeo(r.path,c,{production});const name=r.path==='/'?'home':r.path.slice(1).replaceAll('/','--');fs.writeFileSync(path.join(out,name+'.json'),JSON.stringify(data,null,2)+'\n');fs.writeFileSync(path.join(out,name+'.head.html'),data.headHtml+'\n');}
  fs.writeFileSync(path.join(out,'sitemap.xml'),makeSitemap(c,{production}));
  fs.writeFileSync(path.join(out,'robots.txt'),makeRobots(c,{production}));
  console.log(JSON.stringify({mode:demo?'preview-noindex':'production',pages:routes.length,sitemapPages:production?c.publishablePaths.length:0,output:out}));
}
