export interface AverageColorOptions {
    /** Return color format: "hex" | "rgb" */
    format?: "hex" | "rgb";
    /** Apply opacity (0–1) */
    opacity?: number;
    /** Skip pure white pixels */
    skipWhite?: boolean;
}
/**
 *
 * @param imageSrc URL or path to the image
 * @param options Optional configuration
 * @returns Promise<string> Average color in the specified format
 */
export declare function getAverageColor(imageSrc: string, options?: AverageColorOptions): Promise<string>;
//# sourceMappingURL=index.d.ts.map