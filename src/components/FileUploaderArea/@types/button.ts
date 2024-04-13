import { UseFormReturn } from "react-hook-form";

export type FileUploadButtonProps = {
    error?: Record<string, any>;
    onHandleButtonClick?: () => void;
    dragActive?: boolean;
    invalidType?: boolean;
    setError?: UseFormReturn["setError"];
    invalidMessage?: string;
    name: string;
};
