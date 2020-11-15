import React, { useEffect, useState } from "react";
import { Rocket, Rockets } from "../Rockets/Rockets";

const staticRockets: Rocket[] = [
  {
    name: "Falcon 1",
    description:
      "The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.",
    imgUrl: "https://imgur.com/DaCfMsj.jpg",
    firstFlight: "2006-03-24",
    successRate: 40,
    active: false,
  },
  {
    name: "Falcon 9",
    description:
      "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
    imgUrl: "https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg",
    firstFlight: "2010-06-04",
    successRate: 97,
    active: true,
  },
];

export const SpacexRockets = () => {
  const [rocketList, setRocketList] = useState([] as Rocket[]);

  useEffect(() => {
    const fetchData = async () => {
      // TODO: Retrieve the list of rockets from the SpaceX API
      setRocketList(staticRockets);
    };

    fetchData();
    return () => {};
  }, []);

  return <Rockets rockets={rocketList} />;
};
