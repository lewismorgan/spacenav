import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import LaunchCrew, { CrewMember } from "../LaunchCrew/LaunchCrew";

interface SpacexLaunchInfoProps {
  /** Mission details for the launch */
  details: string;
  /** Array of crew member ids if available */
  crewIds?: string[];
}

/**
 * Creates a component that provides in-depth information about a SpaceX launch and it's crew
 * @param props
 */
const SpacexLaunchInfo = (props: SpacexLaunchInfoProps) => {
  const { crewIds, details } = props;

  // Fetch information about the crew, if it has one
  useEffect(() => {
    if (crewIds == null) {
      // no crew data to fetch
      return;
    }
    // TODO: Fetch information about the crew
  }, []);

  return (
    <div className="launch-info">
      <DetailsContainer details={details} />
      {props.crewIds != null ? <CrewContainer crew={[]} /> : null}
    </div>
  );
};

/** Fragment for a section that contains info about the mission */
function DetailsContainer(props: { details: string }) {
  const { details } = props;

  return (
    <React.Fragment>
      <Container className="details-container">
        <Typography style={{ padding: "5px" }} variant="h5">
          The Mission
        </Typography>
        <p>{details}</p>
      </Container>
    </React.Fragment>
  );
}

/** Fragment for a section that lists out the crew for the mission */
function CrewContainer(props: { crew: CrewMember[] }) {
  const { crew } = props;

  return (
    <React.Fragment>
      <Container className="crew-container">
        <Typography style={{ padding: "5px" }} variant="h5">
          The Crew
        </Typography>
        <LaunchCrew crew={crew}></LaunchCrew>
      </Container>
    </React.Fragment>
  );
}

export default SpacexLaunchInfo;
