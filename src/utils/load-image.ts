/**
 * Load image.
 *
 * @param url image url
 * @returns 
 */
export const loadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Load image error"));
    });
};