export const calculateTotalSize = (files: File[]): number => {
    return files.reduce((total, file) => total + file.size, 0);
};