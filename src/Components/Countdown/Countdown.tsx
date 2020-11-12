import { Typography } from "@material-ui/core";
import React from "react";
import "./Countdown.css";

export interface CountdownProps {
  time: string;
}

// TODO: Display changing characters while loading the launch name text

export default function Countdown(props: CountdownProps) {
  const { time } = props;

  return (
    <div className="countdown-ticker">
      <Typography variant="h1">{time}</Typography>
    </div>
  );
}
