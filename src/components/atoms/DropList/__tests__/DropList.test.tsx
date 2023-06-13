import { render, fireEvent, waitFor } from "@testing-library/react";
import DropList from "../DropList";

interface UseCase {
  openListOnClick: (
    selectButton: HTMLButtonElement,
    optionsList: HTMLElement
  ) => Promise<void>;

  openListOnEnterKeyPress: (
    selectButton: HTMLButtonElement,
    optionsList: HTMLElement
  ) => Promise<void>;
}

const mockCallback = jest.fn();
const options = [
  { label: "Sans-serif", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
];

const renderDropList = () => {
  const { getByTestId } = render(
    <DropList options={options} callback={mockCallback} />
  );

  const selectButton = getByTestId("select-button") as HTMLButtonElement;
  const optionsList = getByTestId("options-list") as HTMLElement;

  return { selectButton, optionsList, getByTestId };
};

const useCase: UseCase = {
  openListOnClick: async (selectButton, optionsList) => {
    fireEvent.click(selectButton);

    await waitFor(() => {
      expect(optionsList).toHaveAttribute("data-open", "true");
    });
  },

  openListOnEnterKeyPress: async (selectButton, optionsList) => {
    fireEvent.focus(selectButton);
    fireEvent.keyDown(selectButton, { key: "Enter" });

    await waitFor(() => {
      expect(optionsList).toHaveAttribute("data-open", "true");
    });
  },
};

test("executes the callback function on option click", async () => {
  const { getByTestId } = renderDropList();

  fireEvent.click(getByTestId("option-button-1"));

  await waitFor(() => {
    expect(mockCallback).toHaveBeenCalledWith(options[1].value);
  });
});

test("toggles the options list on select button click", async () => {
  const { selectButton, optionsList } = renderDropList();

  expect(optionsList).toHaveAttribute("data-open", "false");

  fireEvent.click(selectButton);

  await waitFor(() => {
    expect(optionsList).toHaveAttribute("data-open", "true");
  });

  fireEvent.click(selectButton);

  await waitFor(() => {
    expect(optionsList).toHaveAttribute("data-open", "false");
  });
});

test("closes the options list on Enter key press", async () => {
  const { getByTestId, selectButton, optionsList } = renderDropList();

  expect(optionsList).toHaveAttribute("data-open", "false");

  fireEvent.click(selectButton);

  await waitFor(() => {
    expect(optionsList).toHaveAttribute("data-open", "true");
  });

  fireEvent.keyDown(getByTestId("option-button-1"), { key: "Enter" });

  await waitFor(() => {
    expect(optionsList).toHaveAttribute("data-open", "false");
  });
});

test("opens list on click", () => {
  const { selectButton, optionsList } = renderDropList();
  useCase.openListOnClick(selectButton, optionsList);
});

test("opens list on Enter key press", () => {
  const { selectButton, optionsList } = renderDropList();
  useCase.openListOnEnterKeyPress(selectButton, optionsList);
});

test("changes options on Tab key press when options list is open", async () => {
  const { selectButton, optionsList } = renderDropList();

  useCase.openListOnEnterKeyPress(selectButton, optionsList);

  fireEvent.keyDown(selectButton, { key: "Tab" });

  await waitFor(() => {
    expect(optionsList).toHaveAttribute("data-open", "true");
    expect(selectButton).toHaveValue(options[1].value); // Vérifiez la nouvelle option sélectionnée
  });
});
