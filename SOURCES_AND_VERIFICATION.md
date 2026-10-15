# Content provenance and final publishing checklist

## Provided material

- User-uploaded résumé: `AG Rohit Shendurkar Resume(5).pdf`, copied unchanged to `public/resume.pdf` and `preview/resume.pdf`.
- User-uploaded Next.js website source: `personal web.zip`; the supplied code was a generic template containing unrelated identity, links, employers and projects. Its Next.js TypeScript foundation was retained and the page implementation replaced.
- Screenshots of an earlier project-documentation discussion supplied in this conversation, which mention PowerIQ-AI, GensetIQ-AI, RAG, Ultron and architectural concepts.
- User's self-report of GensetIQ-AI and a startup-investor discovery project, with uncertainty about the latter's implementation.

## Public GitHub evidence inspected on 15 October 2026

| Repository | Direct URL | Observed evidence |
|---|---|---|
| Profile | https://github.com/rohit200x | Rohit Shendurkar profile; selected public repositories |
| Notes backend | https://github.com/rohit200x/note-app | controllers, middlewares, models, routes; package dependencies Express, Mongoose, JWT, bcrypt |
| Notes frontend | https://github.com/rohit200x/note-app-frontendReact | Vite, React, Axios, React Router, react-hot-toast, Sass; repository-listed deployment |
| To-do API | https://github.com/rohit200x/toDoApp | modular Node API folders and Express/Mongoose/JWT/bcrypt dependencies |
| FoodApp | https://github.com/rohit200x/FoodApp | mernapp directory and a Vercel link in its About section |
| MERN portfolio (not prominently featured) | https://github.com/rohit200x/mernPORTFOLIO | frontend/backend directories; evidence of an earlier full-stack project |

These are public-page observations; no authenticated access, private repository checkout, deployment testing or source execution was performed.

## What to review before sharing with recruiters

- **GensetIQ-AI**: confirm which internship it belonged to and list the two or three services/screens you personally implemented. The design page is a domain reconstruction, not a reverse-engineered code audit.
- **Startup × Investor Discovery**: replace the descriptive name with its historical product name if known; confirm what code you wrote, which stack was used, and whether the idea reached production.
- **Ultron**: confirm that it is your project, that the screenshot-mentioned stack matches the implemented code and what you personally built. If this cannot be confirmed, remove its entry from `data/projects.ts`.
- **GitHub appendix**: verify functionality, deployed demos and exact product features before adding marketing claims. Some repository-listed URLs may be offline.
- **Private internship details**: do not publish confidential screens, customer data or proprietary API schemas without permission. All current diagrams and sample data are original conceptual artwork.

## Prohibited unverified claims deliberately excluded

- Made-up quantitative improvements, datasets, users, revenue, or production scale.
- Claims that unknown product features, endpoints, schema names or algorithms were definitely deployed.
- Fake GitHub links, fake live URLs for private projects, fake screenshots, pretend client testimonials or unapproved company logos.
- A claim that RAG completely eliminates hallucinations.

The source text lives in `data/projects.ts`. The documentation is deliberately extensive but can be defended: verified autobiographical statements are distinguished from educational design discussion.
