import React, { useState } from "react";
import "./Dropdown.css";

export const Dropdown = (props) => {
  const { menuItems } = props;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setIsClicked(!isClicked)}
        className="flex justify-left border-solid border-sky-300 border-2 px-6 py-2.5 bg-none mb-4 font-medium text-xs uppercase shadow-md uppercase rounded"
      >
        {props.placeHolder}
      </div>

      {isClicked ? (
        <ul className="absolute shadow-md p-1 rounded-lg bg-white menu">
          {menuItems.map((item) => (
            <li
              key={item.id + 2003}
              onClick={() => props.setStatus(item.name)}
              className="mb-2 p-2 bg-gray-100 "
            >
              {item.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
