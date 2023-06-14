import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SearchWord from "../SearchWord";

let callApiMock: jest.Mock<void, [string]> = jest.fn();

describe("SearchWord", () => {
  afterEach(() => {
    callApiMock.mockClear();
  });

  // Render

  test("renders without errors", () => {
    const { container } = render(<SearchWord callApi={callApiMock} />);
    expect(container).toBeInTheDocument();
  });

  // Good user interaction

  test("calls callApi function on form submit test", async () => {
    const { getByPlaceholderText, getByRole, queryByRole } = render(
      <SearchWord callApi={callApiMock} />
    );

    const searchInput = getByPlaceholderText("Search for any word");
    const error = queryByRole("alert");

    fireEvent.input(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(callApiMock).toHaveBeenCalledTimes(1);
      expect(callApiMock).toHaveBeenCalledWith("test");
      expect(error).not.toBeInTheDocument();
    });
  });

  test("calls callApi function on form submit 123, trigger Error", async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(
      <SearchWord callApi={callApiMock} />
    );

    const searchInput = getByPlaceholderText("Search for any word");

    fireEvent.input(searchInput, {
      target: { value: "123" },
    });
    const error = "You can only use alphabetic characters";

    await waitFor(() => {
      expect(callApiMock).toHaveBeenCalledTimes(1);
      expect(callApiMock).toHaveBeenCalledWith("123");
      expect(getByText(error)).toBeInTheDocument();
    });
  });

  test("calls callApi function on form submit empty field, trigger Error", async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(
      <SearchWord callApi={callApiMock} />
    );

    const form = getByRole("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(callApiMock).toHaveBeenCalledTimes(1);
      expect(callApiMock).toHaveBeenCalledWith("");
      expect(getByText("Whoops, can’t be empty…")).toBeInTheDocument();
    });
  });

  //Don't work...

  test("remove Error", async () => {
    const { getByPlaceholderText, getByRole, getByText, queryByText } = render(
      <SearchWord callApi={callApiMock} />
    );

    const searchInput = getByPlaceholderText("Search for any word");
    const form = getByRole("form");

    fireEvent.submit(form);

    const error = queryByText("Whoops, can’t be empty…");

    await waitFor(() => {
      expect(callApiMock).toHaveBeenCalledTimes(1);
      expect(callApiMock).toHaveBeenCalledWith("");
      expect(error).toBeInTheDocument();
    });

    fireEvent.input(searchInput, {
      target: { value: "test" },
    });

    await waitFor(() => {
      expect(error).not.toBeInTheDocument();
    });
  });

  test("Error change", async () => {
    const { getByPlaceholderText, getByRole, getByText, queryByText } = render(
      <SearchWord callApi={callApiMock} />
    );

    const searchInput = getByPlaceholderText("Search for any word");
    const form = getByRole("form");

    fireEvent.submit(form);

    const error = getByText("Whoops, can’t be empty…");

    await waitFor(() => {
      expect(callApiMock).toHaveBeenCalledTimes(1);
      expect(callApiMock).toHaveBeenCalledWith("");
      expect(error).toBeInTheDocument();
    });

    fireEvent.input(searchInput, {
      target: { value: "123" },
    });

    await waitFor(() => {
      const otherError = getByText("You can only use alphabetic characters");
      expect(otherError).toBeInTheDocument();
    });
  });
});
