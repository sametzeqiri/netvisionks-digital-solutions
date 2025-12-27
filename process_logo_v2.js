
import sharp from 'sharp';
import fs from 'fs';

async function processImage() {
    try {
        // Read the latest uploaded image (from step 166 if possible, or the one we copied to original-upload.png)
        // We copied uploaded_image_1765577993093.png to public/original-upload.png in step 177.
        const inputPath = 'public/original-upload.png';
        const outputPath = 'public/logo-processed-v2.png';

        const { data, info } = await sharp(inputPath)
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        const pixelData = new Uint8Array(data);
        const width = info.width;
        const height = info.height;
        const channels = info.channels;

        // Helper: is pixel neutral (gray/white)?
        // Allows small tolerance for JPG compression noise if source was JPG, but PNG should be cleaner.
        const isNeutral = (r, g, b) => {
            const tolerance = 5;
            return Math.abs(r - g) < tolerance && Math.abs(g - b) < tolerance;
        };

        for (let i = 0; i < pixelData.length; i += channels) {
            const r = pixelData[i];
            const g = pixelData[i + 1];
            const b = pixelData[i + 2];

            // TARGET: 
            // 1. White background (255, 255, 255)
            // 2. Checkerboard Gray (usually around 204 or 192, or 240)
            // Silver metallic parts usually have gradients. We might lose some highlight pixels but better than having a box.

            // Strategy: Remove any high-brightness neutral pixel.
            // Threshold: > 180 brightness AND neutral.
            if (r > 180 && g > 180 && b > 180 && isNeutral(r, g, b)) {
                pixelData[i + 3] = 0; // Transparent
            }
        }

        await sharp(pixelData, {
            raw: { width, height, channels }
        })
            .toFormat('png')
            .toFile(outputPath);

        console.log('Processed v2 successfully');

    } catch (err) {
        console.error('Error:', err);
    }
}

processImage();
