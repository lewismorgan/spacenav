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

  return { days: days, hours: hours, minutes: minutes, seconds: seconds };
}

export default function Countdown(props: CountdownProps) {
  const { endTime } = props;
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  } as CountdownTime);

  useEffect(() => {
    const end = new Date(endTime).getTime();
    const interval = setInterval(() => {
      const countdown = calculateCountdown(new Date(end).getTime());
      setCountdown(countdown);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="countdown-ticker">
      <Typography variant="h1">
        {`${countdown.days}d:${countdown.hours}h:${countdown.minutes}m:${countdown.seconds}s`}
      </Typography>
    </div>
  );
}
