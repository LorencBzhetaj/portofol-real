# Stack i rekomanduar

## Rekomandimi për LB STUDIO

Astro + TypeScript + CSS i komponentëve me design tokens. Përmbajtja ruhet fillimisht si JSON/Markdown e versionuar në Git. Faqet e përmbajtjes prerenderohen; vetëm endpoint-i i formularit ekzekutohet në server. Përdor adapterin e hostit të zgjedhur dhe runtime të mbështetur në datën e implementimit; mos ngulit versione nga ky dokument pa kontrolluar kompatibilitetin.

Arsyeja: faqja është portofol me përmbajtje, shërbime dhe një formular. Nuk ka kërkesë për login/dashboard në fazën e parë. Astro mbështet faqe statike dhe server rendering për rrugët që e kërkojnë. Ky është arsyetim për këtë projekt, jo garanci SEO ose premtim që çdo build do të jetë më i shpejtë.

| Pjesa | Rekomandim |
|---|---|
| Faqe/komponentë | Astro + TypeScript |
| Stili | CSS scoped + variabla, ivory/black; JavaScript minimal |
| Përmbajtje | JSON/Markdown me skema validimi; CMS më vonë nëse duhet editor |
| Formular | Endpoint POST /api/contact, validim serveri, kufij mesazhi, mbrojtje abuzimi, përgjigje reale |
| Hosting kandidat | Vercel me adapter Astro për endpoint; ende pa llogari/plan të zgjedhur |
| Email kandidat | Resend ose ofruesi ekzistues i konfirmuar; sekretet vetëm server-side |
| Repo | Repo privat i ri me emër të propozuar lb-studio-site, nëse nuk ekziston tashmë |
| Verifikim | Kontrollet e paketës, build/typecheck, test dërgimi në sandbox dhe browser desktop/mobile |

Nëse preferohet Hetzner, Astro mund të publikojë skedarë statikë; endpoint-i ka nevojë për backend të përshtatshëm. Për server rendering duhen verifikuar runtime/hosti; nuk supozohet se çdo plan web hosting ekzekuton Node.

Next.js do ta zgjidhja nëse portali i klientëve, autentikimi ose funksione të tjera aplikacioni bëhen pjesë e kërkesës, ose nëse repo ekzistues është tashmë Next.js. Nuk migrohet një repo funksional vetëm për t'iu përshtatur këtij propozimi.

## Struktura e propozuar

src/components, src/layouts, src/pages, src/content, src/styles; public/images; dokumente auditi te docs. Shërbimet dhe projektet përdorin shabllone të përbashkëta me URL të dedikuara. /api/contact nuk futet në sitemap. SEO nga paketa integrohet në layout, me një burim të vetëm për metadata.

## Rendi për të filluar pas auditit

1. Kontrollo nëse ka repo ekzistues. Nëse ka, ruaj konventat dhe inspekto branch/build.
2. Nëse nis nga zero, scaffolding Astro/TypeScript dhe version lockfile; pa publikim.
3. Integro përmbajtjen, komponentët dhe imazhet; përditëso preview-n sipas dizajnit të miratuar.
4. Staging noindex me formular të çaktivizuar dhe pa analytics.
5. Kontrollo 21 rrugët, responsive, aksesueshmërinë, lidhjet dhe metadata.
6. Pas të dhënave reale, aktivizo endpoint-in në mjedis prove dhe testo sukces/gabim. Mos e quaj dërgim te inbox vetëm nga një klikim.
7. Publikimi vetëm pasi mbyllen kushtet në START-HERE dhe kontrollohen index/robots/sitemap.

Repo nuk është krijuar, stack-u është rekomandim dhe asnjë shërbim i jashtëm nuk është aktivizuar nga kjo paketë.
