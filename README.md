# For Batool — A Birthday Love Gift

This branch remakes the original live-written Love-Gift feeling as a personal, English-language birthday letter for Batool. It uses a mobile-first React/Vite interface, a private portrait, and self-contained image assets so the site can be deployed on Vercel.

## Local development

Run the following commands with Node.js 20 or newer installed.

```bash
pnpm install
pnpm dev
```

## Vercel deployment

Import this branch in Vercel and retain the repository defaults. The committed `vercel.json` file uses `pnpm build` and deploys the generated `dist/public` folder. No environment variables are required.

## Personalization

The story and final signature live in `client/src/pages/Home.tsx`. The bundled media lives in `client/public/assets/`. Replace the portrait or edit the narrative before sharing publicly if needed.

## Credits

The experience is an original modern remake inspired by the pacing and live-writing premise of the Love-Gift reference project. No external repository link appears in the public page footer.
