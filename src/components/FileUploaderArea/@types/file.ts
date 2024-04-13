import { UseFormReturn } from "react-hook-form";

export type FileUploadAreaProps = {
    errors: UseFormReturn["formState"]["errors"];
    value: File[];
    name: string;
    onChange: (args: File[]) => void;
    acceptType?: string;
    setError: any;
};
