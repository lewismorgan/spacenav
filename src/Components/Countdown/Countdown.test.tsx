import { render } from "@testing-library/react";
import userClick from "@testing-library/user-event";
import React from "react";
import Countdown from "./Countdown";
import CountdownSelector, { LaunchCountdown } from "./CountdownSelector";

describe("<Countdown />", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders", () => {
    const { container } = render(<Countdown endTime={0} />);

    expect(container).toBeInTheDocument();
  });

  test("counts down to the endtime", async () => {
    // Set the countdown to begin 10 days from now, the FIXED_SYSTEM_TIME
    const later = Date.now() + 1000 * 60 * 60 * 24;

    const { findByText } = render(<Countdown endTime={later} />);

    const advancements = [1000, 1000 * 60, 1000 * 60 * 60];

    // eslint-disable-next-line no-restricted-syntax
    for await (const advancement of advancements) {
      jest.advanceTimersByTime(advancement);
      // Verify the text gets set as Nd:Nh:Nm:Ns
      const element = await findByText(
        /(\d|\d\d)d:(\d|\d\d)h:(\d|\d\d)m:(\d|\d\d)s/,
        undefined,
        { timeout: 1000 }
      );
      expect(element).toBeInTheDocument();
    }
  });
});

describe("<CountdownSelector />", () => {
  test("renders", () => {
    const { getByText } = render(<CountdownSelector countdowns={[]} />);

    expect(getByText("Countdown Until")).toBeInTheDocument();
    expect(getByText("0d:0h:0m:0s")).toBeInTheDocument();
  });

  test("renders the nearest countdown first", () => {
    const latestTime = Date.now() + 10000 * 60 * 60 * 24;
    const soonestTime = Date.now() + 1000 * 60 * 60;

    const countdowns: LaunchCountdown[] = [
      { name: "Latest Launch", endTime: latestTime },
      { name: "Closest Launch", endTime: soonestTime },
    ];

    const { getByText } = render(<CountdownSelector countdowns={countdowns} />);

    // The picker has the Closest launch and displays its time
    expect(getByText("Closest Launch")).toBeInTheDocument();
    expect(getByText("0d:0h:59m:60s")).toBeInTheDocument();
  });

  test("changes the name and time when a user selects countdown", async () => {
    const latestTime = Date.now() + 10000 * 60 * 60 * 24;
    const soonestTime = Date.now() + 1000 * 60 * 60;

    const countdowns: LaunchCountdown[] = [
      { name: "Latest Launch", endTime: latestTime },
      { name: "Closest Launch", endTime: soonestTime },
    ];

    const { getByText, getByRole, getAllByText, queryAllByText } = render(
      <CountdownSelector countdowns={countdowns} />
    );

    // Keep track of the DOM element that changes
    const pickedCountdown = getByText("Closest Launch");
    expect(pickedCountdown).toHaveTextContent("Closest Launch");
    expect(getByText("0d:0h:59m:60s")).toBeInTheDocument();

    // Pull up the input box
    userClick.click(getByRole("button"));

    // Selection box comes up with presentation role
    expect(getAllByText("Closest Launch")).toHaveLength(2);
    expect(getAllByText("Latest Launch")).toHaveLength(1);

    userClick.click(getByText("Latest Launch"));

    // Picked countdown text should now changed to the selected countdown
    expect(pickedCountdown).toHaveTextContent("Latest Launch");

    // Closest Launch is the input and it is now hidden
    expect(queryAllByText("Latest Launch")).toHaveLength(2);
    expect(queryAllByText("Closest Launch")).toHaveLength(1);
  });
});
