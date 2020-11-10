import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

export interface UpcomingLaunch {
  name: string;
  date: string;
  rocket: string;
  launchpad: string;
  state: string;
}

interface UpcomingLaunchesProps {
  upcoming: UpcomingLaunch[];
}

const UpcomingLaunches: React.FunctionComponent<UpcomingLaunchesProps> = (
  props
) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Rocket</TableCell>
            <TableCell>Launchpad</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.upcoming.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.rocket}</TableCell>
              <TableCell align="left">{row.launchpad}</TableCell>
              <TableCell align="left">{row.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingLaunches;
