# Design Prompt: AI Solutions Hub Frontend Theme

Use this prompt to redesign the CSA × PivotRoots AI Solutions Hub (React 19, Vite, Tailwind 3.4). Every token below was taken from the two decks in this folder: `ppt template - pivotroots.pptx` and `ppt template - havas.pptx`. Do not invent colors or fonts outside this list.

---

## The prompt

You are redesigning the frontend of the AI Solutions Hub, a portfolio of production AI platforms built by CSA and PivotRoots, part of the Havas network. The audience is CMOs, client leads and internal engineers. The site should feel like the best consulting proposal they have ever opened: calm, confident, dense with substance, and visibly built by people who ship.

The visual language comes from two decks that share one grammar:

- PivotRoots: deep slate panels, a single acid-lime accent, Montserrat headlines, Inter body, rounded cards, circular icon badges, large numerals.
- Havas: near-black and white, one hot red accent, tight grid, tiny uppercase kickers, thin rules, numbered steps, flow diagrams built from boxes and arrows.

Both decks use the same structure on every slide: a small letter-spaced kicker in the accent color, a one-sentence headline that states the point, then a grid of cards, then a quiet footer line. Build the site from that same structure.

### Brand roles

PivotRoots is the primary system. It drives the hero, navigation, cards and all default UI. Havas red is a signature, not a second theme. Use it in exactly three places:

1. The "A Havas Company" endorsement in the header and footer.
2. Internal Enterprise Mode. When the passphrase unlocks internal data, the lock icon, the mode banner and the unredacted client-name chips switch to Havas red. Red means "confidential", the same way the Havas deck marks the active stage in a flow.
3. Live or production status dots (red pulse on a "Live" badge reads as "on air").

Never put lime and red next to each other in the same component.

### Color tokens

Define these as CSS variables on `:root` and map them in `tailwind.config.js`.

| Token | Hex | Source | Use |
|---|---|---|---|
| `--ink` | `#1E2B30` | PivotRoots dk2 | Hero, dark cards, nav, primary text on light |
| `--ink-2` | `#3A4A50` | PivotRoots | Hover on dark cards, secondary dark surfaces |
| `--slate` | `#5E6A6E` | PivotRoots | Body copy, captions |
| `--mist` | `#AEB9BC` | PivotRoots | Disabled text, chart gridlines |
| `--line` | `#D6DBDC` | PivotRoots | Card borders, dividers |
| `--line-soft` | `#E2E6E6` | PivotRoots | Inner dividers, table rows |
| `--paper` | `#F7F8F8` | PivotRoots | Page background |
| `--card` | `#FFFFFF` | both | Card surfaces |
| `--lime` | `#C9DA2D` | PivotRoots accent | Primary accent, icon badges, active states, CTA |
| `--lime-deep` | `#5F6E05` | PivotRoots | Kicker text and links on white (lime fails contrast on white) |
| `--havas-red` | `#E50200` | Havas accent6 | Signature uses listed above only |
| `--havas-red-soft` | `#FBE3E3` | Havas | Internal-mode banner background |
| `--havas-black` | `#0D0D0D` | Havas dk1 | Footer band |

Contrast rules, checked against WCAG AA:

- Lime is a fill, never text on white. Text on lime is `--ink`.
- Kickers and links on white use `--lime-deep`.
- On `--ink` backgrounds, lime is safe as text and icon color.

Dark mode: swap `--paper` to `#141D20`, `--card` to `#1E2B30`, `--ink` text to `#F7F8F8`, `--line` to `#3A4A50`. Lime stays the same. Kickers on dark use `--lime`.

### Typography

- Display: Montserrat 700 for H1 and H2, 600 for card titles. Letter-spacing -0.01em on H1.
- Body: Inter 400 and 500. Base 16px, line-height 1.6.
- Kicker: Inter 600, 11px, uppercase, letter-spacing 0.14em, `--lime-deep` (or red in internal mode).
- Numerals: Montserrat 700 with `font-variant-numeric: tabular-nums` for metrics like "37 Cloud Run services" or "21 agents". Big numbers are the hero of every stat card, as in the "₹14,60,000" slide.
- Mono: JetBrains Mono for repo paths, agent class names and CLI snippets in internal mode.

Load Montserrat and Inter from Google Fonts. Remove Plus Jakarta Sans.

Scale (desktop / mobile): H1 56/36, H2 32/26, H3 20/18, body 16/15, small 13, kicker 11.

### Layout grammar

Every section follows the slide pattern:

```
KICKER IN CAPS
One sentence headline that states the point.
[ card grid ]
footnote line in slate, 13px, italic optional
```

- Container 1200px, 24px gutters desktop, 16px mobile.
- 12-column grid. Cards sit in 3 or 4 columns, collapse to 1 below 640px.
- Section spacing 112px desktop, 72px mobile.
- Corners: cards 6px, buttons 4px, icon badges fully round. The decks are crisp; keep radii small.
- Shadows: none by default. Cards use a 1px `--line` border. On hover, border becomes `--ink` and the card lifts 2px.

### Hero

