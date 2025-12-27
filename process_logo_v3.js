
import sharp from 'sharp';

async function processImage() {
    try {
        const inputPath = 'public/target-logo.png';
        const outputPath = 'public/logo-transparent-final.png';

        const { data, info } = await sharp(inputPath)
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        const pixelData = new Uint8Array(data);
        const channels = info.channels;

        // Analyze first 50x50 pixels to find background colors (checkerboard)
        // We expect two main colors (white and gray).
        const bgColors = {};
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 20; x++) {
                const idx = (y * info.width + x) * channels;
                const r = pixelData[idx];
                const g = pixelData[idx + 1];
                const b = pixelData[idx + 2];
                const key = `${r},${g},${b}`;
                bgColors[key] = (bgColors[key] || 0) + 1;
            }
        }

        // Sort colors by frequency to find top 2
        const sortedColors = Object.entries(bgColors)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5); // Take top 5 to be safe

        console.log('Detected Background Colors:', sortedColors);

        // Parse them into objects
        const targets = sortedColors.map(entry => {
            const [r, g, b] = entry[0].split(',').map(Number);
            return { r, g, b };
        });

        const isMatch = (r, g, b) => {
            return targets.some(t =>
                Math.abs(r - t.r) < 15 &&
                Math.abs(g - t.g) < 15 &&
                Math.abs(b - t.b) < 15
            );
        };

        let removedCount = 0;
        for (let i = 0; i < pixelData.length; i += channels) {
            const r = pixelData[i];
            const g = pixelData[i + 1];
            const b = pixelData[i + 2];

            if (isMatch(r, g, b)) {
                pixelData[i + 3] = 0; // Transparent
                removedCount++;
            }
        }

        console.log(`Removed ${removedCount} background pixels.`);

        await sharp(pixelData, {
            raw: { width: info.width, height: info.height, channels }
        })
            .toFormat('png')
            .toFile(outputPath);

        console.log('Processed final logo successfully');

    } catch (err) {
        console.error('Error:', err);
    }
}

processImage();
