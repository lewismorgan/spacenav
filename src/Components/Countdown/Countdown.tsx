import React, { useEffect, useState } from 'react';
import { setInterval } from 'timers';
import { DateTime } from 'luxon';
import './Countdown.css';

export interface CountdownProps {
  /** Unix timestamp when the countdown should reach 0 */
  endTime: number;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** From the provided end parameter, determine the days/hours/minutes/seconds until 0 */
function calculateCountdown(endTime: number): CountdownTime {
  if (endTime === undefined || Number.isNaN(endTime)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  const endDate = DateTime.fromMillis(endTime);
  const now = DateTime.fromJSDate(new Date(Date.now()));

  // Using the difference, calculate the days/hours/min/seconds from ms
  const { days, hours, minutes, seconds } = endDate.diff(now, ['day', 'minute', 'hour', 'seconds']);

  return {
    days,
    hours,
    minutes,
    seconds: Math.round(seconds),
  };
}

// eslint-disable-next-line max-len
/** Renders a component that counts down from the current time all the way to 0 based on the properties of the component  */
const Countdown: React.FC<CountdownProps> = (props: CountdownProps) => {
  const { endTime } = props;
  // Determine an initial countdown value and use that as the initial state
  const [countdown, setCountdown] = useState(calculateCountdown(endTime));

  // Create an effect that re-calculates the countdown every second if the endTime changes
  useEffect(() => {
    // Only change state when the component is mounted to prevent flashing
    let isMounted = true;
    // Interval function that checks to make sure component is mounted before state change
    const interval = setInterval(() => {
      // The component isn't mounted
      if (!isMounted) return;
      // Component mounted, determine what the countdown should be
      const calculatedCountdown = calculateCountdown(endTime);
      setCountdown(calculatedCountdown);
    }, 1000);
    return () => {
      clearInterval(interval);
      // Component was disposed, changed isMounted to false
      isMounted = false;
    };
  }, [endTime]);

  return (
    <span className="countdown-ticker">
      {`${countdown.days}d:${countdown.hours}h:${countdown.minutes}m:${countdown.seconds}s`}
    </span>
  );
};

export default Countdown;
