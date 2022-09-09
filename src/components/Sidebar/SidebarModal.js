import React from "react";
import { Sidebar } from "./Sidebar";

export const SidebarModal = (props) => {
  const { setShowSidebarModal } = props;

  return (
    <div
      className="modal-custom text-left"
      onClick={() => setShowSidebarModal(false)}
    >
      <div
        className="custom-modal-content p-5 py-7 max-w-min"
        onClick={(e) => e.stopPropagation()}
      >
        <Sidebar />
      </div>
    </div>
  );
};
