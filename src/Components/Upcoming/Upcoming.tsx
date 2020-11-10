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
  date: number;
  capsule: string;
  rocket: string;
  launchpad: string;
  state: string;
}

interface UpcomingLaunchesProps {
  /**
   * The list of upcoming launches to be displayed in the table
   */
  upcoming: UpcomingLaunch[];
}

/**
 * Creates a table that shows a list of upcoming rocket launches
 * @param props
 */
const UpcomingLaunches: React.FunctionComponent<UpcomingLaunchesProps> = (
  props
) => {
  // TODO: Provide the ability to expand the details of a launch if it has some
  //      for example: when you expand the Crew-1 launch, it should give the mission patch, crew, and details
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Capsule</TableCell>
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
              {/* TODO: Convert unix date to readable format */}
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.rocket}</TableCell>
              <TableCell align="left">{row.capsule}</TableCell>
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
