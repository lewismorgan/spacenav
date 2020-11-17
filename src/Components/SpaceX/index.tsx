import React, { useState, useEffect } from "react";
import {
  fetchUpcomingLaunches,
  fetchRocket,
  fetchLaunchpad,
  fetchCapsule,
  LaunchResult,
  fetchRockets,
} from "../../Network";
import { Rocket } from "../Rockets/Rockets";
import { LaunchItem } from "../Upcoming/Upcoming";
import SpacexLaunchInfo from "./SpacexLaunchInfo";

/** Fetches upcoming rocket launches and assigns results as a state */
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

/** Fetches details from launch results */
export function useLaunchDetails(launchResults: LaunchResult[]) {
  // Fetch extended launch detail from the upcoming and assign it to the upcoming state variable
  const [data, setData] = useState(Array<LaunchItem>());
  useEffect(() => {
    // Create new function that asynchronously fetches data
    const fetchData = async () => {
      // Transform the exisiting upcoming launches to perform additional network requests
      const launches = launchResults.map(async (result) => {
        // Map each item to an UpcomingLaunch interface

        const rocket = await fetchRocket(result.rocket);
        const launchpad = await fetchLaunchpad(result.launchpad);
        // Attempt to fetch the capsule if it exists for this launch
        const capsule =
          result?.capsule != null ? await fetchCapsule(result?.capsule) : null;

        const launch: LaunchItem = {
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
      const details = await Promise.all(launches);

      // Resolve all the promises before assigning to the new state
      setData(details);
    };
    // Begin fetching the data
    fetchData();
  }, [launchResults]);

  return data;
}

/** Fetches all of the rockets and assigns it as a state */
export function useRockets() {
  const [rockets, setRockets] = useState([] as Rocket[]);
  useEffect(() => {
    const fetchData = async () => {
      // Obtain all the rockets and map to a property for Rockets element
      const rockets = (await fetchRockets()).map((result) => {
        return {
          name: result.name,
          description: result.description,
          imgUrl: result.imgUrls[0],
          firstFlight: result.firstFlight,
          successRate: result.successRate,
          active: result.active,
          cost: result.cost,
          weight: result.weight,
        } as Rocket;
      });
      setRockets(rockets);
    };

    fetchData();
    return () => {};
  }, []);

  return rockets;
}
