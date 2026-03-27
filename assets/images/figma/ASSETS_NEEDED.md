## Replace placeholders with Figma exports

This project is wired to use files in `assets/images/figma/`.
Some files are currently **placeholders** (copied from older assets) so the page keeps working.

To satisfy the assignment requirement **“All images should be directly exported from the Figma file”**,
export the following from Figma and overwrite these files (keep the same filenames):

### Hero
- `hero-bottle.png` (transparent background, placed on grass)
- `hero-grass.jpg` (grass strip used in hero background)

### Product Gallery (8 images)
- `gallery-01.jpg`
- `gallery-02.jpg`
- `gallery-03.jpg`
- `gallery-04.jpg`
- `gallery-05.jpg`
- `gallery-06.jpg`
- `gallery-07.jpg`
- `gallery-08.jpg`

### Our Collection image
- `collection.jpg`

### Fragrance thumbnails (subscription cards)
- `fragrance-original.jpg`
- `fragrance-lily.jpg`
- `fragrance-rose.jpg`

### Comparison table header thumbnails
- `table-arose.jpg`
- `table-bella.jpg`
- `table-daisies.jpg`

Notes:
- You can export as PNG instead of JPG, but then update the filenames in `index.html` and `js/script.js`.
- After adding `hero-bottle.png`, the hero bottle will render with no white box (no JS cutout needed).
