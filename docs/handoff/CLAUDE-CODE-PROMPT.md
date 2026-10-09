# Claude Code — auditim final dhe ndërtimi i LB STUDIO

Puno me këtë paketë si burimin aktual. Kryej auditimin fillestar dhe pastaj vazhdo me ndërtimin në staging pa pritur konfirmim për zgjedhje rutinë. Mos publiko production dhe mos aktivizo dërgime reale pa konfigurimet përkatëse.

## 1. Leximi dhe përparësia
Lexo START-HERE.md, ASSET-USAGE.md, DESIGN-SPEC.md, data/content.sq.json, data/cards.json, data/routes.seo.json, SEO-IMPLEMENTATION.md dhe final-confirmations/. Ky prompt dhe ASSET-USAGE kanë përparësi ndaj dokumenteve të vjetra për imazhet dhe logon. design-original/ ruan dizajnet origjinale. public/ ka skedarët për implementim. Mos kopjo dokumentet e auditimit në public. Skriptet historike Python janë arkivë; mos i ekzekuto sepse mund të mbishkruajnë ndryshimet e fundit.

## 2. Stack dhe implementimi
Kontrollo repo-n ekzistuese dhe AGENTS.md. Nëse ka stack ekzistues të përshtatshëm, ruaje. Për projekt të ri përdor Astro + TypeScript, CSS të komponentëve dhe renderim statik për faqet e përmbajtjes. Për formularin përdor endpoint server-side vetëm kur përcaktohet hosting-u/runtime-i. Vercel dhe Resend janë opsione të propozuara, jo ofrues të konfirmuar. Zgjidh versione aktuale të pajtueshme nga dokumentacioni zyrtar, fikso lockfile. Mos shto CMS, DB ose varësi të panevojshme.

