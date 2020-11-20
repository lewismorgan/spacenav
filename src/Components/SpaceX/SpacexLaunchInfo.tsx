import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fetchCrewMember } from "../../Network";
import LaunchCrew, { CrewMember } from "../LaunchCrew/LaunchCrew";
import "./styles.css";

interface SpacexLaunchInfoProps {
  /** Mission details for the launch */
  details?: string;
  /** Array of crew member ids if available */
  crewIds?: string[];
}

/** Fragment for a section that contains info about the mission */
function DetailsContainer(props: { details: string }) {
  const { details } = props;

  return (
    <>
      <Container className="details-container">
        <Typography className="spacex-info-header" variant="h4">
          Mission
        </Typography>
        <p>{details}</p>
      </Container>
    </>
  );
}

/** Component for a section that lists out the crew for the mission */
function CrewContainer(props: { crewIds: string[] }) {
  const { crewIds } = props;
  const [data, setData] = useState({
    crewMembers: new Array<CrewMember>(),
  });

  // Fetch information about the crew, if it has one
  useEffect(() => {
    const fetchData = async () => {
      if (crewIds === undefined || crewIds.length === 0) {
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
    <Container className="crew-container">
      <Typography className="spacex-info-header" variant="h4">
        Crew
      </Typography>
      <LaunchCrew crew={data.crewMembers} />
    </Container>
  );
}

/**
 * Creates a component that provides in-depth information about a SpaceX launch and it's crew
 * @param props
 */
const SpacexLaunchInfo: React.FC<SpacexLaunchInfoProps> = ({
  crewIds,
  details,
}: SpacexLaunchInfoProps) => {
  return (
    <div className="launch-info">
      {details !== undefined && details.length > 0 ? (
        <DetailsContainer details={details} />
      ) : undefined}
      {/* Only build a crew container if there are crew ids */}
      {crewIds !== undefined && crewIds.length > 0 ? (
        <CrewContainer crewIds={crewIds ?? []} />
      ) : undefined}
    </div>
  );
};

// Assign nullable properties for the component to defaults
SpacexLaunchInfo.defaultProps = {
  crewIds: [],
  details: "",
};

export default SpacexLaunchInfo;
