import React, { useState } from "react";

export const Hamburger = (props) => {
  const { menuItems } = props;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="">
      <span onClick={() => setIsClicked(!isClicked)}>
        {" "}
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          className="w-2 ml-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="purple"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
        </svg>
      </span>

      {isClicked ? (
        <ul className="absolute shadow-md p-1 rounded-lg bg-white">
          {menuItems.map((item) => (
            <li
              className="mb-2 p-2 bg-gray-100"
              key={item.id + 2003}
              onClick={() => {
                item.clickEvent();
                setIsClicked(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
