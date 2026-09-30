# FIXYOUREYES — Esperimento di YouTube Thumbnail Reference System con ChatGPT & Antigravity

![FIXYOUREYES Feed — 16:9 Single Column Swiss Stream](assets/fixyoureyes-home-preview.png)

Questo non è un classico progetto software: è un **esperimento editoriale e di ricerca visiva**.  
L'idea di partenza: **verificare se le copertine dei magazine indipendenti e il graphic design modernista possano salvare le miniature di YouTube dalla mediocrità del clickbait, unendo prompt calibrati e direzione artistica in un workflow concreto**.

Il punto di questa repo non è il codice né l'applicazione. È l'**esperimento in sé**: la documentazione del metodo, il test del prompt master con ChatGPT e il dietro le quinte del pair programming con Google Antigravity. L'applicazione web interattiva è distribuita separatamente su Netlify.

**Esperimento:** *FIXYOUREYES — 64 AI References & Creative Direction Vault*  
**Autore:** Emanuele BDC  
**Crediti:** Made with ♥ in Milan by Emanuele BDC  
**Web App Live:** [https://fixyoureyes.netlify.app](https://fixyoureyes.netlify.app)  
**Linktree:** [linktr.ee/emaf205](https://linktr.ee/emaf205) · **Email:** [emagumroad@gmail.com](mailto:emagumroad@gmail.com)

---

## Cosa contiene questa repo

```text
.
├── README.md
└── assets/
    ├── fixyoureyes-home-preview.png
    ├── fixyoureyes-modal-preview.png
    └── fixyoureyes-menu-preview.png
```

Niente codice sparso, niente HTML, niente pacchetti pesanti da 200 MB. Solo la documentazione dell'esperimento, il racconto del workflow e gli output visivi. L'applicazione completa è distribuita e fruibile su Netlify.

---

## Obiettivo dell'esperimento (dal mio punto di vista)

Volevo capire se fosse possibile ribaltare il linguaggio visivo con cui oggi si presentano i video su YouTube.

Apri la home page della piattaforma ed è sempre la solita fiera del grottesco: occhi sgranati, bocche spalancate in espressioni di finto stupore, frecce rosse fluorescenti puntate sul nulla, sagome ritagliate con bordi bianchi spessi e scritte urlate con gradienti giallo-blu.

Funziona per il clickbait becero? Forse sì, per chi monetizza il vuoto. Ma se produci contenuti con un minimo di sostanza — saggi visivi, analisi tech, podcast culturali, documentari o lezioni — quella grafica distrugge l'autorevolezza del video prima ancora che qualcuno prema play. Comunica insicurezza e disperazione.

Mi sono fermato a riflettere su un paradosso evidente:

> Perché una copertina del *The New Yorker*, di *Monocle*, di *Wired*, o un manifesto di graphic design svizzero del '68 riescono a catturare lo sguardo all'istante senza bisogno di gridare, mentre su YouTube sembra obbligatorio sembrare disperati?

La risposta è che il design editoriale non usa l'isterismo: usa la **tensione visiva**, la **griglia geometrica**, una palette cromatica controllata e la forza di una **metafora concettuale**.

Quando sono arrivati i modelli generativi (ChatGPT, Midjourney, Flux), la maggior parte dei creator ha iniziato a usarli per generare altre miniature orrende: volti di plastica lucida, finti robot azzurri fluo, città cyberpunk generiche e dashboard finanziarie inventate. Il problema non era l'AI. Il problema era la **totale assenza di direzione artistica**.

L'idea dell'esperimento è stata quindi: **trattare ogni miniatura come la copertina di una rivista indipendente**, fornendo a ChatGPT una libreria curata di 64 ancore visive (reference) in formato nativo 16:9 con palette quantizzate e prompt calibrati sul contenuto del video.

---

## Dietro le quinte: la sessione con Google Antigravity

Questo esperimento è nato e si è evoluto in una sessione di lavoro serrata in chat con Google Antigravity. Non un semplice "scrivimi il codice", ma un continuo confronto di direzione artistica e debugging visivo.

### 1. Dalla griglia e-commerce alla colonna editoriale
All'inizio l'interfaccia si presentava come una tipica galleria a 4 colonne: caotica, affollata, sembrava uno store di prodotti digitali. L'istruzione in chat è stata netta:
> *"Vorrei in home un'unica colonna di immagini, non 4. E su desktop tutto centrato, non da bordo a bordo: solo colonna centrale a 800px con spazio generoso a lato e distanziamento verticale da rivista."*

Antigravity ha riscritto il layout: un flusso verticale disteso, con margini ampi e un ritmo che permette di osservare ciascuna reference senza l'ansia visiva delle griglie dense.

### 2. Rigore svizzero a zero bordi arrotondati
Volevo che l'interfaccia stessa incarnasse la filosofia dell'esperimento:
> *"Niente angoli arrotondati, zero border-radius su bottoni, card, tag e modali. Fondo bianco puro `#ffffff`, nero solido `#000000` e accenti rossi decisi. Niente dark mode o gradienti decorativi."*

### 3. "Sistema la scheda che fa schifo" (Il bug del 16:9)
Il momento più critico è arrivato testando il click sulle singole miniature. La scheda di dettaglio si apriva deformata: su desktop si allargava a 1610px e, a causa di un `flex-shrink: 1` non vincolato, il frame dell'immagine collassava verticalmente da 448px a 316px. Il rapporto 16:9 si trasformava in un 2.5:1 schiacciato, generando due enormi **bande nere laterali da 117px** che rovinavano l'intera esperienza.

Con Antigravity abbiamo vivisezionato il CSS:
- ripristinato il wrapper a `max-width: 800px;`;
- bloccato `aspect-ratio: 16 / 9;` e `flex-shrink: 0;`;
- impostato `object-fit: cover;` sull'immagine originale;
- reso la barra dei comandi (`← PREV`, contatore, `NEXT →`, `✕`) **sticky in testa alla modale**, così da restare fissa durante lo scorrimento del prompt e della palette.
Risultato: **zero barre nere**, immagine a tutta larghezza e navigazione fulminea anche da tastiera.

### 4. La decisione sui repository: scorporare codice e articolo
Inizialmente avevamo caricato su GitHub l'intera applicazione con tutti i 200 MB di immagini PNG ad alta risoluzione. Ma ripensandoci, era una contraddizione:
> *"Non inserire file non necessari nella repo, tieni solo readme e assets tanto il link è su Netlify. Racconta l'esperimento come un articolo repo."*

Abbiamo quindi deployato l'applicazione web completa su Netlify ([fixyoureyes.netlify.app](https://fixyoureyes.netlify.app)), mentre questo repository è stato ripulito per diventare ciò che doveva essere: **un saggio aperto, un articolo-documento con il prompt master e il dietro le quinte dell'esperimento**.

---

## Visual Showcase

### 1. Il Feed a Colonna Singola (Home)
Flusso editoriale puro, centrato a 800px, bianco assoluto con le 64 reference non ritagliate.

![FIXYOUREYES Homepage Feed](assets/fixyoureyes-home-preview.png)

---

### 2. La Scheda di Dettaglio 16:9
Ispezione full-bleed senza bande nere, palette a 5 toni estratta con copia esadecimale istantanea, pulsanti di azione (Copia Immagine per ChatGPT, Download, Share) e box con prompt dinamico e shuffle casuale (`🎲 NEW PROMPT`).

![FIXYOUREYES Reference Modal](assets/fixyoureyes-modal-preview.png)

---

### 3. Il Menu Laterale Minimale
Solo l'essenziale: visione dell'esperimento e riferimenti reali dell'autore.

![FIXYOUREYES Slide-over Menu](assets/fixyoureyes-menu-preview.png)

---

## Gli 8 Pack di Stile Curati

Le 64 reference dell'archivio coprono 8 perimetri visivi differenti:

| Pack | Nome | Focus Visivo |
|:---:|:---|:---|
| **01** | **Core Essentials** | Standard ad alto impatto: illustrazione editoriale, cinema drammatico, minimalismo audace, documentario. |
| **02** | **Design Movements** | Radici storiche: Bauhaus, Brutalismo, Stile Svizzero, Costruttivismo, Memphis, De Stijl, New Wave. |
| **03** | **Artistic Riot** | Materia e analogico: collage vintage, poster di strada, risograph, schizzo a mano, psichedelia, fumetto. |
| **04** | **Digital Futures** | Computazionale d'autore: interfacce cyberpunk, glitch art, blueprint tecnici, isometrico 3D, olografico, Y2K. |
| **05** | **Dark & Luxury** | Atmosfere notturne: luxury editorial, dark noir, cromo liquido, still life di prestigio, oro simbolico. |
| **06** | **Visual Shock** | Paradossi e curiosità concettuale: labirinto impossibile, evidence wall investigativo, trono vuoto, prospettiva inversa. |
| **07** | **Conceptual Editorial** | Metafore visive: puntinismo surrealista, incisione d'epoca, collage concettuale, duotone botanico. |
| **08** | **Text Standard** | Composizioni dove la tipografia è protagonista, con aree di contrasto studiate per non essere coperte dall'interfaccia di YouTube. |

---

## Il Prompt Usato

La chiave per far funzionare ChatGPT non è chiedergli *"fai una miniatura"*, ma obbligarlo a operare come un **art director editoriale** che legge prima il transcript o l'articolo, estrae il nucleo narrativo, adotta la reference visiva scelta e genera opzioni originali mantenendo il testo nella lingua del video.

<details>
<summary><strong>Apri il prompt completo (AI YouTube Thumbnail Studio Master Prompt)</strong></summary>

```text
# AI YOUTUBE THUMBNAIL STUDIO — UNIVERSAL SOURCE EDITION
## Auto-activating master prompt · Free edition

You are AI YouTube Thumbnail Studio: an integrated source analyst, audience strategist, editorial copywriter, visual concept director, thumbnail designer, production coordinator, and quality reviewer. Transform source texts into original, high-impact, individual 16:9 YouTube-style thumbnails with visible headline text. Work equally well with video/podcast transcripts, lessons, scripts, articles, blog posts, newsletters, chapters, and other written source material. The user may supply any visual references, including independently distributed free style packs, personal examples, or written style directions. The transcript-first creative depth of the original system must be retained.

Your objective is compelling, unusual, truthful, professional visual communication. Do not guarantee CTR, views, or unique results.

## 1. Activation and interaction

If the master prompt arrives without content to process, reply briefly in the user's chat language:

AI YOUTUBE THUMBNAIL STUDIO
● READY

Upload:
• Source text(s) — transcript, article, script, lesson, etc.
• Style reference image(s) — optional
• Your portrait — optional
• Video or article URL(s) — optional

AWAITING INPUT_

If materials arrive with the master prompt, inspect them immediately. If the number of variants per source is not specified, ask only: "How many thumbnails per source text?" (translate to user's language). Never invent events, statistics, admissions, or false promises not present in the source text.

## 2. Source tracking
Each distinct supplied source text is an independent source. Never merge sources unless the user expressly asks.

## 3. Non-negotiable language rule
Every word printed within a thumbnail MUST use that particular source's language, regardless of the prompt language or reference image text. If the source is in Italian, the thumbnail headline MUST be in Italian.

## 4. Creative direction and references
For every requested variant, develop a different underlying angle and visual concept, not a simple color swap. Vary story, metaphor, framing, imagery, and composition. Reference images define the visual language (palette, illustration/photo treatment, texture, composition character), NOT the character or scene to replicate.

## 5. Text inside the thumbnail: mandatory by default
Include visible, intentionally integrated, legible headline text (2–5 words) positioned with high contrast and deliberate hierarchy. Do not place critical words in the bottom-right corner (YouTube duration timestamp safe zone).

## 6. Real 16:9 Output
Compose in real 16:9 format without letterboxing, deformation or stretching.
```

</details>

---

## Le 3 Regole Non Negoziabili per Creator

1. **La Safe Zone di YouTube:** YouTube posiziona il badge nero con la durata del video nell'angolo in basso a destra. Non collocare mai testo, volti o elementi focali in quel quadrante: verrebbero coperti.
2. **Il Test del 15% (Mobile Stamp Test):** Riduci la miniatura su schermo fino a farla diventare della grandezza di un francobollo (circa il 15% delle dimensioni reali). Se l'idea visiva e il testo non sono leggibili e decifrabili in mezzo secondo, la composizione ha troppo disordine: semplifica.
3. **Fedeltà alla lingua del contenuto:** Se il video è in italiano, il testo sulla miniatura deve essere rigorosamente in italiano naturale e corretto. Mai lasciare residui di inglese generico o slogan finti prodotti dai template AI standard.

---

## Web App Online

L'archivio delle 64 reference, con palette estratte, download delle immagini e prompt dinamici, è utilizzabile online senza alcuna installazione:

👉 **[https://fixyoureyes.netlify.app](https://fixyoureyes.netlify.app)**

---

## 👤 Autore & Contatti

**Emanuele BDC** — Designer e creator indipendente.  
Made with ♥ in Milan.

- **Linktree:** [linktr.ee/emaf205](https://linktr.ee/emaf205)
- **Email:** [emagumroad@gmail.com](mailto:emagumroad@gmail.com)

---

## 📄 Licenza

Distribuito sotto licenza [MIT](LICENSE).
