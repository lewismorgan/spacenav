import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Container,
  createMuiTheme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import CountdownSelector, {
  LaunchCountdown,
} from "../Countdown/CountdownSelector";
import {
  useRockets,
  useUpcomingLaunchDetails,
  useUpcomingLaunches,
} from "../SpaceX";
import UpcomingLaunches from "../Upcoming/Upcoming";
import { Rockets } from "../Rockets/Rockets";

/** Define defaults for header typography since you have to specify all headers */
const defaultHeaderFont = {
  fontFamily: "Space Mono",
  fontVariant: "all-small-caps",
};

/** Customize defaults of the material ui theme */
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

/** The main entry point for the application */
function App() {
  // Fetch the needed data to pass down into the components
  const launches = useUpcomingLaunches();
  const launchDetails = useUpcomingLaunchDetails(launches);
  const rockets = useRockets();

  // Create a state that holds the map launch countdowns
  const [countdowns, setCountdowns] = useState([] as LaunchCountdown[]);
  useEffect(() => {
    // Map the existing launches to a LaunchCountdown for the countdown component
    setCountdowns(
      launches.map(
        (launch): LaunchCountdown => {
          return { name: launch.name, unixLaunchTime: launch.date };
        }
      )
    );
    return () => {};
  }, [launches]);

  // Render the content
  return (
    <ThemeProvider theme={theme}>
      <Container className="content-container">
        <div className="countdown-container">
          <CountdownSelector countdowns={countdowns} />
        </div>
      </Container>
      <ContentContainer name="Scheduled Launches">
        <UpcomingLaunches upcoming={launchDetails} />
      </ContentContainer>
      <ContentContainer name="Rockets">
        <Rockets rockets={rockets} />
      </ContentContainer>
    </ThemeProvider>
  );
}

/** Helper fragment for building content that is styled similar for the main app */
function ContentContainer(props: { name: string; children: any }) {
  const { name, children } = props;

  return (
    <React.Fragment>
      <Container className="content-container">
        <Typography variant="h3">{name}</Typography>
        {children}
      </Container>
    </React.Fragment>
  );
}

export default App;
