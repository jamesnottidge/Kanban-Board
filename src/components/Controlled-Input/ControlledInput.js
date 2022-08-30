import { React, useState } from "react";
import "./ControlledInput.css";

// Split this into two:
// - An input component that takes value and onChange as props. Renders an html input.
//   For bonus points, have it be able to handle labels too, without the consumer of the component
//   having to specify an id ;)
// - A new subtask component that manages state for a subtask, renders the input component and the button.

export const ControlledInput = (props) => {
  return (
    <div className="w-11/12 m-auto">
      <input
        onBlur={() =>
          props.handleBlur ? props.handleBlur() : console.log("flyer")
        }
        placeholder="Enter a "
        value={props.value}
        onChange={(e) => props.onChange(e)}
        className="p-2 border-solid border-2 border-gray-400 rounded-lg flex-1 bg-white body-lg px-4 py-2 my-2 block rounded border text-black border-mediumGrey placeholder:opacity-60 focus:outline-none focus:border-mainPurple mb-4 w-full"
      />
    </div>
  );
};
