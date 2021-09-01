import React from "react";

import { button } from "../../styles";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  addClasses?: string;
}

export const Button = (props: ButtonProps) => {
  const classes = [props.addClasses, button].join(" ");

  return <div className={classes} {...props} />;
};
