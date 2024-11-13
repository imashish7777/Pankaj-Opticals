import React from "react";

function Button({ name }) {
  return (
    <button type="button" className="btn checkoutButton mb-3 ">
      {name}
    </button>
  );
}

export default Button;
