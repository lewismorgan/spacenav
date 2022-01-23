import React, {
  ReactElement, useEffect, useLayoutEffect, useState,
} from 'react';
import './App.css';
import {
  Container, createMuiTheme, ThemeProvider, Typography,
} from '@material-ui/core';
import CountdownSelector, { LaunchCountdown } from '../Countdown/CountdownSelector';
import { useRockets, useLaunchDetails, useUpcomingLaunches } from '../SpaceX';
import LaunchTable from '../Upcoming/Upcoming';
import Rockets from '../Rockets/Rockets';

/** Define defaults for header typography since you have to specify all headers */
const defaultHeaderFont = {
  fontFamily: 'Space Mono',
  fontVariant: 'all-small-caps',
};

/** Customize defaults of the material ui theme */
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#000000',
      paper: '#011307',
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

/** Create the content to display on the footer */
const Footer = () => (
  <div className="footer">
    <div>
      <span>Created by&nbsp;</span>
      <a href="https://github.com/lewismorgan">Lewis Morgan</a>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <span>Data retrieved from the&nbsp;</span>
      <a href="https://github.com/r-spacex/SpaceX-API">r-spacex/SpaceX API</a>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <span>View the source code on&nbsp;</span>
      <a href="https://github.com/lewismorgan/spacenav">GitHub</a>
    </div>
  </div>
);

/** Icon for link to source code on GitHub. Source from https://github.com/tholman/github-corners translated as a react component */
const GitHubIcon = () => (
  <>
    <a
      href="https://github.com/lewismorgan/spacenav"
      className="github-corner"
      aria-label="View source on GitHub"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style={{
          fill: '#fff',
          color: '#151513',
          position: 'absolute',
          top: 0,
          border: 0,
          right: 0,
        }}
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style={{ transformOrigin: '130px 106px' }}
          className="octo-arm"
        />
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          className="octo-body"
        />
      </svg>
    </a>
  </>
);

/** Helper fragment for building content that is styled similar for the main app */
function ContentContainer(props: { name: string; children: ReactElement }) {
  const { name, children } = props;

  return (
    <>
      <Container className="content-container">
        <Typography variant="h3">{name}</Typography>
        {children}
      </Container>
    </>
  );
}

export interface AppProps {
  onMounted: () => void;
}

/** The main entry point for the application */
const App: React.FC<AppProps> = ({ onMounted }: AppProps) => {
  // Fetch all the needed data to pass down into the components
  const upcomingLaunches = useUpcomingLaunches();
  const upcomingDetails = useLaunchDetails(upcomingLaunches);
  const rockets = useRockets();

  // Create a state that holds the map launch countdowns
  const [countdowns, setCountdowns] = useState([] as LaunchCountdown[]);
  useEffect(() => {
    // Map the existing launches to a LaunchCountdown for the countdown component
    setCountdowns(
      upcomingLaunches.map(
        (launch): LaunchCountdown => ({
          name: launch.name,
          endTime: new Date(launch.date).getTime(),
        }),
      ),
    );
  }, [upcomingLaunches]);

  // Keep track if components are still loading
  useLayoutEffect(() => {
    onMounted();
  }, [onMounted]);

  // Render the content
  return (
    <ThemeProvider theme={theme}>
      <GitHubIcon />
      <Container className="content-container">
        <div className="countdown-container">
          <CountdownSelector countdowns={countdowns} />
        </div>
      </Container>
      <ContentContainer name="Scheduled Launches">
        <LaunchTable items={upcomingDetails} />
      </ContentContainer>
      <ContentContainer name="Rockets">
        <Rockets rockets={rockets} />
      </ContentContainer>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
