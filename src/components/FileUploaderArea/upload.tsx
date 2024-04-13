import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Close, DescriptionOutlined } from "@mui/icons-material";
import { truncateFilename } from "chat-extractor/utils/helper";
import { UploadFileProps } from "./@types/upload";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const UploadedFile: React.FC<UploadFileProps> = (props) => {
    const {
        fileName,
        file,
        fileNameLength = 18,
        fileSize,
        onRemove,
        ...restProps
    } = props;

    // =============== RENDER FUNCTIONS
    const renderIcon = () => {
        return (
            <Box p={1}>
                <DescriptionOutlined />
            </Box>
        );
    };

    const renderFileInfo = () => {
        return (
            <Stack alignItems={"flex-start"}>
                <Typography variant={"body1"}>
                    {truncateFilename(fileName, {
                        maxLength: fileNameLength,
                    })}
                </Typography>
                <Typography variant={"caption"} color={"#6B7280"}>
                    {fileSize}
                </Typography>
            </Stack>
        );
    };

    // =============== VIEWS
    return (
        <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            border="1px solid #E4E7ED"
            borderRadius={2}
            gap={3}
            p={0.8}
            {...restProps}
        >
            <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ cursor: "pointer" }}
                gap={1}
            >
                {renderIcon()}
                {renderFileInfo()}
            </Stack>

            <IconButton sx={{ zIndex: 2 }} onClick={onRemove}>
                <Close />
            </IconButton>
        </Stack>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default UploadedFile;
