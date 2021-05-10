import React, { Component, ErrorInfo, ReactNode } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

interface Props {
  children: ReactNode;
}

interface State {
  error: null | Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error: error || null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error in component:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <Box color="error.main">
          <Typography variant="body1">{this.state.error.message}</Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}
