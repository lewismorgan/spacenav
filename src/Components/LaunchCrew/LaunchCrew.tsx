/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./LaunchCrew.css";

export interface CrewMember {
  name: string;
  imgUrl: string;
}

export interface LaunchCrewProps {
  crew: CrewMember[];
}

/** Component that displays a flexible listing of crew members with their image and name */
const LaunchCrew = (props: LaunchCrewProps) => {
  // Create the crew member component
  const members = props.crew.map((item) => {
    return (
      <div className="crew-member">
        <CrewMemberItem member={item}></CrewMemberItem>
      </div>
    );
  });

  return <div className="crew">{members}</div>;
};

function CrewMemberItem(props: { member: CrewMember }) {
  const { member } = props;
  return (
    <React.Fragment>
      <img src={member.imgUrl} />
      <span className="crew-member-name">{member.name}</span>
    </React.Fragment>
  );
}

export default LaunchCrew;
