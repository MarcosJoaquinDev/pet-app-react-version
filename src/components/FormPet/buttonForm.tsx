import React from "react";

const styleContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};
const classBtn = "button is-success is-medium";

export const ButtonReportPet: React.FC = (props: { text: string }) => {
  return (
    <div style={styleContainer}>
      <button className={classBtn}>{props.text}</button>
    </div>
  );
};
