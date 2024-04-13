export type UploadFileProps = {
    fileName: string;
    file: File;
    fileNameLength?: number;
    fileSize: string;
    onRemove: () => void;
};
