import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const HTML_PATH = path.join(DIST_DIR, 'index.html');

async function inlineCss() {
    if (!fs.existsSync(HTML_PATH)) {
        console.error('dist/index.html not found. Run build first.');
        process.exit(1);
    }

    let html = fs.readFileSync(HTML_PATH, 'utf-8');

    // Regex to find the main CSS link injected by Vite
    // Matches <link rel="stylesheet" href="..."> or <link href="..." rel="stylesheet">
    // Allows for ./assets, /assets, or just assets/
    const cssLinkRegex = /<link[^>]+href="\.?(\/?assets\/index-[^"]+\.css)"[^>]*>|<link[^>]+href="\.?(\/?assets\/index-[^"]+\.css)"[^>]+rel="stylesheet"[^>]*>|<link[^>]+rel="stylesheet"[^>]+href="\.?(\/?assets\/index-[^"]+\.css)"[^>]*>/;

    const match = html.match(cssLinkRegex);

    if (match) {
        // match[1] or match[2] will contain the path
        const cssHref = match[1] || match[2] || match[3]; // Updated to account for the new regex groups

        // Remove leading slash for path check
        const relativeCssPath = cssHref.startsWith('/') ? cssHref.substring(1) : cssHref;
        const cssPath = path.join(DIST_DIR, relativeCssPath);

        if (fs.existsSync(cssPath)) {
            console.log(`Inlining CSS from ${relativeCssPath}`);
            const cssContent = fs.readFileSync(cssPath, 'utf-8');

            // Create style tag
            const styleTag = `<style>${cssContent}</style>`;

            // Replace the link tag with the style tag
            html = html.replace(match[0], styleTag);

            // Write back to index.html
            fs.writeFileSync(HTML_PATH, html);
            console.log('CSS inlined successfully into index.html');

            // Optional: Delete the CSS file if you want to clean up, but keeping it is safer for caching if something refers to it? 
            // Actually, if it's inlined, we don't need the file request. 
            // But keeping it doesn't hurt.

        } else {
            console.warn(`CSS file matching ${cssHref} not found at ${cssPath}`);
        }
    } else {
        // Fallback: Try to find ANY css in assets if the specific index one isn't matched
        console.log('No specific index CSS link found with standard Vite pattern. Checking for any assets/*.css injection.');
    }
}

inlineCss();
