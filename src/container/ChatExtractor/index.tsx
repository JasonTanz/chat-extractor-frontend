import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import { ResultStructure } from "chat-extractor/@types/common";
import FileUploadedArea from "chat-extractor/components/FileUploaderArea";
import ResultBox from "chat-extractor/components/ResultBox";
import { usePostData } from "chat-extractor/hooks/fetchDataHooks";
import { size } from "lodash";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FieldValues } from "./props";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupSchema } from "./validation";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const ChatExtractorContainer: React.FC = () => {
    // =============== HOOKS
    const {
        control,
        setError,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<FieldValues>({
        resolver: yupResolver(yupSchema),
        mode: "all",
    });

    // =============== STATE
    const [data, setData] = useState<ResultStructure[]>([]);

    // =============== API
    const { loading, fetch } = usePostData({
        url: "/chat/analyze",
        onCompleted: (response) => {
            const responseData = response.data.data;
            setData([...responseData]);
        },
        onError(res) {
            const errorMessage =
                res?.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        },
    });

    // =============== EVENTS
    const onHandleSubmit = async (data: FieldValues) => {
        const formData = new FormData();
        data.files.forEach((file: File) => {
            formData.append("files", file);
        });
        fetch(formData);
    };

    // =============== VARIABLES
    const files = watch("files");
    const isDisabled = loading || size(files) === 0;

    // =============== RENDER FUNCTIONS
    const renderButtonContent = () => {
        if (!loading) return "Upload";
        return <CircularProgress size={22} sx={{ my: 0.5 }} color="inherit" />;
    };

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <Controller
                    name="files"
                    control={control}
                    render={({ field }) => (
                        <FileUploadedArea
                            onChange={field.onChange}
                            value={field.value}
                            name={field.name}
                            setError={setError}
                            errors={errors}
                        />
                    )}
                />
                <Stack alignItems={"flex-start"} mt={2}>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: ".55rem",
                            mt: ".5rem",
                        }}
                        type="submit"
                        disabled={isDisabled}
                    >
                        {renderButtonContent()}
                    </Button>
                </Stack>
            </form>
        );
    };

    // =============== VIEWS
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
                {renderForm()}
            </Grid>
            <Grid item xs={12} md={5}>
                <ResultBox data={data} />
            </Grid>
        </Grid>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default ChatExtractorContainer;
