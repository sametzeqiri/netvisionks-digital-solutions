
import sharp from 'sharp';
import fs from 'fs';

async function processImage() {
    try {
        // Read the original upload
        const inputPath = 'public/original-upload.png';
        const outputPath = 'public/logo-processed.png';

        // Use sharp to remove background
        // We can try to trim or threshold transparency if it's white.
        // Assuming the background is white or near-white.

        // First, let's just convert to PNG and ensure alpha channel.
        // If the image has white background, we might want to make white transparent.
        // Sharp doesn't have a direct "make color transparent" easily without raw manipulation.
        // But let's try to see if we can just ensure it's a PNG.

        // Actually, if the user uploaded a PNG that HAS transparency but the previous tools messed it up, 
        // simply copying it (which we did) and using it should work.
        // BUT the user said "se den får fortfarande bakgrund" (see it still has background).

        // So the input image likely has a white or checkerboard background PIXELS.

        // Strategy: Use sharp to access raw pixel data and turn white/light pixels transparent.

        const { data, info } = await sharp(inputPath)
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        const pixelData = new Uint8Array(data);
        const width = info.width;
        const height = info.height;
        const channels = info.channels; // should be 4 for RGBA

        for (let i = 0; i < pixelData.length; i += channels) {
            const r = pixelData[i];
            const g = pixelData[i + 1];
            const b = pixelData[i + 2];

            // Check if pixel is light (white/gray)
            // Checkerboard usually alternates white (255) and light gray (e.g. 204 or 240)
            if (r > 200 && g > 200 && b > 200) {
                // Additional check: color variance (gray is r=g=b)
                if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10) {
                    pixelData[i + 3] = 0; // Set alpha to 0
                }
            }
        }

        await sharp(pixelData, {
            raw: { width, height, channels }
        })
            .toFormat('png')
            .toFile(outputPath);

        console.log('Background processed successfully');

    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
