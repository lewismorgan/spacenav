// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseLaunchResult(json: any): LaunchResult {
  return {
    id: json.id,
    name: json.name,
    date: json.date_utc,
    details: json.details,
    rocket: json.rocket,
    launchpad: json.launchpad,
    upcoming: json.upcoming,
    capsule: json.capsules?.length > 0 ? json.capsules[0] : undefined,
    crew: json.crew,
  };
}

/**
 * Returns all of the past launches from the SpaceX API.
 *
 * https://api.spacexdata.com/v4/launches/past
 */
export async function fetchPreviousLaunches(): Promise<LaunchResult[]> {
  const response = await fetch('https://api.spacexdata.com/v4/launches/past');
  const content = await response.json();

  const arr: LaunchResult[] = [];

  // Loop through and parse the launches
  Object.entries(content).forEach(([, value]) => {
    arr.push(parseLaunchResult(value));
  });

  return arr;
}

/**
 * Returns all of the upcoming launches from the SpaceX API.
 *
 * https://api.spacexdata.com/v4/launches/upcoming
 */
export async function fetchUpcomingLaunches(): Promise<LaunchResult[]> {
  // Find the latest launches
  const response = await fetch(
    'https://api.spacexdata.com/v4/launches/upcoming',
  );
  const content = await response.json();

  const arr: LaunchResult[] = [];

  // Loop through and parse the launches
  Object.entries(content).forEach(([, value]) => {
    arr.push(parseLaunchResult(value));
  });

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseRocketResult(json: any): RocketResult {
  return {
    name: json.name,
    active: json.active,
    description: json.description,
    imgUrls: json.flickr_images,
    firstFlight: json.first_flight,
    successRate: json.success_rate_pct,
    cost: json.cost_per_launch,
    weight: json.mass.lb,
  };
}

/**
 * Returns detailed info about the rocket from the SpaceX api
 *
 * https://api.spacexdata.com/v4/rockets/{{id}}
 * @param rocket id of the rocket in the api
 */
export async function fetchRocket(rocket: string): Promise<RocketResult> {
  // Create the network request from rocket id
  const response = await fetch(
    `https://api.spacexdata.com/v4/rockets/${rocket}`,
  );
  const json = await response.json();

  // Use the results of the network request to obtain the needed data from the JSON file
  return parseRocketResult(json);
}

/**
 * Returns all rockets from the SpaceX api
 *
 * https://api.spacexdata.com/v4/rockets
 */
export async function fetchRockets(): Promise<RocketResult[]> {
  const response = await fetch('https://api.spacexdata.com/v4/rockets');
  const content = await response.json();

  const rockets: RocketResult[] = [];

  // Rockets returns a list of objects
  Object.entries(content).forEach(([, value]) => {
    rockets.push(parseRocketResult(value));
  });

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
  cost: number;
  weight: number;
}

/**
 * Returns detailed data about a launchpad from the SpaceX api
 *
 * https://api.spacexdata.com/v4/launchpads/{{id}}
 * @param launchpad id of the launchpad from the api
 */
export async function fetchLaunchpad(
  launchpad: string,
): Promise<LaunchpadResult> {
  // Create the network request from launchpad id
  const response = await fetch(
    `https://api.spacexdata.com/v4/launchpads/${launchpad}`,
  );
  const json = await response.json();

  // Use the results of the network request to obtain the needed data from the JSON file
  return {
    name: json.name,
    locality: json.locality,
    region: json.region,
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
  const response = await fetch(
    `https://api.spacexdata.com/v4/capsules/${capsule}`,
  );
  const json = await response.json();

  return { name: json.type };
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
  const response = await fetch(`https://api.spacexdata.com/v4/crew/${crew}`);
  const json = await response.json();

  return {
    name: json.name,
    agency: json.agency,
    image: json.image,
  };
}

interface CrewMemberResult {
  name: string;
  agency: string;
  image: string;
}
