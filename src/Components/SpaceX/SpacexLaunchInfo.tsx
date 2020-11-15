import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fetchCrewMember } from "../../Network";
import LaunchCrew, { CrewMember } from "../LaunchCrew/LaunchCrew";
import "./styles.css";

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

  return (
    <div className="launch-info">
      <DetailsContainer details={details} />
      {/* Only build a crew container if there are crew ids */}
      {props.crewIds != null && props.crewIds.length > 0 ? (
        <CrewContainer crewIds={crewIds ?? []} />
      ) : null}
    </div>
  );
};

/** Fragment for a section that contains info about the mission */
function DetailsContainer(props: { details: string }) {
  const { details } = props;

  return (
    <React.Fragment>
      <Container className="details-container">
        <Typography className="spacex-info-header" variant="h4">
          Mission
        </Typography>
        <p>{details}</p>
      </Container>
    </React.Fragment>
  );
}

/** Fragment for a section that lists out the crew for the mission */
function CrewContainer(props: { crewIds: string[] }) {
  // TODO: Display placeholder content while crew is loading
  // TODO: Sort by Agency -> Name (last)

  const { crewIds } = props;
  const [data, setData] = useState({
    crewMembers: Array<CrewMember>(),
  });

  // Fetch information about the crew, if it has one
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching crew information");
      if (crewIds == null || crewIds.length === 0) {
        // no crew data to fetch
        return;
      }

      // Map the list of crew id's to promises that fetches data about the crew member
      const members = (
        await Promise.all(
          crewIds.map((id) => {
            return fetchCrewMember(id);
          })
        )
      ).map((member) => {
        // Use only the data that is needed from the result
        return { imgUrl: member.image, name: member.name };
      });

      // Data has been fetched and mapped, set the state to the new members
      setData({ crewMembers: members });
    };
    fetchData();
  }, [crewIds]);

  return (
    <React.Fragment>
      <Container className="crew-container">
        <Typography className="spacex-info-header" variant="h4">
          Crew
        </Typography>
        <LaunchCrew crew={data.crewMembers}></LaunchCrew>
      </Container>
    </React.Fragment>
  );
}

export default SpacexLaunchInfo;