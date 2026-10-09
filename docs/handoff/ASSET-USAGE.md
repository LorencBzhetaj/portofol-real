# Ku përdoret çdo imazh

Rrugët /images/... shërbehen nga public/images/. Kartat origjinale ruhen pa ndryshime. Mos e vendos screenshot-in e gjithë homepage-it si faqe.

| Faqja / elementi | Skedari në public | Përdorimi |
| --- | --- | --- |
| Header/footer | `/images/brand/lb-studio-logo.svg` | Logo vektoriale e rindërtuar, transparent |
| `/` | `/images/lb-studio-hero-corrected.png` | Vetëm kompozimi i hero-s desktop/mobile; tekstet dhe CTA si HTML |
| `/sherbimet` | `/images/og/sherbimet.png` | OG/share dhe fallback featured; faqet kontakt/privatësi kanë layout tekstual, pa foto Gjeçaj |
| `/projektet` | `/images/og/projektet.png` | OG/share dhe fallback featured; faqet kontakt/privatësi kanë layout tekstual, pa foto Gjeçaj |
| `/sherbimet/dizajn-zhvillim-web` | `/images/services/dizajn-zhvillim-web.svg` | Imazh karte shërbimi dhe featured image në faqen e dedikuar; gjashtë shërbimet e zgjedhura edhe në homepage |
| `/sherbimet/dyqane-online` | `/images/services/dyqane-online.png` | Imazh karte shërbimi dhe featured image në faqen e dedikuar; gjashtë shërbimet e zgjedhura edhe në homepage |
| `/sherbimet/rezervime-web-apps` | `/images/projects/gjecaj-rezervime.jpg` | Imazh karte shërbimi dhe featured image në faqen e dedikuar; gjashtë shërbimet e zgjedhura edhe në homepage |
| `/sherbimet/seo-mirembajtje` | `/images/services/seo-mirembajtje.svg` | Imazh karte shërbimi dhe featured image në faqen e dedikuar; gjashtë shërbimet e zgjedhura edhe në homepage |
| `/sherbimet/chatbot-custom` | `/images/services/chatbot-custom.jpg` | Imazh karte shërbimi dhe featured image në faqen e dedikuar; gjashtë shërbimet e zgjedhura edhe në homepage |
| `/sherbimet/integrime-automatizime` | `/images/services/integrime-automatizime.svg` | Imazh karte shërbimi dhe featured image në faqen e dedikuar; gjashtë shërbimet e zgjedhura edhe në homepage |
| `/sherbimet/faqe-shumegjuheshe` | `/images/services/faqe-shumegjuheshe.svg` | Imazh karte shërbimi dhe featured image në faqen e dedikuar; gjashtë shërbimet e zgjedhura edhe në homepage |
| `/sherbimet/landing-pages` | `/images/services/landing-pages.jpg` | Imazh karte shërbimi dhe featured image në faqen e dedikuar; gjashtë shërbimet e zgjedhura edhe në homepage |
| `/sherbimet/menu-online-qr` | `/images/projects/gjecaj-menu-online.jpg` | Imazh karte shërbimi dhe featured image në faqen e dedikuar; gjashtë shërbimet e zgjedhura edhe në homepage |
| `/projektet/thethi-guide` | `/images/project-cards/thethi-guide.png` | Kartë origjinale kompozimi në /projektet dhe featured image në faqen individuale; gjithashtu homepage |
| `/projektet/gjecaj-guesthouse-restaurant` | `/images/project-cards/gjecaj-guesthouse-restaurant.png` | Kartë origjinale kompozimi në /projektet dhe featured image në faqen individuale |
| `/projektet/gjecaj-rezervime` | `/images/project-cards/gjecaj-rezervime.png` | Kartë origjinale kompozimi në /projektet dhe featured image në faqen individuale; gjithashtu homepage |
| `/projektet/baby-gifts-albania` | `/images/project-cards/baby-gifts-albania.png` | Kartë origjinale kompozimi në /projektet dhe featured image në faqen individuale |
| `/projektet/aleks-bzhetaj` | `/images/project-cards/aleks-bzhetaj.png` | Kartë origjinale kompozimi në /projektet dhe featured image në faqen individuale; gjithashtu homepage |
| `/projektet/mb-cartongesso` | `/images/project-cards/mb-cartongesso.png` | Kartë origjinale kompozimi në /projektet dhe featured image në faqen individuale |
| `/projektet/gjecaj-menu-online` | `/images/project-cards/gjecaj-menu-online.png` | Kartë origjinale kompozimi në /projektet dhe featured image në faqen individuale |
| `/kontakt` | `/images/og/kontakt.png` | OG/share dhe fallback featured; faqet kontakt/privatësi kanë layout tekstual, pa foto Gjeçaj |
| `/privatesia` | `/images/og/privatesia.png` | OG/share dhe fallback featured; faqet kontakt/privatësi kanë layout tekstual, pa foto Gjeçaj |

## OG
Për secilën URL përdor og_path nga image-manifest.csv / featuredImage.ogPath nga JSON. Janë 21 PNG 1200×630; SVG-të editable-og/ janë burime të modifikueshme, jo logo.

## Referencat origjinale
- design-original/01-dizajni/homepage-desktop.png dhe homepage-mobile.png: drejtimi vizual i plotë. Struktura e re me 3 projekte dhe 6 shërbime ka përparësi ndaj numrit të kartave brenda tyre.
- design-original/03-projektet/: të shtatë kartat origjinale. public/images/project-cards/ janë kopje identike, emërtuar sipas slug-ut.
- design-original/04-sherbimet/sherbimet-desktop-mobile.png: referencë e kartave; mos e pre për asset sepse ka rezolucion të kufizuar. Përdor imazhet e veçanta të tabelës.
- design-original/05-pamje-burimore/: burime origjinale për galeri. Thethi përfshin home, destinacione, map dhe chat.
- public/images/projects/*.jpg: screenshot-e reale/suplementare nga auditimi, jo zëvendësim i kompozimeve origjinale.
- Bogdani: vetëm shërbimi dyqane-online, etiketë Koncept dhe pa link. Lejet mbeten të pakonfirmuara.

## Responsive
Ruaj raportin origjinal të kartave me object-fit:contain dhe dimensione nga JSON. Në mobile përdor një kolonë. Nëse një kompozim ka titull të pjekur, mos e mbulo me titull tjetër mbi imazh; emri/linku HTML vendosen jashtë. Mos rindërto kompozimet me screenshot-e të tjera.

## Statusi
PNG-të origjinale mund të përmbajnë tekst dekorativ/demo; nuk janë provë funksionesh reale. Para publikimit rishiko statuset pa ndryshuar kompozimet në heshtje. Të dhënat e konfirmimit janë në final-confirmations/.
