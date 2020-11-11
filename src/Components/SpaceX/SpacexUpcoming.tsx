import React, { useState, useEffect } from "react";
import {
  fetchCapsule,
  fetchLaunchpad,
  fetchRocket,
  fetchUpcomingLaunches,
} from "../../Network";
import UpcomingLaunches, { UpcomingLaunch } from "../Upcoming/Upcoming";

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
          result?.capsule !== undefined
            ? await fetchCapsule(result?.capsule)
            : null;

        const launch: UpcomingLaunch = {
          name: result.name,
          date: result.date,
          capsule: capsule?.name ?? "",
          rocket: rocket.name,
          launchpad: launchpad.name,
          location: `${launchpad.locality}, ${launchpad.region}`,
        };
        // Return a UpcomingLaunch, expected by the UpcomingLaunches component
        return launch;
      });

      // Resolve all the promises before assigning to the new state
      setData({ upcoming: await Promise.all(launches) });
    };
    // Begin fetching the data
    fetchData();
  }, []);

  return <UpcomingLaunches upcoming={data.upcoming}></UpcomingLaunches>;
};

export default SpacexUpcoming;
