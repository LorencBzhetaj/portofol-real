import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {routes,content,template,makeSeo,makeSitemap} from './seo-tools.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
assert.equal(routes.length,21);assert.equal(content.services.length,9);assert.equal(content.projects.length,7);
for(const key of ['path','title','description','h1'])assert.equal(new Set(routes.map(r=>r[key])).size,21,key+' duplicates');
const draft={...template,siteUrl:'https://example.invalid/'};
for(const r of routes){
 assert.ok(r.path==='/'||!r.path.endsWith('/'));
 const a=makeSeo(r.path,draft);assert.match(a.metadata.robots,/noindex/);
 const parsed=JSON.parse(a.headHtml.match(/application\/ld\+json">([\s\S]*)<\/script>/)[1]);
 assert.ok(!parsed['@graph'].some(n=>['LocalBusiness','Review','AggregateRating','FAQPage'].includes(n['@type'])));
 assert.equal(a.metadata.openGraph.locale,'sq_AL');assert.match(a.headHtml,/og:locale/);
 for(const p of [r.featuredImage.path,r.featuredImage.ogPath])assert.ok(fs.existsSync(path.join(root,'public',p)),p);
 const copyName=r.path==='/'?'01-homepage':r.path.slice(1);
 const md=fs.readFileSync(path.join(root,'docs/handoff/copy',copyName+'.md'),'utf8');
 assert.ok(md.includes(r.h1)&&md.includes(r.title)&&md.includes(r.description));
 if(r.kind==='project')assert.ok(!md.includes('Shënim redaksional'));
}
for(const s of content.services){
 assert.equal(s.form.selectedService,s.slug);assert.equal(s.cta.href,'#kerkese-projekti');
 assert.equal(s.form.endpoint,null);assert.equal(s.form.deliveryMode,'disabled_until_configured');
 const expected=content.projects.filter(p=>p.relatedServiceSlugs.includes(s.slug)).map(p=>p.slug);
 assert.deepEqual(s.relatedProjectSlugs,expected);
 for(const slug of s.relatedServiceSlugs)assert.ok(content.services.some(x=>x.slug===slug));
}
for(const p of content.projects){
 assert.ok(!p.externalUrl.includes('/clone/'));assert.ok(new URL(p.externalUrl).protocol==='https:');
 for(const slug of p.relatedServiceSlugs)assert.ok(content.services.find(s=>s.slug===slug).relatedProjectSlugs.includes(p.slug));
}
assert.equal(template.siteUrl,null);assert.ok(Array.isArray(template.domainCandidates));for(const d of template.domainCandidates)assert.match(d,/^[a-z0-9][a-z0-9.-]+\.[a-z]{2,}$/i);
assert.throws(()=>makeSeo('/',draft,{production:true}));
const prod={...template,siteUrl:'https://lb-studio-validation.test/',productionReady:true,publicEmail:'test@example.invalid',privacyReady:true,formDeliveryVerified:true,publishablePaths:['/'],confirmedAssets:[routes[0].featuredImage.path,routes[0].featuredImage.ogPath]};
assert.match(makeSeo('/',prod,{production:true}).metadata.robots,/^index,/);
assert.match(makeSeo('/kontakt',prod,{production:true}).metadata.robots,/noindex/);
assert.equal((makeSitemap(prod,{production:true}).match(/<loc>/g)||[]).length,1);
assert.equal(makeSeo('/',prod,{production:true}).metadata.openGraph.images[0].width,1200);
assert.throws(()=>makeSeo('/',{...prod,privacyReady:false},{production:true}));
assert.throws(()=>makeSeo('/',{...prod,formDeliveryVerified:false},{production:true}));
assert.throws(()=>makeSeo('/',{...prod,publishablePaths:['/privatesia']},{production:true}));
assert.throws(()=>makeSeo('/',{...prod,publishablePaths:['/missing']},{production:true}));
const hub=makeSeo('/projektet',prod,{production:true}).jsonLd['@graph'].find(n=>n['@type']==='ItemList');assert.equal(hub.itemListElement.length,0);
console.log('PASS: 21 routes, 9 forms, reciprocal links, copy/JSON parity, real image paths, preview noindex, production/privacy/form guards, sitemap allowlist, OG locale.');

const renamed={...draft,domainCandidates:['lbstudio.al']};assert.match(makeSeo('/',renamed).metadata.robots,/noindex/);
