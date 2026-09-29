# Public media layout

```
public/
  icons/                 # UI icons (call, whatsapp)
  logos/                 # Brand marks (kebab-case WebP)
  images/
    corporate/           # GHD Hotels site imagery
    brands/              # Brand showcase photos (Nivaãra, Samrāya, Celéstra)
    nivaara/             # Nivaãra property photos & video posters
    experiences/
      beaches/           # City attractions — beaches guide
      seafood/           # City attractions — seafood guide
  videos/
    corporate/           # GHD homepage hero
    nivaara/             # Nivaãra page videos (nivaara-*.mp4)
    experiences/         # City attractions listing hero
```

## Naming

- **kebab-case** only (no spaces, PascalCase, or “NEW”)
- Brand-prefix assets where helpful: `nivaara-…`, `ghd-hotels-…`, `celestra-…`, `samraya-…`
- Descriptive SEO names: places, amenity, or subject in the filename

## Formats

- **Photos:** WebP (quality ~88–92), long edge capped ~1800–2400px
- **Videos:** H.264 MP4, max 1080p, `+faststart`
- **Logos:** WebP with transparency

## Re-optimize

```bash
npm run optimize:media
```

Uses `scripts/optimize-media.sh` (ImageMagick + ffmpeg + cwebp).
