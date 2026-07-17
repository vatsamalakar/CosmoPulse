# CosmoPulse

A Vite-powered site for NASA's Astronomy Picture of the Day, Mars Rover photos, favorites, and a space chatbot.

## Run locally

1. Open a terminal in this project folder:

   ```powershell
   cd C:\Users\anilm\vm\windowsos1st\my-vite-app
   ```

2. Install dependencies and start Vite:

   ```powershell
   npm install
   npm run dev
   ```

3. Open the localhost URL printed by Vite.

Create `.env` from `.env.example` and set `VITE_NASA_API_KEY` to a NASA API key before running the app.

## Deploy to Vercel

1. Push this `my-vite-app` folder to a Git repository and import that repository at [Vercel](https://vercel.com/new).
2. If the repository contains other folders, set Vercel's **Root Directory** to `my-vite-app`.
3. In **Project Settings → Environment Variables**, add `VITE_NASA_API_KEY` with your NASA API key for Production, Preview, and Development.
4. Deploy. Vercel uses `npm run build` and publishes the `dist` folder, as defined in `vercel.json`.

`VITE_` variables are included in browser code by Vite. Use this NASA key only for client-side access; do not put private server secrets in a `VITE_` variable.