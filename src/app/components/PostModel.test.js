import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

// Gör Next/Image till en vanlig <img> i tester (annars krånglar det)
jest.mock("next/image", () => {
  const React = require("react");
  const MockNextImage = (props) => 
    {
      React.createElement("img", props);
      const { fill, priority, ...rest } = props;
      return React.createElement("img", rest);
    }
  MockNextImage.displayName = "NextImage";
  return MockNextImage;
});

// Byter ut riktiga EditModel mot en enkel mock som kan trigga onSave/onClose
jest.mock("./EditModel", () => {
  return function MockEditModel({ post, onSave, onClose }) {
    return (
      <div data-testid="edit-model">
        <button onClick={() => onSave({ ...post, title: "Updated Title" })}>
          Save
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  };
});

import PostModel from "./PostModel";

// Enkel testdata (fejkad post)
const fakePost = {
  _id: "1",
  title: "Original Title",
  imageUrl: "/test.jpg",
  plaintextBody: "Hello world",
  categories: [{ title: "News" }, { title: "Tech" }],
};

// Ska uppdatera state via handleEditSave och kalla onEdit
test("handleEditSave uppdaterar state och kallar onEdit", () => {

const onEdit = jest.fn();

  render(<PostModel post={fakePost} onEdit={onEdit} onClose={jest.fn()} />);

  // Öppna edit-läget (knappen har title="Edit")
  fireEvent.click(screen.getByTitle("Edit"));
  expect(screen.getByTestId("edit-model")).toBeInTheDocument();

  // Spara i mocken ⇒ triggar onSave(updatedPost)
  fireEvent.click(screen.getByText("Save"));

  // onEdit ska ha kallats med uppdaterad titel
  expect(onEdit).toHaveBeenCalledTimes(1);
  expect(onEdit.mock.calls[0][0].title).toBe("Updated Title");

  // UI ska visa nya titeln
  expect(screen.getByRole("heading", { name: "Updated Title" })).toBeInTheDocument();
});

// Ska kalla onClose när man klickar på Close-knappen
test("kallar onClose när Close klickas", () => {

  const onClose = jest.fn();
  render(<PostModel post={fakePost} onClose={onClose} onEdit={jest.fn()} />);

  fireEvent.click(screen.getByTitle("Close"));

  expect(onClose).toHaveBeenCalledTimes(1);
});