import React, { useEffect, useState } from "react";
import "./App.css";
import Container from "@material-ui/core/Container/Container";
import SpacexUpcoming from "../SpaceX/SpacexUpcoming";
import { createMuiTheme, ThemeProvider, Typography } from "@material-ui/core";
import { fetchUpcomingLaunches, LaunchResult } from "../../Network";
import { CountdownSelector } from "../Countdown/CountdownSelector";

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

// TODO: Click on the mission name to change mission countdown

/** The main entry point for the application, wraps up all the main components */
function App() {
  const [launches, setLaunches] = useState([] as LaunchResult[]);

  useEffect(() => {
    const fetchData = async () => {
      // Get the upcoming launches
      const launches = await fetchUpcomingLaunches();

      // Determine which launch is the soonest
      const now = Date.now();
      const sortedLaunches = launches
        .filter((launch) => {
          return new Date(launch.date).getTime() > now;
        })
        .sort((a, b) => {
          // Sort by the closest launch date to latest launch date
          const aDate = Date.parse(a.date);
          const bDate = Date.parse(b.date);
          return aDate.valueOf() - bDate.valueOf();
        });

      // Closest launch date was set as the first index in the array
      setLaunches(sortedLaunches);
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CountdownSelector
        countdowns={launches.map((launch) => [launch.name, launch.date])}
      />
      <Container className="upcoming-container">
        {/* TODO: Change between Scheduled launches and Past Launches (up to 10) */}
        <Typography variant="h3">Scheduled Launches</Typography>
        <SpacexUpcoming />
      </Container>
    </ThemeProvider>
  );
}

export default App;
