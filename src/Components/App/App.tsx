import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container/Container";
import SpacexUpcoming from "../SpaceX/SpacexUpcoming";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const defaultHeaderFont = {
  fontFamily: "Space Mono",
  fontVariant: "all-small-caps",
};

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#000000",
      paper: "#011307",
    },
  },
  typography: {
    h5: defaultHeaderFont,
    h4: defaultHeaderFont,
  },
});

/** The main entry point for the application, wraps up all the main components */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container className="upcoming-container">
        <SpacexUpcoming />
      </Container>
    </ThemeProvider>
  );
}

export default App;
