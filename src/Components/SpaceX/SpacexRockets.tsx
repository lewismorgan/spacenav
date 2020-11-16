import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fetchRockets } from "../../Network";
import { Rocket, Rockets } from "../Rockets/Rockets";

export const SpacexRockets = () => {
  // Maintain a list of rockets to pass into the Rockets component
  const [rocketList, setRocketList] = useState([] as Rocket[]);
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
        } as Rocket;
      });
      setRocketList(rockets);
    };

    fetchData();
    return () => {};
  }, []);

  return (
    <Container style={{ margin: "0.69rem" }}>
      <Typography variant="h3">Rockets</Typography>
      <Rockets rockets={rocketList} />
    </Container>
  );
};
