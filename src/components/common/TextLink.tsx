import React from "react";

import { textHover } from "../../styles";

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  addClasses?: string;
}

export const TextLink = (props: TextLinkProps) => {
  const classes = [props.addClasses, textHover].join(" ");

  return (
    <a className={classes} {...props}>
      {props.children}
    </a>
  );
};
