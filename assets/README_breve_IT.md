# Reference Vault + AI YouTube Thumbnail Studio

**Miniature YouTube meno generiche, con un sistema semplice: un prompt che analizza i contenuti e una libreria di reference visive.**

🌐 **[Apri Reference Vault online](https://emaf205.com/ideas/yt-thumbnail-ai/)**

![Anteprima Reference Vault](assets/demo.png)

## Come funziona

1. Incolla il **master prompt** in ChatGPT.
2. Carica un transcript, articolo o altro testo; facoltativamente aggiungi la tua foto e l’URL del video.
3. Scegli e scarica uno stile dal **Reference Vault**, poi allegalo alla chat.
4. Indica quante varianti desideri: il prompt analizza il contenuto e guida la creazione di miniature **16:9 con testo visibile**.

![Esempio in chat](assets/chat.png)

## Reference Vault

Una **PWA scaricabile e installabile**, utilizzabile online o in locale, con **48 reference** organizzate per stile. Include ricerca, categorie, preferiti, anteprima e download delle immagini.

Il pannello admin permette di aggiungere reference con drag & drop, modificare immagini, testi e link, configurare un banner promozionale ed effettuare backup e ripristino dei dati.

![Pannello admin](assets/admin.png)

## Utilizzo locale

Scarica lo ZIP dell'app, estrailo e avvia un server nella cartella del progetto:

```bash
python3 -m http.server 8000
```

Apri `http://localhost:8000`. Per installarla come PWA, usa l’opzione di installazione del browser quando disponibile.

**Nella repository trovi l'app in ZIP e il master prompt.** La galleria offre gli stili; è il prompt, usato in ChatGPT, a guidare la generazione delle miniature.

---

Made with ♥ in Milan by [Emanuele BDC](https://linktr.ee/emaf205).
