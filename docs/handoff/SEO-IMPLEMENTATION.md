# LB STUDIO — Përmbajtje dhe SEO për implementim

Përgatitur më 9 tetor 2026. Paketa përmban tekste, imazhe dhe specifikim për Claude Code, jo ndryshim i një website-i live. Domeni final nuk është zgjedhur. Modeli i konfirmuar është online, me Shqipërinë si treg kryesor dhe Italinë, Mbretërinë e Bashkuar e SHBA si zona të tjera shërbimi.

## Çfarë përmban

- Tekste shqip për homepage, /sherbimet, 9 faqe shërbimesh, /projektet, 7 faqe projektesh, /kontakt dhe draft /privatesia.
- Metadata të veçanta për 21 URL: title, description, H1, synime kërkimi, featured image dhe alt.
- Përmbajtja si Markdown për lexim dhe JSON për komponentët.
- Generator pa varësi për metadata dhe JSON-LD, shembuj preview me noindex, sitemap dhe robots.
- Specifikim për imazhet, targetimin gjeografik, lidhjet e brendshme dhe matjen.

## Vendimet e përmbajtjes

Homepage mban Thethi Guide, sistemin e rezervimeve Gjeçaj dhe Av. Aleks Bzhetaj. Butoni i portofolit hap /projektet. Gjashtë shërbimet kryesore janë dizajn web, dyqane online, rezervime, menu QR, chatbot dhe SEO. Nëntë shërbimet janë te /sherbimet dhe secili ka faqen e vet. Hero ruan klinikën si koncept vizual. Mos e paraqit klinikën si klient ose si projekt të përfunduar pa konfirmim.

Për projektet janë shkruar prezantime, jo pretendime për rezultate. Para publikimit konfirmo autorësinë, lejet e imazheve, statusin live/demo dhe funksionet. Veçanërisht Baby Gifts ka pamje të prezantimit, jo provë të një checkout-i. URL-të e dërguara nga pronari janë vendosur në data. Thethi hap domainin publik; pamjet janë të ridizajnimit. Baby Gifts është katalog me porosi WhatsApp, jo checkout i konfirmuar. Shtatë faqet e projekteve janë strukturë për implementim, jo URL që ekzistojnë sot.

Asnjë emër personal i pronarit nuk publikohet. Emri i Av. Aleks Bzhetaj është markë e projektit dhe ruhet. Nuk janë vendosur çmime, afate të prera, numra klientësh, dëshmi, vlerësime ose rezultate të sajuara. Hosting, pagesa, përkthime, automatizime dhe mirëmbajtje dallohen sipas marrëveshjes. Tekstet e ofertës janë draft për miratim, jo kushte kontraktuale.

## Fjalët kyçe dhe search intent

keywordTargets është hartë redaksionale. Nuk është meta keywords, listë me volum të verifikuar apo garanci renditjeje. Përdor fjalët natyrshëm në H1, hyrje, tituj dhe lidhje kur i përgjigjen përmbajtjes. Shkruaj shqip me ë/ç në tekst; URL-të mund të jenë pa diakritika. Shprehjet pa diakritika në listat e kërkimit janë variante orientuese.

Ndaje qëllimin e secilës faqe: homepage prezanton ofertën, /sherbimet ndihmon zgjedhjen, faqja e shërbimit trajton nevojën specifike, /projektet paraqet punën dhe faqet e projekteve japin shembuj. Mos e optimizo çdo faqe për të njëjtën shprehje. SEO & mirëmbajtje fokusohet te kujdesi teknik; gjuhët te struktura shumëgjuhëshe; integrimet te rrjedha mes mjeteve.

Përpara ndryshimit të këtyre objektivave përdor Search Console dhe, kur ka akses, të dhëna kërkimesh për tregun shqiptar. Nuk kemi kryer analizë të volumit, vështirësisë ose konkurrentëve në këtë paketë. Mos shpik vëllime kërkimi. Kontrollet pas publikimit tregojnë cilat shprehje kanë nevojë për përmbajtje më të mirë.

## Title, description dhe head

