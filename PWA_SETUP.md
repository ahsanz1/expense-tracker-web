# PWA Setup Complete! 🎉

Your Expense Tracker app is now configured as a Progressive Web App (PWA) and can be installed on Android devices!

## What's Been Configured

✅ **next-pwa package** - Added to `package.json`  
✅ **PWA Configuration** - Configured in `next.config.mjs`  
✅ **Web App Manifest** - Created at `public/manifest.json`  
✅ **App Icons** - SVG icon created at `public/icons/icon.svg`  
✅ **PWA Meta Tags** - Added to `app/layout.tsx`  
✅ **Install Prompt** - Component created at `app/ui/install-prompt/index.tsx`  
✅ **Offline Caching** - Configured with NetworkFirst strategy  

## Next Steps

### 1. Install Dependencies

```bash
pnpm install
```

This will install the `next-pwa` package.

### 2. Generate PNG Icons

The SVG icon has been created, but you need to generate PNG icons at different sizes:

**Option A: Using ImageMagick (Recommended)**
```bash
# Install ImageMagick if needed
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Generate icons
./scripts/generate-png-icons.sh
```

**Option B: Using Online Converter**
1. Go to https://convertio.co/svg-png/
2. Upload `public/icons/icon.svg`
3. Convert to PNG at sizes: 72, 96, 128, 144, 152, 192, 384, 512
4. Save each as `icon-[SIZE]x[SIZE].png` in `public/icons/`

**Required icon files:**
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png` ⭐ (Required for Android)
- `icon-384x384.png`
- `icon-512x512.png` ⭐ (Required for Android splash)

### 3. Build and Test

```bash
# Build the app (PWA features are enabled in production)
pnpm run build

# Start production server
pnpm start
```

### 4. Test on Android

1. Deploy your app to a server with HTTPS (required for PWA)
2. Open the app in Chrome on your Android device
3. You should see an install prompt or "Add to Home Screen" option
4. Tap to install - the app will appear in your app drawer!

## Features

### Install Prompt
- Automatically shows on mobile devices
- Only appears when the app is installable
- Respects user dismissal (won't show again for 7 days)
- Styled to match your black/white theme

### Offline Support
- Static assets (CSS, JS, images) are cached
- Pages are cached for offline viewing
- API calls use NetworkFirst strategy (tries network, falls back to cache)

### App Experience
- **Standalone Mode**: Opens without browser UI
- **App Icon**: Appears in app drawer with your icon
- **Splash Screen**: Shows on app launch
- **Theme Color**: Black theme color for status bar

## Development Notes

- PWA is **disabled in development** mode to avoid caching issues
- Service worker is only active in production builds
- Icons must be PNG format (not SVG) for the manifest

## Troubleshooting

**Icons not showing?**
- Make sure all PNG icons are generated and in `public/icons/`
- Check that icon paths in `manifest.json` are correct

**Install prompt not showing?**
- Ensure you're on HTTPS (required for PWA)
- Check that you're on a mobile device or using Chrome DevTools mobile emulation
- Clear browser cache and try again

**Service worker not working?**
- PWA is disabled in development - test with `pnpm run build && pnpm start`
- Check browser console for service worker errors
- Clear site data and reload

## Customization

You can customize:
- **App Name**: Edit `name` and `short_name` in `public/manifest.json`
- **Theme Color**: Change `theme_color` in `manifest.json` and `app/layout.tsx`
- **Icon Design**: Replace `public/icons/icon.svg` and regenerate PNGs
- **Install Prompt**: Customize `app/ui/install-prompt/index.tsx`

Enjoy your installable Expense Tracker app! 📱

