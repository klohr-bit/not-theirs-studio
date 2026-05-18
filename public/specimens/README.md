# Style specimens

Drop the 10 specimen JPEG files into this directory using these exact names:

```
specimen-01.jpg  — Typographic dominance
specimen-02.jpg  — Full-bleed image
specimen-03.jpg  — Dense information grid
specimen-04.jpg  — Color block geometric
specimen-05.jpg  — Color block + layered photo
specimen-06.jpg  — Type + line illustration
specimen-07.jpg  — Collage and layered
specimen-08.jpg  — Diagonal dynamic
specimen-09.jpg  — Illustrated grid
specimen-10.jpg  — Frame and border contained
```

Vite serves files from `/public/` at the site root, so they will be reachable at
`/specimens/specimen-01.jpg` etc. at runtime. No additional config required.

Until the JPEGs are present, the Style Specimen Gallery screen will show a
graceful broken-image fallback on each tile — the gallery still functions, the
labels and selection state still work.
