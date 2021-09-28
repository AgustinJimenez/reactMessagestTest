import { render, within, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "..";
import { sleep } from "../../utils";

jest.setTimeout(10000);

describe("HomePage", () => {
  it("should generate snackbar notifications", async () => {
    render(<App />);
    await waitFor(
      async () => {
        const notification = await screen.findByRole("alert");
        expect(notification).toBeInTheDocument();
        expect(notification).toBeVisible();
      },
      { timeout: 10000 }
    );
  });

  it("should render page", async () => {
    render(<App />);
    const pageTitle = await screen.findByTestId("page-title");
    const startStopButton = await screen.findByTestId("start-stop-button");

    const clearButton = await screen.findByTestId("clear-button");
    const msgsLists = await screen.findAllByTestId("messages-list");

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toBeVisible();

    expect(startStopButton).toBeInTheDocument();
    expect(startStopButton).toBeVisible();

    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toBeVisible();

    for (let msgsList of msgsLists) {
      expect(msgsList).toBeInTheDocument();
      expect(msgsList).toBeVisible();
      const messagesListTitle = await within(msgsList).findByTestId(
        "messages-list-title"
      );
      expect(messagesListTitle).toBeInTheDocument();
      expect(messagesListTitle).toBeVisible();

      const messagesListCount = await within(msgsList).findByTestId(
        "messages-list-count"
      );
      expect(messagesListCount).toBeInTheDocument();
      expect(messagesListCount).toBeVisible();

      const messagesListCountValue = await within(
        messagesListCount
      ).findByTestId("messages-list-count-value");
      expect(messagesListCountValue.textContent).not.toBeNaN();
    }
  });

  it("should generate and render messages", async () => {
    render(<App />);
    const numberMsgsBefore = (
      await screen.findAllByTestId("messages-list-item")
    ).length;
    await waitFor(
      async () => {
        const messagesListItems = await screen.findAllByTestId(
          "messages-list-item"
        );
        for (let messagesListItem of messagesListItems) {
          const message = await within(messagesListItem).findByTestId(
            "messages-list-message"
          );
          expect(message).toBeVisible();
          expect(message).toBeInTheDocument();
          expect(message).not.toBeEmptyDOMElement();
          const clearButton = await within(messagesListItem).findByTestId(
            "messages-list-clear-button"
          );
          expect(clearButton).toBeVisible();
          expect(clearButton).toBeInTheDocument();
        }
        const numberMsgsAfter = (
          await screen.findAllByTestId("messages-list-item")
        ).length;
        expect(numberMsgsAfter).toBeGreaterThan(numberMsgsBefore);
      },
      { timeout: 5000 }
    );
  });

  it("should remove a message", async () => {
    render(<App />);
    await waitFor(
      async () => {
        const messagesListItems = await screen.findAllByTestId(
          "messages-list-item"
        );
        const numberMsgsBefore = messagesListItems.length;
        expect(numberMsgsBefore).toBeGreaterThan(0);
        const messagesListItem = messagesListItems[0];
        await within(messagesListItem)
          .getByTestId("messages-list-clear-button")
          .click();
        expect(messagesListItem).not.toBeVisible();
        expect(messagesListItem).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should remove all messages", async () => {
    render(<App />);
    await waitFor(
      async () => {
        const messagesListItems = await screen.findAllByTestId(
          "messages-list-item"
        );
        expect(messagesListItems.length).toBeGreaterThan(0);
        (await screen.findByTestId("clear-button")).click();
        for (let messagesListItem of messagesListItems)
          expect(messagesListItem).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should stop messages generation", async () => {
    render(<App />);
    const startStopButton = await screen.findByTestId("start-stop-button");
    let numberMsgsBefore = (await screen.findAllByTestId("messages-list-item"))
      .length;
    await waitFor(
      async () => {
        expect(
          (await screen.findAllByTestId("messages-list-item")).length
        ).toBeGreaterThan(numberMsgsBefore);
      },
      { timeout: 5000 }
    );
    expect(startStopButton.textContent).toBe("STOP");
    act(() => {
      startStopButton.click();
    });
    expect(startStopButton.textContent).toBe("START");
    numberMsgsBefore = (await screen.findAllByTestId("messages-list-item"))
      .length;
    await waitFor(
      async () => {
        await sleep(3000);
        expect(
          (await screen.findAllByTestId("messages-list-item")).length
        ).toBe(numberMsgsBefore);
      },
      { timeout: 4000 }
    );
  });
});
