import React, { useEffect, useState } from "react";
import { setInterval } from "timers";
import "./Countdown.css";

export interface CountdownProps {
  /** When the countdown should reach 0 */
  endTime: string;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** From the provided end parameter, determine the days/hours/minutes/seconds until 0 */
function calculateCountdown(end: number): CountdownTime {
  const now = new Date().getTime();
  const difference = end - now;

  // Using the difference, calculate the days/hours/min/seconds from ms
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

/** Renders a component that counts down from the current time all the way to 0 based on the properties of the component  */
const Countdown: React.FC<CountdownProps> = (props: CountdownProps) => {
  const { endTime } = props;
  // Set the state to start the countdown from the current property value
  const end = new Date(endTime).getTime();
  // Determine an initial countdown value and use that as the initial state
  const [countdown, setCountdown] = useState(calculateCountdown(end));

  // Create an effect that re-calculates the countdown every second if the endTime changes
  useEffect(() => {
    // Only change state when the component is mounted to prevent flashing
    let isMounted = true;
    // Interval function that checks to make sure component is mounted before state change
    const interval = setInterval(() => {
      // The component isn't mounted
      if (!isMounted) return;
      // Component mounted, determine what the countdown should be
      const calculatedCountdown = calculateCountdown(end);
      setCountdown(calculatedCountdown);
    }, 1000);
    return () => {
      clearInterval(interval);
      // Component was disposed, changed isMounted to false
      isMounted = false;
    };
  }, [end]);

  return (
    <span className="countdown-ticker">
      {`${countdown.days}d:${countdown.hours}h:${countdown.minutes}m:${countdown.seconds}s`}
    </span>
  );
};

export default Countdown;
