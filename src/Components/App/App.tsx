import React, { useEffect, useState } from "react";
import "./App.css";
import Container from "@material-ui/core/Container/Container";
import SpacexUpcoming from "../SpaceX/SpacexUpcoming";
import { createMuiTheme, ThemeProvider, Typography } from "@material-ui/core";
import Countdown from "../Countdown/Countdown";
import { fetchUpcomingLaunches } from "../../Network";

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
  const [nextLaunch, setNextLaunch] = useState({ name: "", time: "" });

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
      const launch = sortedLaunches[0];
      setNextLaunch({ name: launch.name, time: launch.date });
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="countdown-container">
        <Typography variant="h3">{`Countdown Until ${nextLaunch.name}`}</Typography>
        <Countdown endTime={nextLaunch.time} />
      </div>
      <Container className="upcoming-container">
        <Typography variant="h3">Scheduled Launches</Typography>
        <SpacexUpcoming />
      </Container>
    </ThemeProvider>
  );
}

export default App;
