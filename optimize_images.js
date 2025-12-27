
import sharp from 'sharp';

async function optimize() {
    console.log('Optimizing images...');

    // Optimize bujar.jpg
    try {
        await sharp('public/bujar.jpg')
            .resize(800)
            .webp({ quality: 75 })
            .toFile('public/bujar.webp');
        console.log('Optimized bujar.webp created');
    } catch (e) {
        console.error('Failed to optimize bujar.jpg', e);
    }

    // Optimize samet.jpg
    try {
        await sharp('public/samet.jpg')
            .resize(800)
            .webp({ quality: 75 })
            .toFile('public/samet.webp');
        console.log('Optimized samet.webp created');
    } catch (e) {
        console.error('Failed to optimize samet.jpg', e);
    }

    // Optimize water-overlay-clean.png
    try {
        await sharp('public/water-overlay-clean.png')
            .webp({ quality: 60 })
            .toFile('public/water-overlay-clean.webp');
        console.log('Optimized water-overlay-clean.webp created');
    } catch (e) {
        console.error('Failed to optimize water-overlay-clean.png', e);
    }

    // Optimize original-upload.png
    try {
        await sharp('public/original-upload.png')
            .resize(1000)
            .webp({ quality: 60 })
            .toFile('public/original-upload.webp');
        console.log('Optimized original-upload.webp created');
    } catch (e) {
        console.error('Failed to optimize original-upload.png', e);
    }

    // Optimize logo-transparent-v5.png
    try {
        await sharp('public/logo-transparent-v5.png')
            .webp({ quality: 80 })
            .toFile('public/logo-transparent-v5.webp');
        console.log('Optimized logo-transparent-v5.webp created');
    } catch (e) {
        console.error('Failed to optimize logo-transparent-v5.png', e);
    }
}

optimize();
