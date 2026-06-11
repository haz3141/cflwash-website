#!/usr/bin/env bash
set -euo pipefail

DEST="${1:-docs/design/city-image-candidates/originals}"
mkdir -p "$DEST"

download() {
  local filename="$1"
  local url="$2"
  echo "Downloading $filename"
  curl --fail --location --retry 3 --retry-delay 2 \
    --output "$DEST/$filename" "$url"
}

download "deltona-city-hall.jpg" \
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Deltona_city_hall_deltona_florida.jpg"

download "orange-city-town-hall.jpg" \
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Orange_city_town_hall_orange_city_florida.jpg"

download "debary-hall.jpg" \
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/DeBary_Hall1.jpg"

download "deland-athens-theatre.jpg" \
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Downtown_DeLand_Hist_Dist_-_Athens_Theatre.jpg"

download "sanford-city-hall.jpg" \
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sanford_City_Hall_FL.jpg"

download "lake-mary-city-hall.jpg" \
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/LakeMaryCityHall2026.jpg"

echo
echo "Downloaded files:"
file "$DEST"/*

echo
echo "SHA-256 checksums:"
shasum -a 256 "$DEST"/*

cat <<'EOF'

These files are reference candidates only.
Downloading them does not approve them for production use.

Before issue #57 integration:
- verify the exact Commons author and license for every file;
- preserve required attribution and share-alike obligations;
- obtain explicit human subject/crop approval;
- strip EXIF/GPS from public derivatives;
- do not imply municipal endorsement or completed CFL Wash Co. work.
EOF
