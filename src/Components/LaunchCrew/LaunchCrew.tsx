import React from 'react';
import './LaunchCrew.css';

export interface CrewMember {
  name: string;
  imgUrl: string;
}

export interface LaunchCrewProps {
  crew: CrewMember[];
}

/** Renders a fragment that contains an image and a name of the crew member */
function CrewMemberItem(props: {member: CrewMember}) {
  const {member} = props;
  return (
    <>
      <img src={member.imgUrl} alt={member.name} />
      <span className="crew-member-name">{member.name}</span>
    </>
  );
}

/** Component that displays a flexible listing of crew members with their image and name */
const LaunchCrew: React.FC<LaunchCrewProps> = ({crew}: LaunchCrewProps) => {
  // Create the crew member component
  const members = crew.map(item => {
    return (
      <div key={item.name} className="crew-member">
        <CrewMemberItem member={item} />
      </div>
    );
  });

  return <div className="crew">{members}</div>;
};

export default LaunchCrew;