Split hero copied from the PivotRoots cover slide: left 62% is `--ink` with the content, right 38% is a solid `--lime` panel. A device or dashboard mock (a solution screenshot or a stylised card stack) straddles the seam, overlapping both colors.

Left side content:

- Kicker: `CSA × PIVOTROOTS` in lime.
- H1 in white, two lines max: for example "AI platforms that are already in production."
- Subline in `--mist`.
- Three outlined pill buttons in lime, mirroring "Calculate · Personalise · Deliver". Use the five pillars as filter chips here, or the three verbs of the portfolio.
- "A Havas Company" lockup under the logo, with a small red dot.

### Section dividers

Copy the "Section 01" slide: full-width `--ink` band, a huge outlined numeral (`01`, `02`...) in `--ink-2` at 240px bleeding off the right edge, kicker `SECTION 01` in lime, H2 in white, one line of description. Use one divider per pillar.

### Components

Pillar cards (5 pillars). Pattern from "Four goals, one platform": one card in `--ink` (the featured or selected pillar), the rest white. Each has a 40px round lime badge with a line icon in `--ink`, a Montserrat title, two lines of body, and a solution count in the corner.

Solution cards. White, 1px border. Top row: round lime icon badge left, status chip right (`Live` with red pulse, `POC`, `Pilot`). Then client industry kicker, title, a two-line outcome statement, and a bottom row of tech chips in `--line-soft` with `--slate` text. One headline metric per card in large Montserrat numerals.

Numbered steps. Pattern from "Three steps": numbers in 48px Montserrat, cards connected by small round lime arrow buttons sitting on the gap. The middle or active step is the dark card.

Process timeline. Pattern from "The right message at each step": a horizontal line with round lime nodes carrying icons, the last node in `--ink`, cards hanging beneath. Use it for each solution's workflow in the modal.

Architecture diagrams. Pattern from the Havas "End-to-end architecture" slide: column headers as red-or-lime kickers (SOURCES, INGEST, WAREHOUSE, INTELLIGENCE, ACTIVATE), grey boxes for inputs, dark boxes for processing, one accent box for the output. Thin grey connecting lines with arrowheads. Build this as SVG inside the solution modal.

Comparison and stat strip. Pattern from "Anil wants to cash out": three cards side by side with a large number, a caption, and a thin progress bar at the bottom in ink, red or green. Use it for before/after impact.

Conclusion bar. Every key section can close with a full-width `--ink` strip carrying one bold white sentence, like "Our platform puts these three numbers in front of the customer."

Two-column ownership panel. Pattern from "We create the content. CHSBC stays in control": left panel dark with lime badges ("What CSA builds"), right panel white with ink badges ("What you own"). Use it in the solution modal for scope and governance.

Footer line. Every page ends with the deck footer pattern: PivotRoots logo, then `CSA × PivotRoots | AI Solutions Hub | Confidential` in 11px `--mist`, separated by thin pipes. Under it a `--havas-black` band with the Havas wordmark.

Buttons:

- Primary: `--lime` fill, `--ink` text, Inter 600, 4px radius.
- Secondary on dark: transparent with a 1px lime border and lime text (the cover pills).
- Secondary on light: transparent, 1px `--ink` border.
- Internal-mode unlock: `--havas-red` fill, white text.

Icons: Lucide, 1.75 stroke, inside round badges. Never bare icons floating in text.

### Modal

Full-height right drawer at 760px, not a centred box. Header uses the slide pattern (kicker, one-line headline). Content order: outcome stat strip, architecture SVG, process timeline, two-column ownership panel, tech chips, and internal-only repo path in mono. Close on Escape and backdrop click.

### Motion

Restrained, like a deck build:

- Cards fade up 12px with 40ms stagger as they enter the viewport.
- The hero lime panel slides in from the right on load (500ms, ease-out).
- Section numerals drift 20px horizontally on scroll.
- Timeline nodes fill from left to right on first view.
- Respect `prefers-reduced-motion`: disable everything but opacity.

### Voice on screen

Headlines are full sentences that state the claim, as in both decks: "Six use cases the platform unlocks", not "Use Cases". Kickers name the section in two or three words. Body copy is plain and specific: numbers, client industries, named technologies. No adjectives like "cutting-edge" or "revolutionary".

### Do not

- Use gradients, glassmorphism, neon glows or drop shadows heavier than 2px.
- Use lime as text on white.
- Use red as a general accent.
- Use emoji in UI.
- Center-align body paragraphs.
- Exceed two accent fills (lime, and red where allowed) on one screen.

### Deliverables

1. `tailwind.config.js` with the tokens above under `theme.extend.colors` (`ink`, `slate`, `lime`, `havas`), font families, radii.
2. `src/index.css` with the `:root` variables, dark-mode overrides, Google Fonts import, base type styles and the `.kicker` utility.
3. Updated `Header`, `Hero`, `SolutionCard`, `SolutionModal`, `UnlockModal`, `Footer` built from the components above.
4. New `SectionDivider`, `StatStrip`, `ProcessTimeline`, `ArchitectureDiagram` and `OwnershipPanel` components.
5. Check at 375px, 768px and 1280px, in light and dark mode, with no horizontal scroll.
