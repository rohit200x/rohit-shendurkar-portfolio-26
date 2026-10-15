# Rohit Shendurkar — Engineering Portfolio

A documentation-first personal portfolio, rebuilt from the supplied **Next.js + TypeScript** website and Rohit Shendurkar's résumé. The original template's unrelated branding, social links, projects and internship entries have been removed.

## Quick start

Requires Node.js 18.17+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The app uses Next.js App Router and plain CSS layered on top of Tailwind; it does not require external image APIs, live project backends, API keys or accounts.

Build for deployment:

```bash
npm run build
npm run start
```

Deploy the directory to a Next.js-compatible host (for example Vercel). **No deployment was performed in this response.**

## Site structure

- `/` — editorial landing page, featured work, GitHub appendix, experience and skills.
- `/projects` — indexed list of all ten write-ups.
- `/projects/[slug]` — individual technical documentation pages with evidence statements, conceptual architecture, implementation walkthroughs, code examples, trade-offs and interview prompts.
- `/resume.pdf` — exact unchanged user-uploaded resume PDF.
- `data/projects.ts` — editable central source of truth for all case studies.
- `components/ProjectArtwork.tsx` — CSS illustrations, always labelled as conceptual artwork; **not real screenshots**.
- `components/PortfolioShell.tsx` — site navigation, footer, icons.

## Accuracy and interview-readiness

The portfolio makes a careful distinction among:

1. **Résumé-backed work**: PowerIQ-AI, real-time traffic monitoring, the RAG pipeline and Media Sync Engine. Details reported in the user's résumé are treated as self-reported work, not independently audited deployment proof.
2. **Additional internship work described by Rohit**: GensetIQ-AI and a startup–investor discovery platform. Technical diagrams and code examples are **illustrative**, not claims about the private codebase.
3. **Inspected public repository artifacts**: `note-app`, `note-app-frontendReact`, `toDoApp`, `FoodApp`. Public names, structures, dependencies and repository-listed URLs were checked. Not every runtime feature was validated.
4. **Screenshot-discussed concept**: Ultron, an additional communications app. The implementation scope is not established by the résumé or GitHub.

There are no invented employee names, numerical performance claims, fake screenshots, private GitHub links or fictitious customer data. Code samples are educational pseudocode and examples. Review all personal ownership wording before publishing, especially for GensetIQ-AI, the investor–startup platform and Ultron. An interviewer may ask for a concrete code-level contribution.

## Public GitHub references

- https://github.com/rohit200x
- https://github.com/rohit200x/note-app
- https://github.com/rohit200x/note-app-frontendReact
- https://github.com/rohit200x/toDoApp
- https://github.com/rohit200x/FoodApp

Some GitHub repos have an About-section deployment URL. These are linked as **repository-listed**, not asserted as recently tested or live.

## Easy customisation

- Change case study text or provenance notes in `data/projects.ts`.
- Change colours and layout in `app/globals.css`.
- Update contact and social links in `components/PortfolioShell.tsx`.
- Update the timeline and tools in `app/page.tsx`.
- Replace conceptual project artwork with actual redacted screenshots only if you have permission.
- The user's PDF is preserved byte-for-byte as `public/resume.pdf`.

## Deployment checklist

- Run `npm install && npm run build` on a connected machine; **this environment cannot fetch npm dependencies**, so a Next.js production build was not executed here.
- Upgrade and audit dependencies before public launch; the original uploaded project uses older Next.js 14 dependencies.
- Recheck linked demos, mobile layout and contact information on the final host.
- Confirm any historical implementation details that you have forgotten rather than describing the hypothetical design as something already deployed.

## Design notes

Custom editorial direction: light paper, dark forest green, acid lime accents, technical monospace labels, original responsive CSS diagrams and long-form reading layout. No external fonts or tracking scripts are required.

## Zero-dependency offline preview

A separately generated copy is included under `preview/`. Open `preview/index.html` directly in a browser. All 10 documentation pages link to each other locally. This preview uses the same CSS and case-study content, but the Next.js application is the canonical source for online deployment.
