import { useRef, useState, DragEvent, ChangeEvent, useEffect } from "react";
import { get, isEmpty, size } from "lodash";
import { Box, FormHelperText, Grid } from "@mui/material";
import { getReadableFileSizeString } from "chat-extractor/utils/helper";
import UploadedFile from "./upload";
import FileUploadButton from "./button";
import { FileUploadAreaProps } from "./@types/file";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FileUploadedArea: React.FC<FileUploadAreaProps> = (props) => {
    const {
        errors,
        value,
        name,
        onChange,
        acceptType = "text/plain",
        setError,
    } = props;
    // =============== HOOKS
    const fileInputRef = useRef<HTMLInputElement>(null);

    // =============== STATE
    const [files, setFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState<boolean>(false);

    // ================ EFFECTS
    useEffect(() => {
        setFiles(value ?? []);
    }, [value]);

    // =============== VARIABLES
    const error: any = get(errors, name);

    // =============== EVENTS
    const onHandleButtonClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const onHandleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const onHandleDrop = function (e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragActive(false);
        if (e?.dataTransfer?.files && e.dataTransfer.files[0]) {
            let droppedFiles: File[] = Array.from(e.dataTransfer.files);
            if (isEmpty(droppedFiles)) return;

            setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
            onChange?.([...files, ...droppedFiles]);
        }
    };

    const onHandleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        let selectedFiles: File[] = Array.from(target.files as FileList);
        if (isEmpty(selectedFiles)) return;
        const fileList = files;
        fileList.push(...selectedFiles);
        setFiles([...fileList]);
        onChange?.(fileList);
    };

    const onHandleRemove = (index: number) => {
        const fileList = [...files];
        fileList.splice(index, 1);
        setFiles([...fileList]);
        onChange?.(fileList);
    };

    // =============== RENDER FUNCTIONS
    const renderFilesPreview = () => {
        return (
            <Grid
                container
                spacing={2}
                mt={2.5}
                maxHeight={{
                    xs: "6rem",
                    sm: "8rem",
                    md: "12rem",
                }}
                sx={{
                    overflowY: "auto",
                }}
            >
                {files.map((file, i) => (
                    <Grid item key={i}>
                        <UploadedFile
                            file={file}
                            fileName={file.name}
                            fileSize={getReadableFileSizeString(file.size)}
                            onRemove={() => onHandleRemove(i)}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    };

    // =============== VIEWS
    return (
        <Box height={"100%"}>
            <Box
                component={"div"}
                height={"100%"}
                onDragEnter={onHandleDrag}
                onDragLeave={onHandleDrag}
                onDragOver={onHandleDrag}
                onDrop={onHandleDrop}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={onHandleFileChange}
                    onClick={(event: any) => (event.target.value = null)}
                    accept={acceptType}
                    multiple
                />
                <FileUploadButton
                    error={error}
                    onHandleButtonClick={onHandleButtonClick}
                    dragActive={dragActive}
                />
                {error && (
                    <FormHelperText error>{error?.message}</FormHelperText>
                )}
            </Box>
            {size(files) > 0 && renderFilesPreview()}
        </Box>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default FileUploadedArea;
