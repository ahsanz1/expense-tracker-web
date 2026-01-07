#!/bin/bash

# Script to generate PNG icons from SVG using ImageMagick
# If ImageMagick is not installed, install it with: brew install imagemagick (macOS) or apt-get install imagemagick (Linux)

ICON_SVG="public/icons/icon.svg"
ICON_DIR="public/icons"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed."
    echo "Install it with:"
    echo "  macOS: brew install imagemagick"
    echo "  Linux: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Generate icons in all required sizes
sizes=(72 96 128 144 152 192 384 512)

for size in "${sizes[@]}"; do
    echo "Generating icon-${size}x${size}.png..."
    convert -background none -size "${size}x${size}" "$ICON_SVG" "${ICON_DIR}/icon-${size}x${size}.png"
done

echo "All icons generated successfully!"

