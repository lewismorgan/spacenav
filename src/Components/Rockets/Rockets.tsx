/* eslint-disable jsx-a11y/alt-text */
import "./Rockets.css";
import React from "react";
import { Paper, Typography } from "@material-ui/core";

/** Details about a rocket used for rendering */
export interface Rocket {
  name: string;
  description: string;
  imgUrl: string;
  firstFlight: string;
  successRate: number;
  active: boolean;
  cost: number;
  weight: number;
}

export interface RocketsProps {
  /** Details about the rockets to render */
  rockets: Rocket[];
}

/** Rocket statistic item that contains a title and value */
function RocketStat(props: {
  title: string;
  value: string;
  style?: React.CSSProperties;
}) {
  const { title, value, style } = props;

  return (
    <div className="rocket-stat">
      <span>{`${title}:`}</span>
      <span style={style}>{value}</span>
    </div>
  );
}

// Assign default properties for nullable values
RocketStat.defaultProps = {
  style: undefined,
};

/** Fragment that contains rendered information about a rocket */
function RocketItem(props: { rocket: Rocket }) {
  const { rocket } = props;

  let statusColor = "lightgreen";
  let statusText = "Active";
  if (!rocket.active) {
    statusText = "Retired";
    statusColor = "red";
  }
  if (!rocket.active && new Date(rocket.firstFlight).getTime() > Date.now()) {
    statusText = "Under Construction";
    statusColor = "yellow";
  }

  return (
    <>
      <Typography variant="h4">{rocket.name}</Typography>
      <img src={rocket.imgUrl} />
      <p>{rocket.description}</p>
      <RocketStat
        title="Status"
        value={statusText}
        style={{ color: statusColor }}
      />
      <RocketStat title="First Flight" value={rocket.firstFlight} />
      <RocketStat
        title="Mass"
        value={`${rocket.weight.toLocaleString()} lbs`}
      />
      <RocketStat
        title="Est. Cost"
        value={`$ ${rocket.cost.toLocaleString()}`}
      />
      <RocketStat title="Success Rate" value={`${rocket.successRate} %`} />
    </>
  );
}

/** Displays detailed information about the rockets in a flexible row of cards  */
const Rockets: React.FC<RocketsProps> = ({ rockets }: RocketsProps) => {
  // Sort based on the active status of the rocket and the date
  const sortedRockets = rockets.sort((a, b) => {
    if (a.active && b.active) return 0;
    if (a.active && !b.active) return -1;
    if (a.firstFlight > b.firstFlight) return -1;
    return 1;
  });

  return (
    <div className="rockets-container">
      {sortedRockets.map((rocket) => (
        <Paper key={rocket.name} elevation={0} className="rocket">
          <RocketItem rocket={rocket} />
        </Paper>
      ))}
    </div>
  );
};

export default Rockets;
