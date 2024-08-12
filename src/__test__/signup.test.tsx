import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../pages/Signup"; // Adjust the import path if necessary

test("renders email input field and accepts input", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  // Check if the email input field is present
  const emailInput = screen.getByLabelText(/email address/i);
  expect(emailInput).toBeInTheDocument();

  // Simulate user input
  fireEvent.change(emailInput, { target: { value: "you.holt@reqres.in" } });

  // Verify the input value has been updated
  expect(emailInput).toHaveValue("tyou.holt@reqres.in");
});
