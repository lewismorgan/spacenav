import { MenuItem, Select, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Countdown from "./Countdown";
import "./Countdown.css";

export interface CountdownSelectorProps {
  /** Tuple of launch names with the time as a unix string */
  countdowns: string[][];
}

export const CountdownSelector = (props: CountdownSelectorProps) => {
  const { countdowns } = props;
  // Countdowns is stored as a tuple of launch name 0, launch time 1
  const names = countdowns.map((item) => item[0]);
  const times = countdowns.map((item) => item[1]);

  // Track the state of the picker being open or closed
  const [open, setOpen] = useState(false);
  // Use the first entry for the selected countdown value
  const [value, setValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as number);
  };

  return (
    <div className="countdown-container">
      <div className="countdown-selector">
        <Typography variant="h3">{`Countdown Until`}</Typography>
        <Select
          className="picker"
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={handleChange}
          value={value}
        >
          {names.map((item, index) => (
            <MenuItem key={item} value={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Countdown endTime={times[value]} />
    </div>
  );
};