Përdor metadata.csv ose data/routes.seo.json si burim, jo titujt e lexuar nga mockup-et. Ka tituj të veçantë dhe përshkrime për çdo faqe. Gjatësia është orientuese: Google mund t’i shkurtojë ose riformulojë sipas pajisjes dhe kërkimit. Meta description mund të përdoret për snippet; nuk është premtim për renditje.

HTML: utf-8, viewport dhe lang="sq". Një H1 editorial i qartë, H2 për seksione dhe H3 për nënndarje. Rendero tekstin dhe metadata në HTML-në fillestare/SSR/SSG, sipas platformës. Mos i mbështet faqet në një foto të gjatë me tekst. Formularët dhe CTA-të duhet të jenë elemente reale.

Konfirmo domenin, HTTPS dhe www/apex. Zgjidh një origin dhe përdor 301/308 për variantet e tjera. Politika është pa trailing slash, përveç homepage. Zbato 301/308 nga variantet me slash dhe mbaje njësoj në canonical, sitemap, schema dhe lidhjet. Shembujt përdorin slash vetëm në homepage. Çdo faqe indexable ka canonical të vetin; mos canonicalizo të gjitha shërbimet te homepage. Canonical është sinjal, jo zëvendësim për ridrejtim ose noindex.

Formulari /kontakt?service=slug mban canonical /kontakt. Parametri përzgjedh shërbimin, nuk krijon faqe të re SEO. Faqet e suksesit dhe përmbajtja private nuk futen në sitemap. URL-të e vjetra që ndryshojnë duhet të ridrejtohen te ekuivalenti real; shmang ridrejtimin e çdo faqeje te homepage. Faqet e hequra pa ekuivalent përdorin 404/410.

Nuk shtojmë meta keywords, geo.position, geo.placename, geo.region ose ICBM për renditje. Google nuk përdor meta keywords dhe injoron meta tags të lokacionit. lang përdoret për gjuhën e dokumentit dhe aksesueshmërinë, jo si zëvendësim për tekst të përkthyer ose hreflang.

Open Graph: og:type=website, og:title, og:description, og:url, og:site_name dhe imazhi kur ekziston. X/Twitter: summary_large_image vetëm kur ka imazh. Nuk vendosim handle social të sajuar. og:locale përdor sq_AL për përmbajtjen shqip. Protokolli Open Graph përcakton formatin language_TERRITORY; përshtatshmëria e platformave të shpërndarjes kontrollohet me debugger pas publikimit. Nuk pretendojmë se çdo platformë e trajton njëlloj. Open Graph dhe featured images ndihmojnë prezantimin, nuk garantojnë rritje në renditje.

## JSON-LD

Përdor @graph dhe ID të qëndrueshme të bazuara në domenin real:

| Faqja | Entitetet |
| --- | --- |
| Homepage | Organization, WebSite, WebPage; ImageObject kur ka asset real |
| /sherbimet dhe /projektet | CollectionPage, ItemList, BreadcrumbList, entitetet e markës |
| Faqe shërbimi | WebPage, Service, BreadcrumbList, Organization, WebSite |
| Faqe projekti | WebPage, CreativeWork për prezantimin e portofolit, BreadcrumbList |
| /kontakt | ContactPage, BreadcrumbList, Organization, WebSite |

Service është markup semantik Schema.org. Mos premto rich result të posaçëm për shërbimet. Një CreativeWork përshkruan faqen/prezantimin e portofolit, jo një Product të shitur. Mos shëno aplikacionin si SoftwareApplication me çmim ose vlerësime të shpikura. Nuk shtojmë Offer, Product, AggregateRating, Review, SearchAction, Article ose HowTo pa përmbajtjen reale dhe përshtatshmërinë përkatëse. FAQ-të mbeten tekst i dukshëm; Google hoqi FAQ rich results në maj 2026 dhe dokumentacionin më pas. FAQPage nuk është prioritet dhe nuk gjenerohet në këtë paketë.

Organization përfaqëson LB STUDIO, jo klientët e portofolit. sameAs përdoret vetëm për profile zyrtare të LB STUDIO; faqet e klientëve nuk janë sameAs të studios. availableLanguage aktualisht sq, sepse vetëm këto tekste janë përgatitur dhe nuk kemi konfirmim për shërbimin e klientit në gjuhë të tjera.

