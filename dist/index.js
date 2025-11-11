/**
 *
 * @param imageSrc URL or path to the image
 * @param options Optional configuration
 * @returns Promise<string> Average color in the specified format
 */
export async function getAverageColor(imageSrc, options = {}) {
    const { format = "hex", opacity = 1, skipWhite = false } = options;
    return new Promise((resolve, reject) => {
        // create an img element
        const img = new Image();
        img.crossOrigin = "anonymous"; // Needed for images from other domains
        img.src = imageSrc;
        // Wait for the image to fully load
        img.onload = () => {
            // create a hidden canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx)
                return reject("Canvas not supported");
            // resize image to smaller size for speed
            const width = 100;
            const height = 100;
            canvas.width = width;
            canvas.height = height;
            // draw image on the canvas
            ctx.drawImage(img, 0, 0, width, height);
            // get all pixel  data
            const imageData = ctx.getImageData(0, 0, width, height).data;
            // console.log(imageData);
            let r = 0, g = 0, b = 0, count = 0;
            // Loop through pixels (RGBA: every 4 values)
            for (let i = 0; i < imageData.length; i += 4) {
                const alpha = imageData[i + 3];
                if (alpha < 128)
                    continue; // skip transparent pixels
                // Get current component values
                const currentR = imageData[i];
                const currentG = imageData[i + 1]; // green
                const currentB = imageData[i + 2]; // blue
                if (skipWhite && currentR > 240 && currentG > 240 && currentB > 240)
                    continue;
                r += currentR;
                g += currentG;
                b += currentB;
                count++;
            }
            // Compute averages
            if (count === 0) {
                // If all pixels are skipped (transparent or white), use black
                r = 0;
                g = 0;
                b = 0;
            }
            else {
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
            }
            if (format === "rgb") {
                return resolve(`rgba(${r}, ${g}, ${b}, ${opacity})`);
            }
            // convert to HEX format
            const hex = rgbToHex(r, g, b);
            resolve(hex);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
    });
    // Helper to convert RGB → HEX
    function rgbToHex(r, g, b) {
        const toHex = (v) => v.toString(16).padStart(2, "0");
        const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        return opacity < 1 ? `${hex}${toHex(Math.round(opacity * 255))}` : hex;
    }
}
