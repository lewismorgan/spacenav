import React from "react";
import { render } from "@testing-library/react";
import Rockets, { Rocket, RocketsProps } from "./Rockets";

function renderRockets(props: Partial<RocketsProps> = {}) {
  const defaultProps: RocketsProps = {
    rockets: [],
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return render(<Rockets {...defaultProps} {...props} />);
}

function createTestRocket(
  id: string,
  {
    name = id,
    description = "This is a testing rocket",
    active = true,
    firstFlight = "2010-10-10",
    imgUrls = [] as string[],
  } = {}
): Rocket {
  return {
    name,
    description,
    imgUrls,
    active,
    firstFlight,
    successRate: 100,
    cost: 420,
    weight: 690,
  };
}

describe("<Rockets />", () => {
  test("renders no rockets", async () => {
    const { container } = renderRockets();
    expect(container.children.length).toEqual(1);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test("renders list of multiple rockets sorted from active -> wip -> inactive", async () => {
    const rockets = [
      createTestRocket("test-rocket-wip", {
        active: false,
        firstFlight: "2030-10-10",
      }),
      createTestRocket("test-rocket-active", { active: true }),
      createTestRocket("test-rocket-inactive", { active: false }),
    ];

    const { getByText, container } = renderRockets({ rockets });

    const activeRocketHeader = getByText("test-rocket-active");
    const wipRocketHeader = getByText("test-rocket-wip");
    const inactiveRocketHeader = getByText("test-rocket-inactive");

    expect(container.firstChild?.childNodes[0]).toBe(
      activeRocketHeader.parentElement
    );
    expect(container.firstChild?.childNodes[1]).toBe(
      wipRocketHeader.parentElement
    );
    expect(container.firstChild?.childNodes[2]).toBe(
      inactiveRocketHeader.parentElement
    );
  });

  test("renders simple rocket string stats", async () => {
    const testRocket = createTestRocket("testrocket", {
      imgUrls: ["file://test.png"],
    });

    const { getByText, getByAltText } = renderRockets({
      rockets: [testRocket],
    });

    expect(getByText(testRocket.name)).toHaveTextContent(testRocket.name);
    expect(getByAltText(testRocket.name)).toHaveAttribute(
      "src",
      testRocket.imgUrls[0]
    );
    expect(getByText(testRocket.description)).toHaveTextContent(
      testRocket.description
    );
    expect(
      getByText(testRocket.cost.toString(), { exact: false })
    ).toHaveTextContent(`$ ${testRocket.cost.toString()}`);
    expect(
      getByText(testRocket.successRate.toString(), { exact: false })
    ).toHaveTextContent(`${testRocket.successRate} %`);
    expect(
      getByText(testRocket.weight.toString(), { exact: false })
    ).toHaveTextContent(`${testRocket.weight.toString()} lbs`);
  });

  test("renders rocket status active/retired/wip in different colors", async () => {
    const rockets = [
      createTestRocket("active", { active: true }),
      createTestRocket("inactive", { active: false }),
      createTestRocket("wip", { active: false, firstFlight: "2030-10-10" }),
    ];

    const { getByText } = renderRockets({ rockets });

    const active = getByText("Active");
    expect(active).toHaveStyle({ color: "lightgreen" });

    const inactive = getByText("Retired");
    expect(inactive).toHaveStyle({ color: "red" });

    const wip = getByText("Under Construction");
    expect(wip).toHaveStyle({ color: "yellow" });
  });
});
