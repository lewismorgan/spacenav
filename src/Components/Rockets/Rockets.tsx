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
}

export interface RocketsProps {
  /** Details about the rockets to render */
  rockets: Rocket[];
}

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
    <React.Fragment>
      <Typography variant="h4">{rocket.name}</Typography>
      <img src={rocket.imgUrl} />
      <p>{rocket.description}</p>
      <RocketStat
        title="Status"
        value={statusText}
        style={{ color: statusColor }}
      />
      <RocketStat title="First Flight" value={rocket.firstFlight} />
      <RocketStat title="Success Rate" value={`${rocket.successRate} %`} />
    </React.Fragment>
  );
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

/** Displays detailed information about the rockets in a flexible row of cards  */
export const Rockets = (props: RocketsProps) => {
  const { rockets } = props;

  return (
    <div className="rockets-container">
      {rockets.map((rocket) => (
        <Paper key={rocket.name} elevation={0} className="rocket">
          <RocketItem rocket={rocket} />
        </Paper>
      ))}
    </div>
  );
};
