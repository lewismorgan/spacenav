import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container/Container";
import UpcomingLaunches, { UpcomingLaunch } from "../Upcoming/Upcoming";

function createData(
  name: string,
  date: number,
  rocket: string,
  capsule: string,
  launchpad: string,
  state: string
) {
  return { name, date, capsule, rocket, launchpad, state };
}

// TODO: Load rows from the SpaceX API
const tempRows: UpcomingLaunch[] = [
  createData(
    "Crew-1", // launches/upcoming (name)
    1605401340, // launches/upcoming (date_unix)
    "Dragon 2.0", // capsules/5f6f99fddcfdf403df379709 (type)
    "Falcon 9", // rockets/5e9d0d95eda69973a809d1ec (name)
    "KSC LC 39A", // launchpads/5e9e4502f509094188566f88 (name)
    "Florida, Cape Canaveral" // launchpads/5e9e4502f509094188566f88 (region, locality)
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
