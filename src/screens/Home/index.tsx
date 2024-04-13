import { Container, Stack, Typography } from "@mui/material";
import ChatExtractorContainer from "chat-extractor/container/ChatExtractor";

export type HomeScreenProps = {};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const HomeScreen: React.FC<HomeScreenProps> = () => {
    // =============== HOOKS

    // =============== STATE

    // =============== API

    // =============== EVENTS

    // =============== VARIABLES

    // =============== RENDER FUNCTIONS

    // =============== VIEWS
    return (
        <Container
            maxWidth="lg"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack
                bgcolor={"#FFF"}
                p={5}
                borderRadius={5}
                width={"100%"}
                height={"fit-content"}
                alignItems={"center"}
                flexDirection={{
                    xs: "column",
                    lg: "row",
                }}
            >
                <ChatExtractorContainer />
            </Stack>
        </Container>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default HomeScreen;
