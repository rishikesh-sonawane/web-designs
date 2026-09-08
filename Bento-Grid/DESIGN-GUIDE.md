# Bento Grid Design — Complete Design Guide

## What Is Bento Grid Design?

Bento Grid design is a layout system inspired by Japanese bento boxes — compartmentalized, organized, and visually satisfying grid arrangements where each cell contains a distinct piece of content. Named after the partitioned lunch boxes, it creates dense, information-rich interfaces using asymmetric grid cells of varying sizes, each housing unique functional elements.

## Origin & History

- **Physical inspiration:** Japanese bento boxes (弁当) — traditional compartmentalized meal containers dating back to the 16th century
- **Digital adoption:** Popularized by Apple's product pages (2020s), which use asymmetric grid layouts to showcase features
- **Design movement:** Emerged as the modern successor to traditional card-based layouts, offering more visual hierarchy and density
- **Key moment:** Apple's WWDC keynotes and product pages (Mac Studio, MacBook Pro) made bento grids the dominant tech product page layout

## Core Philosophy

> "Every cell is a window into a different facet of the product."

- Density is not clutter — it's richness
- Asymmetry creates visual hierarchy naturally
- Each cell should feel like a complete, self-contained experience
- The grid itself is the design — not just a container

## When to Use It

| Use When | Avoid When |
|----------|------------|
| Product landing pages (SaaS, hardware) | Content-heavy editorial sites |
| Dashboard and admin interfaces | Simple portfolio or blog sites |
| Feature comparison or showcase pages | Accessibility-critical interfaces |
| Data visualization dashboards | Minimal, whitespace-focused designs |
| App stores or marketplace listings | Single-purpose utility tools |
| Modern startup homepages | Traditional corporate websites |

## Industries & Use Cases

- **Technology:** SaaS product pages, developer tools, cloud platforms
- **Consumer Electronics:** Product specification pages, feature showcases
- **Fintech:** Dashboard interfaces, portfolio overviews
- **Productivity:** Project management tools, note-taking apps
- **Design Tools:** Figma-like applications, design system documentation
- **E-commerce:** Product comparison, category browsing

## Commercial Value

- **Information density:** Show more features without overwhelming
- **Visual hierarchy:** Size naturally communicates importance
- **Modern perception:** Bento grids signal "contemporary, tech-forward"
- **Scalability:** Easy to add/remove features without breaking layout
- **Mobile-friendly:** Cells collapse gracefully to single columns

## Key Visual Characteristics

### Grid Structure
- CSS Grid with named areas or span values
- Asymmetric cell sizes (1×1, 2×1, 1×2, 2×2)
- Consistent gap (16px-24px) between all cells
- Responsive: 4 columns → 2 columns → 1 column
- Cells can span multiple rows and columns

### Cell Design
- Clean border-radius (16px-32px)
- Subtle background differentiation between cells
- Each cell has its own micro-layout
- Self-contained content (icon + title + description or interactive element)
- Consistent padding within cells

### Color Palette
- **Background:** Light gray (#F8FAFC) or deep dark (#0B0F19)
- **Cells:** Solid white (#FFFFFF) or dark surface (#1E293B)
- **Accents:** One primary accent color for CTAs and highlights
- **Borders:** Micro-thin hairline (1px solid rgba(0,0,0,0.05))

### Typography
- Clean sans-serif (Inter, SF Pro, Plus Jakarta Sans)
- Bold headlines within cells
- Small, muted labels and descriptions
- Clear hierarchy: cell title → description → metadata

### Interactive Elements
- Each cell can contain sliders, toggles, charts, or animations
- Hover effects: subtle elevation change or border highlight
- Cells should feel "alive" with micro-interactions
- Live data visualizations within cells

## Design Principles

1. **Asymmetric Balance:** Vary cell sizes for visual interest
2. **Self-Contained Cells:** Each cell works independently
3. **Consistent Spacing:** Uniform gaps maintain order
4. **Progressive Density:** Lead with large cells, detail with small ones
5. **Interactive Richness:** Every cell should offer something to explore

## Technical Implementation Notes

- CSS Grid with `grid-template-areas` or `grid-column: span N`
- Responsive breakpoints for column collapse
- `aspect-ratio` for consistent cell proportions
- Container queries for cell-internal responsive design
- Intersection Observer for scroll-triggered cell reveals

## Common Mistakes

1. **Uniform cells:** All same-size cells lose the bento character
2. **Overcrowding:** Too many cells create visual noise
3. **No hierarchy:** Without size variation, nothing stands out
4. **Missing interactivity:** Static cells feel dead
5. **Poor mobile collapse:** Cells must reflow gracefully

## Successful Examples

- **Apple.com:** Product pages (Mac, iPhone, Apple Watch) define the bento standard
- **Linear.app:** Feature showcase with asymmetric bento layout
- **Vercel:** Dashboard and marketing pages use bento grids
- **Raycast:** App launcher uses dense bento-style layout
- **Arc Browser:** New tab page with bento-style information density
