import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { setInterval } from "timers";
import "./Countdown.css";

export interface CountdownProps {
  endTime: string;
}

// TODO: Display changing characters while loading the launch name text

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateCountdown(end: number): CountdownTime {
  const now = new Date().getTime();
  const difference = end - now;

  // Using the difference, calculate the days/hours/min/seconds from ms
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

export default function Countdown(props: CountdownProps) {
  const { endTime } = props;
  // Set the state to start the countdown from the current property value
  const end = new Date(endTime).getTime();
  const [countdown, setCountdown] = useState(calculateCountdown(end));

  // Create an effect that re-calculates the countdown every second if the endTime changes
  useEffect(() => {
    const interval = setInterval(async () => {
      const countdown = calculateCountdown(end);
      setCountdown(countdown);
    }, 1000);
    return () => clearInterval(interval);
  }, [end]);

  return (
    <div className="countdown-ticker">
      <Typography variant="h1">
        {`${countdown.days}d:${countdown.hours}h:${countdown.minutes}m:${countdown.seconds}s`}
      </Typography>
    </div>
  );
}