## 3. Dizajni dhe fotot — kërkesë thelbësore
Ruaj pamjen krem/ivory dhe të zezë, hapësirat, hierarkinë, butonat e rrumbullakët dhe kartat e mockup-eve origjinale desktop/mobile. Mos e trajto DESIGN-PREVIEW.html si dizajn final: është preview strukturor. Mockup-et e plota kanë numra/CTA të vjetra; struktura e re më poshtë ka përparësi.
PËRDOR KARTAT ORIGJINALE TË DIZAJNUARA ME KOMPOZIMIN E PAMJEVE, JO screenshot-et e thjeshta që u përdorën më vonë në audit. Ato janë te public/images/project-cards/*.png dhe janë lidhur tashmë në JSON/manifest. Vendosi në homepage, listën /projektet dhe në krye të çdo faqeje projekti. Mos rigjenero, ndrysho apo rindërto kompozimet. Ruaj gjithë imazhin me object-fit:contain, pa prerë ekranet. Desktop/mobile përdorin të njëjtin skedar me shkallëzim responsive; mos u përpiq të bësh ndërfaqe interaktive nga elementet e pjekura brenda fotos. Titulli i lexueshëm dhe linku i kartës janë HTML jashtë kompozimit. Pamjet e veçanta te public/images/projects/ ose design-original/05-pamje-burimore/ shërbejnë vetëm si galeri shtesë dhe referencë, jo si zëvendësim i kartave origjinale.
Hero përdor /images/lb-studio-hero-corrected.png (vetëm kompozimi i ekraneve). H1, hyrja, header dhe dy CTA janë HTML një herë. Mbaj klinikën DEMO. public/reference/hero-legacy.png dhe design-original/02-hero/ janë referenca historike, jo hero për implementim.
Logo përdor /images/brand/lb-studio-logo.svg. Është SVG vektorial i rindërtuar nga PNG, jo eksporti origjinal i dizajnerit. Në header bëj kontroll lexueshmërie në mobile dhe mos deformo raportin. Mund të krijosh favicon vetëm nga monogrami ekzistues pa ridizajnuar identitetin. OG ekzistuese janë krem/zi 1200×630; përditësoji me SVG-në nëse nevojitet, duke ruajtur titujt dhe përmasat.
Imazhet e shërbimeve janë sipas ASSET-USAGE/data.cards. Landing pages duhet të përdorë Ora e Maleve. Menu online duhet të jetë edhe kartë projekti dhe shërbim. Bogdani mbetet Koncept, pa link, jo projekt i tetë. Mos pretendo se QR i vizatuar brenda mockup-it është funksional.

## 4. Faqet dhe përmbajtja
21 URL: homepage, /sherbimet + 9 faqe shërbimi, /projektet + 7 faqe projekti, /kontakt, /privatesia. Ruaj slug-et pa slash final sipas konfigurimit.
Homepage: hero → “Një faqe që i shërben biznesit tënd.” me katër pika vlere → 3 projekte (Thethi Guide, Gjeçaj rezervime, Aleks) → “Shiko të gjitha projektet” drejt /projektet → 6 shërbime (web, dyqane, rezervime, menu online, chatbot, SEO) dhe link /sherbimet → procesi “Si punojmë” → bashkëpunim online → FAQ → kontakt → footer.
Header: logo, Projektet, Shërbimet, Si punojmë, Kontakt. Navigimi “Si punojmë” nga faqet e brendshme shkon te /#si-punojme.
Çdo shërbim ka faqe të vet me përshkrim të zgjeruar, çfarë përfshin, audiencë, proces, FAQ, projekte të lidhura nga relatedServiceSlugs dhe formular të ngulitur me shërbimin të përzgjedhur. /kontakt?service=slug është fallback me canonical /kontakt.
Faqet e projekteve: nevoja, zgjidhja, funksione të kontrolluara, kompozimi origjinal, galeri opsionale, shërbime të lidhura, link i jashtëm dhe kontakt. Thethi ka etiketë të dukshme “Prezantim i ridizajnimit”: pamja mund të ndryshojë nga root-i live. Baby Gifts është katalog me WhatsApp, jo checkout i konfirmuar. Mos publiko editorialNote ose shënimet e brendshme.
Mos përdor emrin personal të pronarit në tekstet e markës. Emri i projektit të klientit Aleks mbetet si emër projekti. Mos shpik çmime, afate, rezultate, dëshmi, role apo leje.

## 5. URL-të dhe konfirmimet
Thethi https://thethi-guide.com/; Gjeçaj https://gjecaj.al/; rezervimet https://booking.gjecaj.al/; menu https://menu.gjecaj.al/; Baby Gifts https://www.dhurataperbebe.com/; Aleks https://www.aleksbzhetaj.com/; M.B https://www.mbcartongesso.com/. Bogdani pa link.
Domaini LB STUDIO ende nuk është vendosur: lbstudio.com ose .al; user shkroi lbsutdio.al, duhet konfirmim shkrimi para production. Nuk kemi kontakt publik/endpoint/identitet ligjor/ofrues të zgjedhur. approved:false dhe privacyReady:false mbeten deri në konfirmim. Pamja e një projekti nuk provon funksionet ose lejet. Mungesat nuk e bllokojnë ndërtimin lokal/staging.

## 6. SEO, aksesueshmëria dhe performanca
Përdor metadata-t unike, H1 dhe JSON-LD nga seo-tools.mjs/routes.seo.json. Canonical/OG absolute vetëm nga domaini real; staging noindex. Sitemap përfshin vetëm URL të miratuara. Mos shpik adresë, koordinata, review/rating ose LocalBusiness. areaServed është treg i synuar, jo zyrë fizike. Mos premto renditje në Google dhe mos përdor meta keywords si levë renditjeje. Ruaj FAQ të dukshme sipas politikës së paketës pa FAQPage.
Krijo form HTML real me labels, validim server-side kur aktivizohet, honeypot/rate limiting sipas runtime-it, gjendje loading/error/success reale. Deri në konfigurim dërgimi i çaktivizuar dhe pa sukses të simuluar. Politika e privatësisë është draft i brendshëm derisa të plotësohen të dhënat.
Përdor width/height, alt sipas përmbajtjes, AVIF/WebP responsive nga origjinalet pa prerje ose upscale; ruaj master-at PNG. Hero me prioritet nëse matjet tregojnë LCP, galeritë lazy. SVG pa rasterizim të panevojshëm. Tastierë/fokus, kontrast, menu mobile e aksesueshme, reduced motion dhe pa scroll horizontal.

## 7. Auditimi, zbatimi dhe dorëzimi
Fillimisht ekzekuto node verify.mjs dhe node seo-tools.mjs --demo; kontrollo manifestin, skedarët dhe logon. Raporto vetëm defektet reale dhe rregullo çfarë mund të rregullohet pa shpikur të dhëna. Pastaj ndërto faqen e plotë në staging.
Kontrollo build/typecheck, të gjitha routet, asset 404, linket reciproke, metadata/JSON-LD, gjendjet e formularit dhe navigimin mobile. Rendo browser në 1440, 768 dhe 390 px; verifiko mungesën e scroll horizontal, kompozimet e plota dhe lexueshmërinë. Mos pretendo kontrolle që nuk u kryen. Mos dërgo rezervime/formulare në faqet e klientëve për testim.
Dorëzo përmbledhje implementimi, rezultatet e kontrolleve, screenshot desktop/mobile nga faqja e implementuar, komandat për nisje dhe listë të shkurtër të dhënash që mungojnë për publikim. Vazhdo autonomisht punën e autorizuar; mos ndalo vetëm te plani.
