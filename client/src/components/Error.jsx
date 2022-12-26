import React from "react";

const Error = ({ message }) => {
  return (
    <div class="d-flex justify-content-center">
      <span className="text-white fw-bold fs-6 badge bg-danger p-2">
        {message}
      </span>
    </div>
  );
};

export default Error;
