const fs = require('fs');
const path = require('path');

// Simple SVG icon for Expense Tracker (dollar sign in a circle)
const iconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="100" fill="#000000"/>
  <text x="256" y="380" font-family="Arial, sans-serif" font-size="320" font-weight="bold" fill="#ffffff" text-anchor="middle">$</text>
</svg>`;

// Since we can't easily generate PNG from SVG in Node without canvas, 
// we'll create a simple HTML file that can be used to generate icons
// Or we can use online tools to convert SVG to PNG

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create an HTML file that can be used to generate icons
const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Icon Generator</title>
</head>
<body>
  <h1>Expense Tracker Icon Generator</h1>
  <p>Use this SVG and convert to PNG at the following sizes:</p>
  <ul>
    ${iconSizes.map(size => `<li>${size}x${size}</li>`).join('\n    ')}
  </ul>
  <div style="margin: 20px;">
    ${iconSvg}
  </div>
  <p>You can use online tools like <a href="https://convertio.co/svg-png/">convertio.co</a> or <a href="https://cloudconvert.com/svg-to-png">cloudconvert.com</a> to convert this SVG to PNG at different sizes.</p>
  <p>Or use ImageMagick: <code>convert -background none -size 192x192 icon.svg icon-192x192.png</code></p>
</body>
</html>`;

// Save SVG and HTML files
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

fs.writeFileSync(path.join(iconsDir, 'icon.svg'), iconSvg);
fs.writeFileSync(path.join(iconsDir, 'icon-generator.html'), htmlContent);

console.log('Icon files created in public/icons/');
console.log('1. icon.svg - Source SVG icon');
console.log('2. icon-generator.html - Helper page for generating PNGs');
console.log('\nTo generate PNG icons:');
console.log('Option 1: Use online converter with icon.svg');
console.log('Option 2: Use ImageMagick: convert -background none -size SIZE icon.svg icon-SIZE.png');
console.log('Option 3: Open icon-generator.html in browser and use browser tools');