Modeli online përdor areaServed për AL, IT, GB dhe US. Nuk vendosim LocalBusiness, adresë, geo, openingHours, hartë apo qytet të sajuar. Të gjitha të dhënat schema duhet të përputhen me përmbajtjen e dukshme. AreaServed nuk jep pozicion në Maps ose afërsi artificiale me klientët.

Në një projekt me plugin SEO ekzistues, kontrollo schema-n e gjeneruar prej tij. Bashko identitetet dhe shmang Organization/Website të dyfishuara me të dhëna kontradiktore. Serialize JSON-LD me escaping të karakterit < për të shmangur mbylljen e script-it nga përmbajtja. Shembulli e bën këtë.

## Domeni, kontaktet dhe gatishmëria

data/site-config.template.json ka null për domenin, email-in, telefonin dhe logon. Mos publiko null si tekst apo example.invalid. Kopjo si site-config.json dhe plotëso vetëm të dhëna të konfirmuara. confirmedAssets përmban vetëm paths të imazheve që janë eksportuar dhe ekzistojnë vërtet. publishablePaths përmban URL-të e miratuara për indeksim. productionReady aktivizohet vetëm pas kontrollit.

seo-tools.mjs është referencë për integrim, jo plugin automatik. Prova: node seo-tools.mjs --demo. Prodhimi: node seo-tools.mjs data/site-config.json. Shembujt demo kanë noindex dhe sitemap bosh. Prova lokale nuk është validim në Google Rich Results Test. Në implementim lidhe logjikën me framework-un dhe përmbajtjen e renderuar.

## Targetimi gjeografik

Teksti i dukshëm thotë se punojmë online në Shqipëri, Itali, UK dhe SHBA, me Shqipërinë si treg kryesor. Nuk kemi konfirmuar qytet ose zyrë. Mos krijo faqe për çdo qytet duke zëvendësuar vetëm emrin. Mos vendos 'Tiranë' në çdo title ose adresën e një klienti si adresë të LB STUDIO.

Për Google Business Profile duhet të ekzistojë përshtatshmëri reale për biznes që takon klientët fizikisht, sipas rregullave të Google. Biznesi vetëm online nuk është i përshtatshëm për profil; kjo paketë nuk propozon krijimin e një profili me zyrë virtuale. Nëse modeli ndryshon, kontrollo sërish eligibility, adresën dhe zonën e shërbimit.

Renditja lokale lidhet me relevancën, distancën dhe njohjen e biznesit; meta tags apo koordinata të sajuara nuk i zëvendësojnë këto. Shërbimi online në disa vende nuk justifikon rrjet profilesh lokale ose faqe bosh për qytete.

## Gjuhët dhe hreflang

Publikimi fillestar është shqip në URL-të e kësaj pakete. Mos shto hreflang en/it pa faqe reale të përkthyera. Kur përgatiten versionet: sq për shqip, en për anglisht të përgjithshme, it për italisht; en-GB/en-US vetëm nëse ka versione vërtet të përshtatura për ato tregje.

Çdo version liston veten dhe ekuivalentët me lidhje reciproke. Canonical i versionit anglisht mbetet anglisht, jo shqip. Përdor x-default vetëm kur përcaktohet një faqe fallback e qëndrueshme. URL-të /en/ dhe /it/ janë propozim për fazë të ardhshme, jo të publikuara. Mos krijo hreflang për faqe pa ekuivalent. Mos detyro ridrejtim sipas IP-së; lejo zgjedhje gjuhe nga navigimi.

## Featured images dhe performance

Imazhet e veçanta janë te public/images dhe inventari te image-manifest.csv. Nuk përdoret prerja e board-it të vjetër të shërbimeve. Screenshot-et janë origjinale në dimensionet reale; tre ilustrime janë SVG të redaktueshme pa marka të huaja. Çdo faqe ka OG PNG 1200×630 të renderuar nga SVG i vet. Të gjitha kërkojnë kontroll editorial para confirmedAssets. Hero-ja e korrigjuar ruan klinikën me etiketën DEMO. Është mockup kompozimi; ndërto tekstin dhe navigimin si HTML dhe përdor screenshot-et reale për ekranet. Logoja SVG origjinale mbetet për plotësim.

