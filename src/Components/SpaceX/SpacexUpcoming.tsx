import React, { useState, useEffect } from "react";
import {
  fetchCapsule,
  fetchLaunchpad,
  fetchRocket,
  fetchUpcomingLaunches,
} from "../../Network";
import UpcomingLaunches, { UpcomingLaunch } from "../Upcoming/Upcoming";
import SpacexLaunchInfo from "./SpacexLaunchInfo";

// TODO: Show a loading component for the table

/**
 * Displays a table of upcoming SpaceX Launches
 */
const SpacexUpcoming = () => {
  // Creates variable for the component to hold the array of launches as state
  const [data, setData] = useState({ upcoming: Array<UpcomingLaunch>() });

  // Fetch upcoming launches and assign it to the upcoming state variable
  useEffect(() => {
    const fetchData = async () => {
      // Create a network request that obtains the upcoming launches
      const upcoming = await fetchUpcomingLaunches();

      // Transform the upcoming launches to perform additional network requests
      const launches = upcoming.map(async (result) => {
        const rocket = await fetchRocket(result.rocket);
        const launchpad = await fetchLaunchpad(result.launchpad);
        // Attempt to fetch the capsule if it exists for this launch
        const capsule =
          result?.capsule != null ? await fetchCapsule(result?.capsule) : null;

        const launch: UpcomingLaunch = {
          name: result.name,
          date: result.date,
          capsule: capsule?.name ?? "",
          rocket: rocket.name,
          launchpad: launchpad.name,
          location: `${launchpad.locality}, ${launchpad.region}`,
          children:
            result.details != null ? (
              <SpacexLaunchInfo details={result.details} />
            ) : null,
        };
        // Return a UpcomingLaunch, expected by the UpcomingLaunches component
        return launch;
      });

      // Resolves all the promises from mapping the launches. Additionally it filters and sorts data to fit
      // the UpcomingLaunches component
      const currentLaunches = (await Promise.all(launches))
        .filter((item) => {
          // this happened in the past which wont have an updated date
          // > than now means it has yet to happen
          return Date.parse(item.date) > Date.now();
        })
        .sort((a, b) => {
          // Sort by the closest launch date to latest launch date
          const aDate = Date.parse(a.date);
          const bDate = Date.parse(b.date);
          return aDate.valueOf() - bDate.valueOf();
        });

      // Resolve all the promises before assigning to the new state
      setData({ upcoming: currentLaunches });
    };
    // Begin fetching the data
    fetchData();
  }, []);

  return <UpcomingLaunches upcoming={data.upcoming}></UpcomingLaunches>;
};

export default SpacexUpcoming;
