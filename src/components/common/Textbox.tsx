import React from "react";

import { textbox } from "../../styles";

interface TextboxProps extends React.HTMLAttributes<HTMLInputElement> {
  // Types inferred from HTML input element.
  autoFocus?: boolean;
  type?: string;
  value?: string | number | readonly string[];

  addClasses?: string;
}

export const Textbox = (props: TextboxProps) => {
  const classes = [textbox, props.addClasses].join(" ");

  return <input className={classes} {...props} />;
};
