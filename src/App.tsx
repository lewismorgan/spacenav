import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container/Container";
import UpcomingLaunches, { UpcomingLaunch } from "./Components/Upcoming";

function createData(
  name: string,
  date: string,
  rocket: string,
  launchpad: string,
  state: string
) {
  return { name, date, rocket, launchpad, state };
}

const tempRows: UpcomingLaunch[] = [
  createData(
    "Crew-1",
    "11/05/2020",
    "Dragon",
    "KSC LC 39A",
    "Florida, Cape Canaveral"
  ),
];

function App() {
  return (
    <Container className="upcoming-container">
      <UpcomingLaunches upcoming={tempRows} />
    </Container>
  );
}

export default App;
