const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a canvas for the favicon
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// Set background to transparent
ctx.fillStyle = 'transparent';
ctx.fillRect(0, 0, 32, 32);

// Draw the brain icon
ctx.fillStyle = '#000000';
ctx.beginPath();
ctx.moveTo(16, 4);
ctx.bezierCurveTo(8, 4, 4, 8, 4, 16);
ctx.bezierCurveTo(4, 24, 8, 28, 16, 28);
ctx.bezierCurveTo(24, 28, 28, 24, 28, 16);
ctx.bezierCurveTo(28, 8, 24, 4, 16, 4);
ctx.closePath();
ctx.fill();

// Save as favicon.ico
const faviconBuffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), faviconBuffer);

// Save as icon.png
fs.writeFileSync(path.join(__dirname, 'public', 'icon.png'), faviconBuffer);

// Create apple icon (180x180)
const appleCanvas = createCanvas(180, 180);
const appleCtx = appleCanvas.getContext('2d');

// Set background to transparent
appleCtx.fillStyle = 'transparent';
appleCtx.fillRect(0, 0, 180, 180);

// Draw the brain icon
appleCtx.fillStyle = '#000000';
appleCtx.beginPath();
appleCtx.moveTo(90, 20);
appleCtx.bezierCurveTo(40, 20, 20, 40, 20, 90);
appleCtx.bezierCurveTo(20, 140, 40, 160, 90, 160);
appleCtx.bezierCurveTo(140, 160, 160, 140, 160, 90);
appleCtx.bezierCurveTo(160, 40, 140, 20, 90, 20);
appleCtx.closePath();
appleCtx.fill();

// Save as apple-icon.png
const appleBuffer = appleCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, 'public', 'apple-icon.png'), appleBuffer); 