Propozim teknik: OG 1200×630 px; karta projektesh rreth 1600×1000 px ose ratio që i përshtatet dizajnit; foto shërbimesh 1200×750 px; variante responsive sipas layout-it. Këto janë madhësi pune, jo kërkesa universale të Google. Ruaj raportin dhe përmbajtjen, mos deformo screenshot-et. WebP/AVIF sipas mbështetjes, srcset/sizes dhe width/height. Mbaj origjinalet për eksport. Testo peshën dhe lexueshmërinë, mos rrit artificialisht rezolucionin.

Featured image është pamja kryesore e faqes; OG mund të jetë crop me të njëjtin identitet. Google zgjedh imazhet vetë: primaryImageOfPage nuk e detyron thumbnail-in e rezultatit. Alt përshkruan pamjen që shfaqet, jo një listë fjalësh kyçe. Elementet dekorative kanë alt bosh; CTA si tekst real nuk përsëritet nga një foto. Teksti nga screenshot-i nuk zëvendëson copy-n e renderuar.

Mos lazy-load imazhin LCP të hero-s. Përdor prioritet vetëm për asset-in kryesor, jo për të gjitha fotot. Lazy-load projektet dhe shërbimet poshtë fold-it. Rezervo dimensionet për të zvogëluar CLS. Mos ngarko desktop dhe mobile art të plotë njëkohësisht pa nevojë. Mos e përdor screenshot-in e gjithë homepage-it si faqen vetë. Shmang widget-e të panevojshme dhe animacione që pengojnë leximin.

Objektivat Core Web Vitals: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 në percentilin 75 të vizitave kur ka të dhëna reale. Testet laboratorike ndihmojnë diagnostikimin, por nuk janë provë e këtyre rezultateve te të gjithë përdoruesit. Core Web Vitals ndihmojnë përvojën dhe përdoren nga sistemet e renditjes; kalimi i pragjeve nuk garanton vend të parë.

## Lidhjet dhe indeksimi

Header: /projektet, /sherbimet, /#si-punojme, /kontakt. Homepage ka anchor #projekte dhe #si-punojme. Kartat e shërbimeve hapin faqen e dedikuar. Projektet hapin prezantimin e brendshëm; butoni 'Hap website-in' përdor URL-në e jashtme vetëm pasi konfirmohet. Kur mungon, hiqe butonin, mos përdor # ose domain të hamendësuar.

Çdo shërbim lidhet me shërbimet përkatëse dhe projektet me të cilat ka lidhje reale. Breadcrumb-et e dukshme dhe JSON-LD përputhen. Përdor <a href> të crawlueshme, jo vetëm onClick. Faqet shërbim janë të arritshme nga hub-i dhe nuk mbeten të izoluara. Mos vendos rel=nofollow automatikisht për çdo klient; etiketo sponsored vetëm kur lidhja është realisht me pagesë/sponsorizim.

Sitemap përfshin vetëm URL canonical të publikuara, 200 dhe indexable. Mos vendos preview, noindex, /api, login ose parametra formulari. lastmod përdoret vetëm me datën reale të ndryshimit të përmbajtjes, jo me datën e çdo build-i. Nuk duhen priority/changefreq për të pretenduar indeksim më të shpejtë. Referenca pa data të besueshme i lë lastmod pa vendosur.

Robots.txt nuk është mbrojtje e përmbajtjes private dhe nuk e garanton heqjen nga indeksi. Për staging përdor autentikim kur është e mundur dhe noindex në përgjigje. Nëse Google duhet të lexojë noindex, mos e blloko atë URL në robots. Për prodhim kontrollo që robots/noindex e preview-t nuk trashëgohen.

## Matja dhe puna pas publikimit

Verifiko pronën Domain në Search Console me akses të pronarit. Dërgo sitemap-in, kontrollo homepage, hub-et dhe disa faqe shërbimesh me URL Inspection. Kontrollo canonical, HTML e renderuar, përgjigjen 200 dhe mobile. Validimi Schema.org dhe Google Rich Results Test kanë role të ndryshme: Service/CreativeWork mund të mos japin rezultat të mbështetur nga Google; kjo nuk do të thotë se markup-i semantik është automatikisht i gabuar.

