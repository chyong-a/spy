import { Box } from "@mui/material"

export const Wrapper = ({ id, currentId, children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >
            {id === currentId && <div>{children}</div>}
        </Box>
    )
}