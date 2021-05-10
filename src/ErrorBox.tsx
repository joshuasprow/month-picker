import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export const ErrorBox: FC<{ error: Error }> = ({ error }) => {
  return (
    <Box color="error.main">
      <Typography variant="body1">{error.message}</Typography>
    </Box>
  );
};
