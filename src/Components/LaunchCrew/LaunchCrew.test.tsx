import { render } from "@testing-library/react";
import React from "react";
import LaunchCrew, { CrewMember } from "./LaunchCrew";

describe("<LaunchCrew />", () => {
  test("renders", () => {
    const { container } = render(<LaunchCrew crew={[]} />);
    expect(container).toBeInTheDocument();
  });

  test("renders crew members", () => {
    const baseName = "CrewMember-";
    const memberCount = 10;

    const members: CrewMember[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < memberCount; i++) {
      members.push({
        name: `${baseName}${i}`,
        imgUrl: `file://${baseName}${i}`,
      });
    }

    const { queryAllByText, queryAllByAltText } = render(
      <LaunchCrew crew={members} />
    );
    // Verify names and images are rendered
    expect(queryAllByText(baseName, { exact: false })).toHaveLength(
      memberCount
    );
    expect(queryAllByAltText(baseName, { exact: false })).toHaveLength(
      memberCount
    );
  });
});
