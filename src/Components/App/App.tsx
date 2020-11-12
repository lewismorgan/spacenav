import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container/Container";
import SpacexUpcoming from "../SpaceX/SpacexUpcoming";
import { createMuiTheme, ThemeProvider, Typography } from "@material-ui/core";
import Countdown from "../Countdown/Countdown";

// variable to pass through for typography since you have to specify all headers
const defaultHeaderFont = {
  fontFamily: "Space Mono",
  fontVariant: "all-small-caps",
};

// Customize defaults of the material ui theme
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
    h3: defaultHeaderFont,
    h2: defaultHeaderFont,
    h1: defaultHeaderFont,
  },
});

/** The main entry point for the application, wraps up all the main components */
function App() {
  const name = "Crew-1";
  return (
    <ThemeProvider theme={theme}>
      <div className="countdown-container">
        {/* TODO: Load soonest mission into the countdown ticker */}
        <Typography variant="h3">{`Countdown Until ${name}`}</Typography>
        <Countdown time={`420d:10h:9m:8s`} />
      </div>
      <Container className="upcoming-container">
        <Typography variant="h3">Scheduled Launches</Typography>
        <SpacexUpcoming />
      </Container>
    </ThemeProvider>
  );
}

export default App;
