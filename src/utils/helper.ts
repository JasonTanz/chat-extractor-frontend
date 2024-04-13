import { ConfigProps } from "./types";

export const getReadableFileSizeString = (fileSizeInBytes: number) => {
    let i = -1;
    const byteUnits = ["kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"];
    do {
        fileSizeInBytes /= 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};

export const truncateFilename = (fileName: string, config?: ConfigProps) => {
    const { maxLength = 20 } = config || {};
    if (fileName.length > maxLength) {
        const startLength = Math.floor((maxLength - 3) / 2);
        const endLength = Math.ceil((maxLength - 3) / 2);
        const truncatedName =
            fileName.substring(0, startLength) +
            "..." +
            fileName.substring(fileName.length - endLength);
        return truncatedName;
    }

    return fileName;
};

export const wordString = (count: number) => {
    if (count === 1) {
        return "word";
    }
    return "words";
};
