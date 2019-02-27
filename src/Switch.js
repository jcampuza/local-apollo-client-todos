import React from "react";

export function Switch(props) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center"
      }}
    >
      <input type="checkbox" id={props.id} className="offscreen" {...props} />{" "}
      <label htmlFor={props.id} className="switch" />
    </div>
  );
}
