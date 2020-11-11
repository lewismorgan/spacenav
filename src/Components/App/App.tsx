import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container/Container";
import UpcomingLaunches, { UpcomingLaunch } from "../Upcoming/Upcoming";

/** Helper method to create placeholder data that fits UpcomingLaunch interface */
function createData(
  name: string,
  date: string,
  rocket: string,
  capsule: string,
  launchpad: string,
  location: string,
  children: string
) {
  return { name, date, capsule, rocket, launchpad, location, children };
}

// TODO: Load from the SpaceX API
const tempRows: UpcomingLaunch[] = [
  createData(
    "Crew-1", // launches/upcoming (name)
    "2020-11-15T00:49:00.000Z", // launches/upcoming (date_utc)
    "Dragon 2.0", // capsules/5f6f99fddcfdf403df379709 (type)
    "Falcon 9", // rockets/5e9d0d95eda69973a809d1ec (name)
    "KSC LC 39A", // launchpads/5e9e4502f509094188566f88 (name)
    "Cape Canaveral, Florida", // launchpads/5e9e4502f509094188566f88 (region, locality)
    "SpaceX will launch the first operational mission of its Crew Dragon vehicle as part of NASA's Commercial Crew Transportation Capability Program (CCtCap), carrying 3 NASA astronauts and 1 JAXA astronaut to the International Space Station. This mission will be the second crewed flight to launch from the United States since the end of the Space Shuttle program in 2011."
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
