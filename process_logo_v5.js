
import sharp from 'sharp';

async function processImage() {
    try {
        const inputPath = 'public/target-logo.png';
        const outputPath = 'public/logo-transparent-v5.png';

        const { data, info } = await sharp(inputPath)
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        const pixelData = new Uint8Array(data);
        const { width, height, channels } = info;

        // 2D Array to keep track of visited pixels
        const visited = new Int8Array(width * height); // 0 = unvisited, 1 = visited/processed

        // Get color of a pixel
        const getPixel = (x, y) => {
            const idx = (y * width + x) * channels;
            return {
                r: pixelData[idx],
                g: pixelData[idx + 1],
                b: pixelData[idx + 2],
                a: pixelData[idx + 3]
            };
        };

        // Set pixel to transparent
        const clearPixel = (x, y) => {
            const idx = (y * width + x) * channels;
            pixelData[idx + 3] = 0;
        };

        // Analyze border colors to identify "background" colors
        const bgColors = [];
        const colorDist = (c1, c2) => Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b);

        // Add a color to likely backgrounds if it's new
        const addBgColor = (c) => {
            if (!bgColors.some(bg => colorDist(bg, c) < 15)) {
                bgColors.push(c);
            }
        };

        // Sample the perimeter
        for (let x = 0; x < width; x++) { addBgColor(getPixel(x, 0)); addBgColor(getPixel(x, height - 1)); }
        for (let y = 0; y < height; y++) { addBgColor(getPixel(0, y)); addBgColor(getPixel(width - 1, y)); }

        console.log(`Identified ${bgColors.length} background color variations on border.`);

        // Check if a color matches ANY of the identified background tones
        const isBackground = (c) => {
            return bgColors.some(bg => colorDist(bg, c) < 25); // Tolerance
        };

        // Flood Fill Queue
        const queue = [];

        // Initialize queue with all border pixels that match background
        // (This handles checkerboard starting at lighter/darker squares)
        for (let x = 0; x < width; x++) {
            if (isBackground(getPixel(x, 0))) queue.push({ x, y: 0 });
            if (isBackground(getPixel(x, height - 1))) queue.push({ x, y: height - 1 });
        }
        for (let y = 1; y < height - 1; y++) {
            if (isBackground(getPixel(0, y))) queue.push({ x: 0, y });
            if (isBackground(getPixel(width - 1, y))) queue.push({ x: width - 1, y });
        }

        let removedCount = 0;

        // Process Queue
        while (queue.length > 0) {
            const { x, y } = queue.pop();
            const idx = y * width + x;

            if (visited[idx]) continue;
            visited[idx] = 1;

            // Double check color (needed because we might push neighbors blindly? no, we verify before push usually)
            // But to be safe and clear it:
            clearPixel(x, y);
            removedCount++;

            // Neighbors
            const neighbors = [
                { nx: x + 1, ny: y },
                { nx: x - 1, ny: y },
                { nx: x, ny: y + 1 },
                { nx: x, ny: y - 1 }
            ];

            for (const { nx, ny } of neighbors) {
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    const nIdx = ny * width + nx;
                    if (!visited[nIdx]) {
                        const nColor = getPixel(nx, ny);
                        if (isBackground(nColor)) {
                            queue.push({ x: nx, y: ny }); // DFS/BFS
                        }
                    }
                }
            }
        }

        console.log(`Flood fill removed ${removedCount} pixels.`);

        await sharp(pixelData, { raw: { width, height, channels } })
            .toFormat('png')
            .toFile(outputPath);

        console.log('Processed v5 successfully');

    } catch (err) {
        console.error('Error:', err);
    }
}

processImage();
