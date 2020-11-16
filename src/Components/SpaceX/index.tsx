import React, { useState, useEffect } from "react";
import {
  fetchUpcomingLaunches,
  fetchRocket,
  fetchLaunchpad,
  fetchCapsule,
  LaunchResult,
} from "../../Network";
import { UpcomingLaunch } from "../Upcoming/Upcoming";
import SpacexLaunchInfo from "./SpacexLaunchInfo";

// Both of these hooks are used frequently,

export function useUpcomingLaunches() {
  const [launches, setLaunches] = useState(Array<LaunchResult>());

  useEffect(() => {
    // Create new function that asynchronously fetches data
    const fetchData = async () => {
      // Get the upcoming launches
      const launches = await fetchUpcomingLaunches();

      // Determine which launch is the soonest
      const now = Date.now();
      const sortedLaunches = launches
        .filter((launch) => {
          // Make sure the launch hasn't happened yet
          return new Date(launch.date).getTime() > now;
        })
        .sort((a, b) => {
          // Sort by the closest launch date to latest launch date
          const aDate = Date.parse(a.date);
          const bDate = Date.parse(b.date);
          return aDate.valueOf() - bDate.valueOf();
        });

      // Closest launch date was set as the first index in the array
      setLaunches(sortedLaunches);
    };
    fetchData();
    return () => {};
  }, []);

  return launches;
}

// TODO: Accept a parameter for the upcoming launches already obtained instead of using the hook
export function useUpcomingLaunchDetails() {
  // Bind the state to the info obtained from upcoming launches
  const upcoming = useUpcomingLaunches();

  // Fetch extended launch detail from the upcoming and assign it to the upcoming state variable
  const [data, setData] = useState(Array<UpcomingLaunch>());
  useEffect(() => {
    // Create new function that asynchronously fetches data
    const fetchData = async () => {
      // Transform the exisiting upcoming launches to perform additional network requests
      const launches = upcoming.map(async (result) => {
        // Map each item to an UpcomingLaunch interface

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
          child:
            result.details != null ? (
              <SpacexLaunchInfo
                details={result.details}
                crewIds={result.crew}
              />
            ) : null,
        };
        // Return a UpcomingLaunch, expected by the UpcomingLaunches component
        return launch;
      });

      // Resolves all the promises from mapping the launches.
      const currentLaunches = await Promise.all(launches);

      // Resolve all the promises before assigning to the new state
      setData(currentLaunches);
    };
    // Begin fetching the data
    fetchData();
  }, [upcoming]);

  return data;
}
