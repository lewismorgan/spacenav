import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import React from "react";

export interface UpcomingLaunch {
  /** Unique name for this launch */
  name: string;
  /** UTC date string when the launch is expected to occur */
  date: string;
  capsule: string;
  rocket: string;
  launchpad: string;
  location: string;
  /**
   * Additional content to display when expanding
   */
  children?: any;
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
  const { upcoming } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell />
            {/* Created an empty cell to accomodate detail expansion, pushing name to the right */}
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Capsule</TableCell>
            <TableCell>Rocket</TableCell>
            <TableCell>Launchpad</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcoming.map((row) => (
            <Row key={row.name} row={row}></Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/**
 * React fragment specifically for the table rows so state can be maintained for detail expansion
 * @param props
 */
function Row(props: { row: UpcomingLaunch }) {
  const { row } = props;
  // Maintain the state for each row to know if it is expanded or not
  const [open, setOpen] = React.useState(false);

  // Create a cell that modifies the state of the row based on if it's open or closed
  const expansionCell = (
    <TableCell>
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      >
        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </IconButton>
    </TableCell>
  );
  const expansionRow = (
    <TableRow>
      {/* Set the column span to 7 because there are 7 headers for the table */}
      {/* If the span is not the same number of headers then weird width issues occur during expansion/collapse */}
      {/* Remove the padding so it doesnt show a gap between rows */}
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {row.children !== undefined ? row.children : null}
        </Collapse>
      </TableCell>
    </TableRow>
  );

  // Returns around fragment to prevent nested indentation when mapping the list during table creation
  return (
    <React.Fragment>
      <TableRow>
        {
          // Only display the expansion cell if there are children otherwise return an empty cell
          row.children !== undefined ? expansionCell : <TableCell />
        }
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{formatDate(row.date)}</TableCell>
        <TableCell align="left">{row.rocket}</TableCell>
        <TableCell align="left">{row.capsule}</TableCell>
        <TableCell align="left">{row.launchpad}</TableCell>
        <TableCell align="left">{row.location}</TableCell>
      </TableRow>
      {row.children !== undefined ? expansionRow : null}
    </React.Fragment>
  );
}

function formatDate(dateUtc: string): string {
  let date = new Date(dateUtc);
  return date.toLocaleString();
}

export default UpcomingLaunches;
