import React, { useState, useEffect } from "react";
import { fetchUpcomingLaunches } from "../../api";
import UpcomingLaunches, { UpcomingLaunch } from "../Upcoming/Upcoming";

const SpacexUpcoming = () => {
  const [data, setData] = useState({ upcoming: Array<UpcomingLaunch>() });

  useEffect(() => {
    async function fetchData() {
      const arr = await fetchUpcomingLaunches();
      setData({ upcoming: arr });
    }
    fetchData();
  }, []);

  return <UpcomingLaunches upcoming={data.upcoming}></UpcomingLaunches>;
};

export default SpacexUpcoming;
