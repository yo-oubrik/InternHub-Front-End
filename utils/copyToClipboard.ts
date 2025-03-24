import toast from "react-hot-toast";

export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    } catch (error) {
        toast.error("Copied to clipboard!");
        console.error("Failed to copy:", error);
    }
};