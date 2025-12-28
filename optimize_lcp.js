import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, 'public', 'hero-bg-1-mobile.jpg');
const outputPath = join(__dirname, 'public', 'hero-bg-1-mobile.webp');

console.log(`Converting ${inputPath} to ${outputPath}...`);

sharp(inputPath)
  .webp({ quality: 80, effort: 6 })
  .toFile(outputPath)
  .then(info => {
    console.log('Success:', info);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
