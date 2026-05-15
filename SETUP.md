# Your Voice, Not Theirs — Deployment Guide
## Not Theirs Studio · The Signature Method

---

## What's in this folder

```
not-theirs-deploy/
  api/
    chat.js          ← Serverless function (keeps your API key secure)
  src/
    App.jsx          ← The complete app
    main.jsx         ← React entry point
  index.html         ← HTML entry point
  package.json       ← Dependencies
  vite.config.js     ← Build config
  SETUP.md           ← This file
```

---

## Deploy to Vercel (10 minutes)

### Step 1: Get an Anthropic API key
1. Go to console.anthropic.com
2. Sign in or create a free account
3. Go to API Keys → Create Key
4. Copy the key (starts with `sk-ant-...`)

### Step 2: Put the project on GitHub
1. Create a free GitHub account at github.com if you don't have one
2. Create a new repository (click the + button, name it `not-theirs-studio`)
3. Upload all the files in this folder to that repository
   - Easiest way: click "uploading an existing file" on the new repo page
   - Drag the entire `not-theirs-deploy` folder contents in

### Step 3: Deploy on Vercel
1. Go to vercel.com — sign up free with your GitHub account
2. Click "Add New Project"
3. Select your `not-theirs-studio` repository
4. Vercel will auto-detect it's a Vite/React project
5. Before clicking Deploy, click "Environment Variables"
6. Add one variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from Step 1
7. Click Deploy

Vercel will build and deploy. Takes about 60 seconds.
You'll get a URL like: `not-theirs-studio.vercel.app`

### Step 4: Connect your domain (optional)
1. In Vercel project settings → Domains
2. Add your domain (nottheirsstudio.com or nottheirs.ai)
3. Follow Vercel's DNS instructions — usually just adding a CNAME record

---

## Updating the app

If you want to change anything (copy, colors, the system prompt):
1. Edit the file locally
2. Upload the changed file to GitHub
3. Vercel automatically redeploys — takes about 30 seconds

---

## API costs

Each full workflow session costs approximately $0.10–$0.25 in Anthropic API credits.
At workshop scale (10–20 people), expect $2–5 per workshop in API costs.

---

## Questions?

If something doesn't work, the most common issues are:
- API key not set correctly in Vercel environment variables
- Files not uploaded in the right structure

Check that your GitHub repo has this structure:
```
api/chat.js
src/App.jsx
src/main.jsx
index.html
package.json
vite.config.js
```
