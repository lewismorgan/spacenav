/* eslint-disable jsx-a11y/alt-text */
import "./Rockets.css";
import React from "react";
import { Paper, Typography } from "@material-ui/core";

export interface Rocket {
  name: string;
  description: string;
  imgUrl: string;
  firstFlight: string;
  successRate: number;
  active: boolean;
}

export interface RocketsProps {
  rockets: Rocket[];
}

function RocketItem(props: { rocket: Rocket }) {
  const { rocket } = props;

  return (
    <React.Fragment>
      <Typography variant="h4">{rocket.name}</Typography>
      <img src={rocket.imgUrl} />
      <p>{rocket.description}</p>
      <div className="rocket-stat">
        <span>Status:</span>
        <span
          style={rocket.active ? { color: "lightgreen" } : { color: "red" }}
        >
          {rocket.active ? "Active" : "Retired"}
        </span>
      </div>
      <div className="rocket-stat">
        <span>First Flight:</span>
        <span>{rocket.firstFlight}</span>
      </div>
      <div className="rocket-stat">
        <span>Success Rate:</span>
        <span>{`${rocket.successRate} %`}</span>
      </div>
    </React.Fragment>
  );
}

export const Rockets = (props: RocketsProps) => {
  const { rockets } = props;

  return (
    <div className="rocket-container">
      {rockets.map((rocket) => (
        <Paper key={rocket.name} elevation={0} className="rocket">
          <RocketItem rocket={rocket} />
        </Paper>
      ))}
    </div>
  );
};
