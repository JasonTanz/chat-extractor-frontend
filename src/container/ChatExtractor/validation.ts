import { size } from "lodash";
import * as yup from "yup";
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILES = 10;
export const fileSize = "5MB";
const validFileType = ["text/plain"];
export const isValidFileType = (type: string) => {
    return type && validFileType.includes(type);
};

export const fileValidation = (requiredMessage = "Field is required") => {
    return yup
        .mixed()
        .test("required", requiredMessage, (file) => {
            return file && size(file) > 0;
        })
        .test("has-type", "File type was not provided", (file) => {
            if (file) {
                return (file as File[]).every((i) => i?.type !== "");
            }
            return;
        })
        .test("is-valid-type", "Not a valid file type", (file) => {
            if (file) {
                return (file as File[])
                    .filter((i) => i instanceof File)
                    .every((i) => isValidFileType(i?.type));
            }
            return;
        })
        .test("is-valid-size", `Max allowed size is ${fileSize}`, (file) => {
            if (file) {
                return (file as File[])
                    .filter((i) => i instanceof File)
                    .every((i) => (i?.size as number) <= MAX_FILE_SIZE);
            }
            return;
        })
        .test("max-files", `Max allowed files is ${MAX_FILES}`, (file) => {
            if (file) {
                return size(file) <= MAX_FILES;
            }
            return;
        });
};

export const yupSchema: any = yup.object().shape({
    files: fileValidation("File is required"),
});
