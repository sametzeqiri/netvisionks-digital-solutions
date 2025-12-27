
import sharp from 'sharp';

async function optimize() {
    console.log('Optimizing images...');

    const targets = [
        { src: 'public/bujar.jpg', dest: 'public/bujar.webp', width: 800, quality: 75 },
        { src: 'public/samet.jpg', dest: 'public/samet.webp', width: 800, quality: 75 },
        { src: 'public/water-overlay-clean.png', dest: 'public/water-overlay-clean.webp', quality: 60 },
        { src: 'public/original-upload.png', dest: 'public/original-upload.webp', width: 1000, quality: 60 },
        { src: 'public/logo-transparent-v5.png', dest: 'public/logo-transparent-v5.webp', quality: 80 },
        { src: 'public/hero-bg-1.jpg', dest: 'public/hero-bg-1.webp', width: 1200, quality: 70 },
        { src: 'public/hero-bg-2.jpg', dest: 'public/hero-bg-2.webp', width: 1200, quality: 70 },
        { src: 'public/hero-bg-3.jpg', dest: 'public/hero-bg-3.webp', width: 1200, quality: 70 },
        { src: 'public/feat-1-2.jpg', dest: 'public/feat-1-2.webp', width: 1000, quality: 60 },
        { src: 'public/feat-1-3.jpg', dest: 'public/feat-1-3.webp', width: 1000, quality: 60 },
        { src: 'public/feat-2-1.jpg', dest: 'public/feat-2-1.webp', width: 1000, quality: 60 },
        { src: 'public/feat-2-2.jpg', dest: 'public/feat-2-2.webp', width: 1000, quality: 60 },
        { src: 'public/feat-2-3.jpg', dest: 'public/feat-2-3.webp', width: 1000, quality: 60 },
        { src: 'public/proj-1.jpg', dest: 'public/proj-1.webp', width: 800, quality: 60 },
        { src: 'public/proj-2.jpg', dest: 'public/proj-2.webp', width: 800, quality: 60 },
        { src: 'public/proj-3.jpg', dest: 'public/proj-3.webp', width: 800, quality: 60 },
        { src: 'public/proj-4.jpg', dest: 'public/proj-4.webp', width: 800, quality: 60 },
        { src: 'public/proj-5.jpg', dest: 'public/proj-5.webp', width: 800, quality: 60 },
        { src: 'public/proj-6.jpg', dest: 'public/proj-6.webp', width: 800, quality: 60 },
        { src: 'public/about-team.jpg', dest: 'public/about-team.webp', width: 1000, quality: 60 },
    ];

    for (const target of targets) {
        try {
            let s = sharp(target.src);
            if (target.width) s = s.resize(target.width);
            await s.webp({ quality: target.quality }).toFile(target.dest);
            console.log(`Optimized ${target.dest} created`);
        } catch (e) {
            console.error(`Failed to optimize ${target.src}`, e.message);
        }
    }
}

optimize();
