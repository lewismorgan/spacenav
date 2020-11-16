import { Container, Typography } from "@material-ui/core";
import React from "react";
import { useUpcomingLaunchDetails } from ".";
import UpcomingLaunches from "../Upcoming/Upcoming";
import "./styles.css";

// TODO: Add props that contains previously retrieved launch info

/**
 * Displays a table of upcoming SpaceX Launches
 */
const SpacexUpcoming = () => {
  // Use the hook that is storing the upcoming launches
  const upcomingLaunches = useUpcomingLaunchDetails();

  return (
    <Container className="upcoming-container">
      <Typography variant="h3">Scheduled Launches</Typography>
      <UpcomingLaunches upcoming={upcomingLaunches}></UpcomingLaunches>
    </Container>
  );
};

export default SpacexUpcoming;
