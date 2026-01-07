# App Icons

This directory contains the app icons for the PWA.

## Generating PNG Icons

The source SVG icon is available at `icon.svg`. To generate PNG icons at all required sizes:

### Option 1: Using ImageMagick (Recommended)

```bash
# Install ImageMagick if not already installed
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Run the generation script
cd scripts
./generate-png-icons.sh
```

### Option 2: Using Online Converter

1. Go to https://convertio.co/svg-png/ or https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`
3. Convert to PNG at these sizes: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
4. Save each as `icon-[SIZE]x[SIZE].png` in this directory

### Option 3: Using Node.js with sharp (if installed)

```bash
npm install sharp
node -e "
const sharp = require('sharp');
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
sizes.forEach(size => {
  sharp('icon.svg')
    .resize(size, size)
    .png()
    .toFile(\`icon-\${size}x\${size}.png\`)
    .then(() => console.log(\`Generated icon-\${size}x\${size}.png\`));
});
"
```

## Required Icon Sizes

- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192 (required for Android)
- 384x384
- 512x512 (required for Android splash screen)

## Current Status

✅ SVG icon created (`icon.svg`)
⏳ PNG icons need to be generated (run one of the options above)

