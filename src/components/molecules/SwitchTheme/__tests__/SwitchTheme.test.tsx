import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SwitchTheme from "../SwitchTheme";
import { ThemeProvider, useTheme } from "@context/useTheme";

describe("SwitchTheme component", () => {
  test("renders the SwitchTheme component correctly", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SwitchTheme />
      </ThemeProvider>
    );
    const switchTheme = getByTestId("switch-theme-button");
    expect(switchTheme).toBeInTheDocument();
  });

  test("changes the body data-theme attribute on theme switch", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SwitchTheme />
      </ThemeProvider>
    );

    const body = document.body;
    expect(body).toHaveAttribute("data-theme", "light");

    const switchButton = getByTestId("switch-theme-button");
    fireEvent.click(switchButton);

    expect(body).toHaveAttribute("data-theme", "dark");
  });

  test("changes the body data-theme attribute on theme switch", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SwitchTheme />
      </ThemeProvider>
    );

    const body = document.body;
    expect(body).toHaveAttribute("data-theme", "light");

    const labelIcon = getByTestId("label-icon");
    fireEvent.click(labelIcon);

    expect(body).toHaveAttribute("data-theme", "dark");
  });

  test("renders the SwitchTheme component correctly with different themes", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SwitchTheme />
      </ThemeProvider>
    );

    // Test with light theme
    expect(getByTestId("switch-theme-button")).toHaveAttribute(
      "data-theme",
      "light"
    );

    // Switch to dark theme
    fireEvent.click(getByTestId("switch-theme-button"));
    expect(getByTestId("switch-theme-button")).toHaveAttribute(
      "data-theme",
      "dark"
    );

    // Switch back to light theme
    fireEvent.click(getByTestId("switch-theme-button"));
    expect(getByTestId("switch-theme-button")).toHaveAttribute(
      "data-theme",
      "light"
    );
  });
});
