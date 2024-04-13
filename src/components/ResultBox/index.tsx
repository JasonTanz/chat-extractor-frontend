import { Stack, Typography } from "@mui/material";
import { isEmpty, map, size } from "lodash";
import {
    UserDetails,
    ResultStructure,
    UserRanking,
} from "chat-extractor/@types/common";
import { Fragment } from "react";
import { Props } from "./props";
import { wordString } from "chat-extractor/utils/helper";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const ResultBox: React.FC<Props> = (props) => {
    const { data } = props;

    // =============== HELPER FUNCTIONS
    const recursiveObjectMapper = (
        obj: ResultStructure | UserRanking,
        isOneFile: boolean
    ): React.ReactNode => {
        if (isEmpty(obj)) return <></>;

        if (isOneFile) {
            const firstValue = Object.values(obj)[0];
            return recursiveObjectMapper(firstValue, false);
        }

        return Object.entries(obj).map(([key, value], index) => (
            <Stack key={index} direction="row">
                <Typography pr={1}>{key} . </Typography>
                <Stack direction="column">
                    {value.map((item: UserDetails, idx: number) => {
                        const wordCount = item?.wordCount;
                        return (
                            <Stack key={idx} direction="row">
                                <Typography>{item.name} - </Typography>
                                <Typography pl={0.5}>
                                    {wordCount} {wordString(wordCount)}
                                </Typography>
                            </Stack>
                        );
                    })}
                </Stack>
            </Stack>
        ));
    };

    // =============== RENDER FUNCTIONS
    const renderResultData = () => {
        if (!data) return null;

        if (size(data) === 1) {
            const singleData = data[0];
            return recursiveObjectMapper(singleData, true);
        }

        return map(data, (item, index) => (
            <Stack key={index} direction="column" pb={2}>
                {Object.entries(item).map(([key, value], idx) => (
                    <Fragment key={idx}>
                        <Typography>{key}</Typography>
                        <Typography>==================</Typography>
                        {recursiveObjectMapper(value, false)}
                    </Fragment>
                ))}
            </Stack>
        ));
    };

    // =============== VIEWS
    return (
        <Stack width={"100%"} gap={1}>
            <Typography>Results</Typography>
            <Stack
                border="1px solid #E5E5E5"
                p={2}
                borderRadius={2}
                maxHeight={"25rem"}
                sx={{
                    overflowY: "auto",
                }}
            >
                {renderResultData()}
            </Stack>
        </Stack>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default ResultBox;
