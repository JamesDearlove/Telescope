import React from "react";

import { button } from "../../styles";

interface FormButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  // Types inferred from HTML button element.
  value?: string | number | readonly string[];

  addClasses?: string;
}

export const FormButton = (props: FormButtonProps) => {
  const classes = [props.addClasses, button].join(" ");

  return <button className={classes} {...props} />;
};
