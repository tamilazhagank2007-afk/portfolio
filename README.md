# Tamilazhagan K portfolio

Responsive static portfolio for Tamilazhagan K. The contact form opens a
pre-filled Gmail compose tab; there is no email API, database, or App Password
to configure.

## Run locally

### VS Code Live Server

1. Open this folder in VS Code.
2. Install the free **Live Server** extension if needed.
3. Right-click `index.html` and select **Open with Live Server**.

### Node.js

Install Node.js 20 or newer, then run:

```powershell
npm install
npm start
```

Open `http://localhost:3000`.

## Send a contact message

Fill in the form and press **Send message**. Gmail opens in a new browser tab
with the recipient, subject, and message filled in. Review the draft and press
**Send** in Gmail. The portfolio stays open in its original tab, so return to
that tab when you're done. The website cannot send an email silently or on
your behalf without the sender pressing **Send**.

## Deploy

This is a static site and can be hosted on GitHub Pages or another static web
host. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder.
