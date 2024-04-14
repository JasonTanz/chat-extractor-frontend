import { CloudUploadOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FileUploadButtonProps } from "./@types/button";
import { fileSize } from "chat-extractor/container/ChatExtractor/validation";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FileUploadButton: React.FC<FileUploadButtonProps> = (props) => {
    const { error, onHandleButtonClick, dragActive } = props;

    // =============== VARIABLES
    const isError = error?.message;
    const borderColor = isError
        ? "1px dashed red"
        : "1px dashed rgba(76, 78, 100, 0.6)";
    const backgroundColor = dragActive ? "#f0f0f0" : "#fff";

    // =============== RENDER FUNCTIONS
    const renderContent = () => {
        return (
            <Stack alignItems={"center"} gap={0.5}>
                <CloudUploadOutlined />
                <Typography
                    display={"flex"}
                    fontSize={"0.875rem"}
                    color={"#6B7280"}
                >
                    <span
                        style={{
                            fontWeight: "800",
                            fontSize: ".875rem",
                            paddingRight: ".2rem",
                            color: "#1B1B1B",
                        }}
                    >
                        Upload{" "}
                    </span>
                    or drag and drop
                </Typography>

                <Typography fontSize={"0.75rem"} color={"#6B7280"}>
                    Text file (.txt) only up to {fileSize}
                </Typography>
            </Stack>
        );
    };

    // =============== VIEWS
    return (
        <Stack
            alignItems={"center"}
            borderRadius={"0.5rem"}
            justifyContent={"center"}
            direction="column"
            border={borderColor}
            onClick={onHandleButtonClick}
            bgcolor={backgroundColor}
            paddingY={"5rem"}
            sx={{
                cursor: "pointer",
            }}
        >
            {renderContent()}
        </Stack>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default FileUploadButton;
