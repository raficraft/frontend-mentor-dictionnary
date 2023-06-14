import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../useTheme";

describe("ThemeProvider", () => {
  test("should provide the theme context value to its children", () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme">{theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId("theme");
    expect(themeElement.textContent).toBe("light");
  });

  test("should toggle the theme correctly", () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <>
          <div data-testid="theme">{theme}</div>
          <button onClick={toggleTheme} data-testid="toggle-button">
            Toggle Theme
          </button>
        </>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId("theme");
    const toggleButton = screen.getByTestId("toggle-button");

    expect(themeElement.textContent).toBe("light");

    fireEvent.click(toggleButton);
    expect(themeElement.textContent).toBe("dark");

    fireEvent.click(toggleButton);
    expect(themeElement.textContent).toBe("light");
  });

  test("should render children components with the correct theme", () => {
    const ChildComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="child-component">{theme}</div>;
    };

    render(
      <ThemeProvider>
        <ChildComponent />
      </ThemeProvider>
    );

    const childComponent = screen.getByTestId("child-component");
    expect(childComponent.textContent).toBe("light");
  });

  test("should render the correct icon based on the theme", () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <>
          <button onClick={toggleTheme} data-testid="toggle-button">
            Toggle Theme
          </button>
          <span data-testid="icon">{theme === "light" ? "sun" : "moon"}</span>
        </>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId("toggle-button");
    const iconElement = screen.getByTestId("icon");

    expect(iconElement.textContent).toBe("sun");

    fireEvent.click(toggleButton);
    expect(iconElement.textContent).toBe("moon");

    fireEvent.click(toggleButton);
    expect(iconElement.textContent).toBe("sun");
  });
});