Eventet e propozuara: service_view, project_view, click_project_website, contact_start dhe generate_lead. generate_lead dërgohet vetëm pas suksesit të formularit. Parametrat mund të jenë service_slug, project_slug dhe page_path; mos dërgo emër, email, telefon ose mesazhin te analytics. Mos i numëro klikimet e butonit si kërkesa të dorëzuara. Konfigurimi i analytics dhe pëlqimit trajtohet sipas tregjeve dhe mjeteve të përdorura.

Mbaj baseline të queries/pages/countries, impressions, clicks, CTR dhe kërkesave reale. Bëj kontroll fillestar të indeksimit pas publikimit dhe rishikim mujor të përmbajtjes. Average position është tregues agregat, jo vend fiks për çdo kërkim. Vlerëso cilësinë e lead-eve bashkë me trafikun. Shmang matje që ngatërrojnë bot-et ose testet me klientë.

Ndërto reputacion me prezantime reale projektesh, profile konsistente dhe lidhje editoriale kur ka arsye. Mos blej rrjete link-esh dhe mos krijo reviews të sajuara. Referencat e klientëve publikohen me konfirmim. Nuk janë premtuar numër backlinks, afat indeksimi ose pozicione.

## Rendi i implementimit për Claude Code

1. Lexo README, copy dhe data. Kontrollo stack-un ekzistues; mos zgjedh framework tjetër pa arsye.
2. Konfirmo domenin, kontaktin publik, projektet dhe kushtet e ofertës.
3. Implemento homepage-in e përmbledhur, hub-et dhe nëntë faqet e shërbimeve. Faqet e projekteve publikohen kur statusi është i konfirmuar.
4. Eksporto imazhet dhe OG, verifiko path-et, përditëso confirmedAssets.
5. Lidh metadata, schema, canonical, sitemap dhe robots me një burim të vetëm.
6. Përgatit politikën reale të privatësisë për formularin dhe analytics; teksti ligjor nuk është përgatitur këtu.
7. Kontrollo responsive, aksesueshmërinë, formularin, gabimet dhe ngarkimin.
8. Konfirmo publishablePaths, aktivizo productionReady dhe kontrollo prodhimin.
9. Verifiko Search Console dhe matjen; dokumento çfarë është provuar dhe çfarë mbetet.

## Kriteret e pranimit

- 9 shërbime, secili me faqe dhe tekst të veçantë; 3 projekte në homepage, 7 në portofol pas miratimit.
- Pa emrin personal të pronarit, qytete/zyra të sajuara ose rezultate të pakonfirmuara.
- Title, description dhe canonical unik për çdo URL; pa example.invalid, null ose placeholder në prodhim.
- Structured data me provider të njëjtë, ID të qëndrueshme dhe përputhje me tekstin.
- Pa URL imazhesh që japin 404; alt i përshtatshëm; hero pa lazy-load të LCP.
- Sitemap përputhet me faqet 200 indexable; preview mbetet noindex.
- Formulari dërgon realisht dhe shfaq success/error sipas përgjigjes; asnjë PII në analytics.
- Gjuhët e ardhshme kanë përkthime dhe hreflang reciprok, jo kopje të faqes shqip.
- Kontrolli Google/Schema.org dhe testet e framework-ut dokumentohen pas implementimit. Kjo paketë ka vetëm kontrolle lokale të të dhënave dhe generatorit.

## Burimet

SOURCES.md përmban lidhjet zyrtare të Google dhe Schema.org të kontrolluara më 9 tetor 2026. Mos përdor udhëzime të vjetra për FAQ rich results, meta keywords ose sitelinks search box si bazë për implementim.


## Shtesat v3

Formular i ngulitur te çdo shërbim me selectedService. Lidhjet relatedProjects dhe relatedServices janë reciproke. Nëse një shërbim nuk ka shembull të konfirmuar, seksioni i projekteve fshihet; nuk shpiket projekt. /privatesia është draft, noindex dhe jashtë sitemap deri në plotësim. Publication guards kërkojnë të dhënat e kontaktit, privatësinë dhe testin e dërgimit. Rendero vetëm fusha të njohura; editorial-review.json nuk është përmbajtje publike.
