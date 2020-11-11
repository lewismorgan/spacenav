import Axios from "axios";
import { UpcomingLaunch } from "../Components/Upcoming/Upcoming";

export async function fetchUpcomingLaunches(): Promise<UpcomingLaunch[]> {
  // Find the latest launches
  const response = await Axios.get(
    "https://api.spacexdata.com/v4/launches/upcoming"
  );

  let arr = [];

  // Loop through the returned json array and parse to an UpcomingLaunch
  for (let i in response.data) {
    var launch: UpcomingLaunch = {
      name: response.data[i]["name"],
      date: response.data[i]["date_utc"],
      rocket: response.data[i]["rocket"],
      launchpad: response.data[i]["launchpad"],
      location: "Cape Canaveral, Florida", // TODO: Set location based on launchpad location
      capsule: response.data[i]["capsules"][0],
    };
    // Add to array to be returned
    arr.push(launch);
  }

  // TODO: Find the info for the capsule
  // TODO: FInd the info for the rocket
  // TODO: Find the launchpad info

  // Return the launches
  return arr;
}
