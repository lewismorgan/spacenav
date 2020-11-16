import React from "react";
import "./App.css";
import SpacexUpcoming from "../SpaceX/SpacexUpcoming";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { CountdownSelector } from "../Countdown/CountdownSelector";
import { SpacexRockets } from "../SpaceX/SpacexRockets";
import { useUpcomingLaunches } from "../SpaceX";

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
  // Use the upcoming launches hook
  const launches = useUpcomingLaunches();

  return (
    <ThemeProvider theme={theme}>
      <CountdownSelector
        countdowns={launches.map((launch) => [launch.name, launch.date])}
      />
      <SpacexUpcoming />
      <SpacexRockets />
    </ThemeProvider>
  );
}

export default App;
