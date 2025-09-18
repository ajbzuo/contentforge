
# Times-like Site Scaffold (Drop-in JSON)

A Times-style static Next.js site. Drop your `data/articles.json` with 30 longform articles and the site will render the homepage, sections, and article pages — no code changes required.

## Dev
npm install
npm run dev
# open http://localhost:3000

## Static Export
npm run build  # outputs ./out

## JSON shape (array)
[
  {
    "slug": "fed-rate-cut-sept2025",
    "title": "Fed Cuts Key Rate for First Time in 2025",
    "section": "Business",
    "author": "Staff Reporter",
    "date": "2025-09-17",
    "image": "https://...",
    "excerpt": "Short lede paragraph of the article.",
    "body": "# Headline\n\n## Section\n\nLong markdown body here..."
  }
]
