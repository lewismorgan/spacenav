import Axios from "axios";

/**
 * Returns all of the upcoming launches.
 *
 * https://api.spacexdata.com/v4/launches/upcoming
 */
export async function fetchUpcomingLaunches(): Promise<LaunchResult[]> {
  // Find the latest launches
  const response = await Axios.get(
    "https://api.spacexdata.com/v4/launches/upcoming"
  );

  let arr = [];

  // Loop through the returned json array and parse to an LaunchResult
  for (let i in response.data) {
    const json = response.data[i];
    var launch: LaunchResult = {
      id: json["id"],
      name: json["name"],
      date: json["date_utc"],
      details: json["details"],
      rocket: json["rocket"],
      launchpad: json["launchpad"],
      upcoming: json["upcoming"],
      capsule: json["capsules"]?.length > 0 ? json["capsules"][0] : undefined,
      crew: json["crew"],
    };
    // Add to array to be returned
    arr.push(launch);
  }

  // Return the launches
  return arr;
}

export interface LaunchResult {
  id: string;
  name: string;
  date: string;
  details?: string;
  rocket: string;
  launchpad: string;
  capsule?: string;
  upcoming: boolean;
  crew?: string[];
}

/**
 * Returns detailed info about the rocket from the SpaceX api
 *
 * https://api.spacexdata.com/v4/rockets/{{id}}
 * @param rocket id of the rocket in the api
 */
export async function fetchRocket(rocket: string): Promise<RocketResult> {
  // Create the network request from rocket id
  const response = await Axios.get(
    `https://api.spacexdata.com/v4/rockets/${rocket}`
  );
  const json = response.data;

  // Use the results of the network request to obtain the needed data from the JSON file
  return {
    name: json["name"],
    active: json["active"],
    description: json["description"],
    imgUrls: json["flickr_images"],
    firstFlight: json["first_flight"],
    successRate: json["success_rate_pct"],
  };
}

/**
 * Returns all rockets from the SpaceX api
 *
 * https://api.spacexdata.com/v4/rockets
 */
export async function fetchRockets(): Promise<RocketResult[]> {
  const response = await Axios.get(`https://api.spacexdata.com/v4/rockets`);

  let rockets = [];

  for (let i in response.data) {
    const json = response.data[i];
    var rocket: RocketResult = {
      name: json["name"],
      active: json["active"],
      description: json["description"],
      imgUrls: json["flickr_images"],
      firstFlight: json["first_flight"],
      successRate: json["success_rate_pct"],
    };
    rockets.push(rocket);
  }

  return rockets;
}

/**
 * Rocket data from the SpaceX API
 */
interface RocketResult {
  name: string;
  description: string;
  imgUrls: string[];
  active: boolean;
  firstFlight: string;
  successRate: number;
}

/**
 * Returns detailed data about a launchpad from the SpaceX api
 *
 * https://api.spacexdata.com/v4/launchpads/{{id}}
 * @param launchpad id of the launchpad from the api
 */
export async function fetchLaunchpad(
  launchpad: string
): Promise<LaunchpadResult> {
  // Create the network request from launchpad id
  const response = await Axios.get(
    `https://api.spacexdata.com/v4/launchpads/${launchpad}`
  );
  const json = response.data;

  // Use the results of the network request to obtain the needed data from the JSON file
  return {
    name: json["name"],
    locality: json["locality"],
    region: json["region"],
  };
}

/**
 * Launchpad data from the SpaceX API
 */
interface LaunchpadResult {
  name: string;
  locality: string;
  region: string;
}

/**
 * Returns information about a capsule from the SpaceX API
 *
 * https://api.spacexdata.com/v4/capsules/{{capsuleID}}
 * @param capsule
 */
export async function fetchCapsule(capsule: string): Promise<CapsuleResult> {
  // Create the network request from launchpad id
  const response = await Axios.get(
    `https://api.spacexdata.com/v4/capsules/${capsule}`
  );
  const json = response.data;

  return { name: json["type"] };
}

/**
 * Capsule data from the SpaceX API
 */
interface CapsuleResult {
  name: string;
}

/**
 * Returns information about a crew member from the SpaceX API
 *
 * https://api.spacexdata.com/v4/crew/{{id}}
 * @param crew
 */
export async function fetchCrewMember(crew: string): Promise<CrewMemberResult> {
  const response = await Axios.get(
    `https://api.spacexdata.com/v4/crew/${crew}`
  );
  const json = response.data;

  return {
    name: json["name"],
    agency: json["agency"],
    image: json["image"],
  };
}

interface CrewMemberResult {
  name: string;
  agency: string;
  image: string;
}
