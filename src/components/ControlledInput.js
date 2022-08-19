import { React, useState } from "react";

// Split this into two:
// - An input component that takes value and onChange as props. Renders an html input.
//   For bonus points, have it be able to handle labels too, without the consumer of the component
//   having to specify an id ;)
// - A new subtask component that manages state for a subtask, renders the input component and the button.

export const ControlledInput = (props) => {
  return (
    <div>
      <input
        onBlur={() =>
          props.handleBlur ? props.handleBlur() : console.log("flyer")
        }
        placeholder="Enter a "
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
};
