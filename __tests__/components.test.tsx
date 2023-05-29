import React from "react";
import { render } from "@testing-library/react";

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

test("renders the correct message", () => {
  const { getByText } = render(<Hello name="John" />);
  const messageElement = getByText(/Hello, John!/i);
  expect(messageElement).toBeInTheDocument();
});
