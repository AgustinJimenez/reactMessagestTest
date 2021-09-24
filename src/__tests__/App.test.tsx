import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  const comp = render(<App />);
  expect(comp).toBeTruthy();

  const pageTitle = screen.getByTestId("page-title");
  const stopButton = screen.getByTestId("stop-button");
  const clearButton = screen.getByTestId("clear-button");
  const messagesLists = screen.getAllByTestId("messages-list");

  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle).toBeVisible();

  expect(stopButton).toBeInTheDocument();
  expect(stopButton).toBeVisible();

  expect(clearButton).toBeInTheDocument();
  expect(clearButton).toBeVisible();

  for (let messagesList of messagesLists) {
    expect(messagesList).toBeInTheDocument();
    expect(messagesList).toBeVisible();
    const messagesListTitle = within(messagesList).getByTestId(
      "messages-list-title"
    );
    const messagesListCount = within(messagesList).getByTestId(
      "messages-list-count"
    );

    expect(messagesListTitle).toBeInTheDocument();
    expect(messagesListTitle).toBeVisible();

    expect(messagesListCount).toBeInTheDocument();
    expect(messagesListCount).toBeVisible();
  }
});
