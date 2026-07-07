# M Abdul Karim Al Muzaki — Portfolio

A simple, modern, responsive portfolio page with a light/dark mode toggle and animated skill bars.

## Folder structure

```
portfolio/
├── index.html   → page structure & content
├── style.css    → all styling, colors, layout, responsive rules
├── script.js    → theme toggle, mobile menu, animated skill bars
└── README.md    → this file
```

## How to run it

No build step needed. Just open `index.html` in any browser — or, for the smoothest experience (fonts, etc.), serve the folder locally:

```bash
# option 1: just double-click index.html

# option 2: simple local server (recommended)
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Adding your real photo

The hero section currently shows a placeholder circle with initials "LC" instead of a photo.
To use a real photo:

1. Put your image file in the same folder as `index.html` (e.g. `profile.jpg`).
2. Open `index.html`, find this block inside the `.hero-grid` section:

   ```html
   <div class="portrait-frame" id="portraitFrame">
     <!-- Replace this placeholder by putting an <img src="profile.jpg"> tag here with your own photo -->
     <div class="portrait-placeholder">LC</div>
   </div>
   ```

3. Replace the placeholder `<div>` with:

   ```html
   <img src="profile.jpg" alt="Your Name" />
   ```

## Editing content

All text content (name, bio, education, experience, contact info) lives directly in `index.html`, organized into clearly labeled `<section>` blocks:

- `#about` — bio + personal info table
- `#education` — timeline
- `#experience` — work history
- `#skills` — progress bars
- `#contact` — contact box

## Editing skill percentages

Each skill bar is one `.skill-item` block in `index.html`, inside the `#skills` section:

```html
<div class="skill-item">
  <div class="skill-top">
    <span>JavaScript</span>
    <span class="skill-percent" data-target="79">0%</span>
  </div>
  <div class="bar-track">
    <div class="bar-fill" data-percent="79"></div>
  </div>
</div>
```

To change a percentage, update **both** `data-target` (on the number) and `data-percent` (on the bar) to the same value. The bar fills and the number counts up automatically when it scrolls into view — no JS editing required.

To add a new skill, just copy one `.skill-item` block and edit its label + percentage.

## Editing colors / fonts

All design tokens are CSS variables at the top of `style.css`:

```css
:root{
  --bg: #FAF7F1;
  --navy: #1B3A5C;
  --gold: #C99A3E;
  ...
}
[data-theme="dark"]{
  --bg: #0E1A24;
  --navy: #9FC1E0;
  --gold: #E6BE6B;
  ...
}
```

Change these to restyle the whole page consistently across light and dark mode.

Fonts (Fraunces for headings, Inter for body) are loaded via Google Fonts in the `<head>` of `index.html`.

## Notes

- Dark/light mode choice is remembered in the browser (`localStorage`), so it stays the same next time the page is opened.
- Layout is responsive down to mobile, with a collapsible menu below ~780px width.
- Respects `prefers-reduced-motion` for users who have that OS setting on.
