#!/usr/bin/env bash
# Optimize media for web: high-quality WebP images + web-ready H.264 videos.
# Quality target: visually near-lossless (WebP q=92, H.264 CRF 17–18, max 1080p).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

mkdir -p \
  public/images/corporate \
  public/images/brands \
  public/images/nivaara/rooms \
  public/icons \
  public/videos/corporate \
  public/videos/nivaara \
  public/videos/experiences \
  /tmp/ghd-media-opt

to_webp() {
  local src="$1" dest="$2"
  if [[ ! -f "$src" ]]; then
    echo "skip missing $src"
    return 0
  fi
  mkdir -p "$(dirname "$dest")"
  # High quality WebP — sharp detail, much smaller than PNG
  magick "$src" -strip -quality 92 -define webp:method=6 "$dest"
  local before after
  before=$(du -k "$src" | cut -f1)
  after=$(du -k "$dest" | cut -f1)
  echo "webp  ${before}KB → ${after}KB  $dest"
}

encode_video() {
  local src="$1" dest="$2" maxw="${3:-1920}"
  if [[ ! -f "$src" ]]; then
    echo "skip missing $src"
    return 0
  fi
  mkdir -p "$(dirname "$dest")"
  # Scale down only if wider than maxw; CRF 18 ≈ high visual quality for web
  ffmpeg -y -i "$src" \
    -vf "scale='min(${maxw},iw)':-2" \
    -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p \
    -c:a aac -b:a 128k -ac 2 \
    -movflags +faststart \
    "$dest" </dev/null
  local before after
  before=$(du -h "$src" | cut -f1)
  after=$(du -h "$dest" | cut -f1)
  echo "video ${before} → ${after}  $dest"
}

extract_poster() {
  local src="$1" dest="$2" ss="${3:-0.5}"
  mkdir -p "$(dirname "$dest")"
  ffmpeg -y -ss "$ss" -i "$src" -frames:v 1 -q:v 2 /tmp/ghd-media-opt/poster.jpg </dev/null
  magick /tmp/ghd-media-opt/poster.jpg -strip -quality 90 -define webp:method=6 "$dest"
  echo "poster $dest"
}

echo "== Converting large stills to WebP =="
to_webp public/images/nivaara/samraya-entrance.png public/images/brands/samraya-entrance.webp
to_webp public/images/nivaara/samraya-resort-view.png public/images/brands/samraya-resort-view.webp
# celestra-luxury-hotel-entrance.webp — already optimized in public/images/brands/
to_webp public/images/nivaara/ghd-team-hands-joined.png public/images/corporate/ghd-team-hands-joined.webp
to_webp public/images/nivaara/ghd-hotels-wall-signage.png public/images/corporate/ghd-hotels-wall-signage.webp
to_webp public/images/nivaara/infinity-pool.png public/images/corporate/infinity-pool.webp
to_webp public/images/nivaara/goa-beach-aerial.jpg public/images/corporate/goa-beach-aerial.webp
to_webp public/images/nivaara/white-background.jpg public/images/corporate/white-background.webp
to_webp public/images/nivaara/goa-seafood-dining.jpg public/images/corporate/goa-seafood-dining.webp
to_webp public/images/nivaara/nivaara-rooftop-pool.png public/images/nivaara/nivaara-rooftop-pool.webp
to_webp public/images/nivaara/footer-mandala.png public/images/corporate/footer-mandala.webp
to_webp public/logos/GHDHotelsMainLogo.png public/logos/ghd-hotels-main-logo.webp

# Beach PNGs → WebP (keep under experiences/beaches)
for f in public/images/experiences/beaches/*.png public/images/experiences/beaches/*.jpg; do
  [[ -f "$f" ]] || continue
  base=$(basename "$f")
  name="${base%.*}"
  to_webp "$f" "public/images/experiences/beaches/${name}.webp"
done

# Seafood JPGs/AVIFs → WebP
for f in public/images/experiences/seafood/*.{jpg,jpeg,avif}; do
  [[ -f "$f" ]] || continue
  base=$(basename "$f")
  name="${base%.*}"
  to_webp "$f" "public/images/experiences/seafood/${name}.webp"
done

# Brand reception image
cp -n public/images/nivaara/nivaara-reception.webp public/images/brands/nivaara-reception.webp 2>/dev/null || true

# Icons
cp -n public/images/nivaara/whatsapp-svgrepo-com.svg public/icons/whatsapp.svg 2>/dev/null || true
cp -n public/images/nivaara/call-receive-svgrepo-com.svg public/icons/call.svg 2>/dev/null || true

echo "== Encoding videos (high quality, max 1080p, faststart) =="
encode_video public/images/nivaara/ghd-hotels-hero.mp4 public/videos/corporate/ghd-hotels-hero.mp4 1920
extract_poster public/videos/corporate/ghd-hotels-hero.mp4 public/images/corporate/ghd-hotels-hero-poster.webp 1.0

encode_video public/images/nivaara/hero-section.mp4 public/videos/nivaara/nivaara-hero.mp4 1920
encode_video public/images/nivaara/nivaara-beach.mp4 public/videos/nivaara/nivaara-beach.mp4 1920
encode_video public/images/nivaara/nivaara-pool.mp4 public/videos/nivaara/nivaara-pool.mp4 1280
encode_video public/images/nivaara/family-at-beach.mp4 public/videos/nivaara/nivaara-family-at-beach.mp4 1920
encode_video public/images/nivaara/silhouette.mp4 public/videos/nivaara/nivaara-silhouette.mp4 1280
encode_video public/images/experiences/experiences-hero.mp4 public/videos/experiences/experiences-hero.mp4 1920

# Keep existing posters beside nivaara images; copy to structured paths
cp -n public/images/nivaara/nivaara-hero-poster.webp public/images/nivaara/nivaara-hero-poster.webp 2>/dev/null || true
cp -n public/images/nivaara/nivaara-beach-poster.webp public/images/nivaara/nivaara-beach-poster.webp 2>/dev/null || true
cp -n public/images/nivaara/nivaara-pool-poster.webp public/images/nivaara/nivaara-pool-poster.webp 2>/dev/null || true

echo "== Done =="
du -sh public/videos public/images/corporate public/images/brands public/images/experiences/beaches 2>/dev/null
ls -lh public/videos/corporate/ghd-hotels-hero.mp4 public/images/corporate/ghd-hotels-hero-poster.webp 2>/dev/null
