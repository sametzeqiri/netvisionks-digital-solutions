
import sharp from 'sharp';

async function processImage() {
    try {
        const inputPath = 'public/target-logo.png';
        const outputPath = 'public/logo-transparent-v4.png';

        const { data, info } = await sharp(inputPath)
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        const pixelData = new Uint8Array(data);
        const channels = info.channels;

        // Function to get color at x,y
        const getColor = (x, y) => {
            const idx = (y * info.width + x) * channels;
            return {
                r: pixelData[idx],
                g: pixelData[idx + 1],
                b: pixelData[idx + 2]
            };
        };

        // Sample background colors from borders
        const bgSamples = [];
        const step = 10;
        // Top and Bottom edges
        for (let x = 0; x < info.width; x += step) {
            bgSamples.push(getColor(x, 0));
            bgSamples.push(getColor(x, info.height - 1));
        }
        // Left and Right edges
        for (let y = 0; y < info.height; y += step) {
            bgSamples.push(getColor(0, y));
            bgSamples.push(getColor(info.width - 1, y));
        }

        // Deduplicate and filter samples to find dominant background colors
        // We expect clusters (e.g. White cluster, Gray cluster)
        // Simple approach: Store unique strings "r,g,b"
        const uniqueColors = new Set();
        bgSamples.forEach(c => uniqueColors.add(`${c.r},${c.g},${c.b}`));

        // Check distance to ANY of the collected border samples
        const bgTargets = Array.from(uniqueColors).map(s => {
            const [r, g, b] = s.split(',').map(Number);
            return { r, g, b };
        });

        const isBackground = (r, g, b) => {
            // Distance function
            for (const t of bgTargets) {
                // Euclidean distance squared
                const dist = (r - t.r) ** 2 + (g - t.g) ** 2 + (b - t.b) ** 2;
                if (dist < 2500) { // Sqrt(2500) = 50. Tolerance of 50 is generous.
                    return true;
                }
            }
            return false;
        };

        let removedCount = 0;
        for (let i = 0; i < pixelData.length; i += channels) {
            const r = pixelData[i];
            const g = pixelData[i + 1];
            const b = pixelData[i + 2];

            if (isBackground(r, g, b)) {
                pixelData[i + 3] = 0; // Transparent
                removedCount++;
            }
        }

        console.log(`Removed ${removedCount} pixels using border sampling.`);

        await sharp(pixelData, {
            raw: { width: info.width, height: info.height, channels }
        })
            .toFormat('png')
            .toFile(outputPath);

        console.log('Processed v4 successfully');

    } catch (err) {
        console.error('Error:', err);
    }
}

processImage();
