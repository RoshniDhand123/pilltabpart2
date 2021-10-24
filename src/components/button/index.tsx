import React from "react";
import "./style.scss";

type Props = {
  btnText: string;
  type?: any;
  className?: string;
  background?: string;
  color?: string;
  onClick?(evt: any): void;
  disabled?: boolean;
  styles?:string;
};

const ButtonComponent = ({ btnText, className, styles,...rest }: Props) => {
  //const style={{ background: background, color: color }}
  return (
    <button className={`btn font-bold ${className} ${styles}`} {...rest}>
      {btnText}
    </button>
  );
};

export default ButtonComponent;
