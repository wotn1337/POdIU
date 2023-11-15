import { Input as AntdInput, InputProps } from "antd";
import classNames from "classnames";
import s from "./input.module.scss";

type Props = InputProps & {
  type?: "default" | "password";
};

export const Input: React.FC<Props> = ({ type = "default", ...props }) => {
  const classes = classNames(s.input, props.className);
  switch (type) {
    case "password": {
      return <AntdInput.Password {...props} className={classes} />;
    }
    default: {
      return <AntdInput {...props} className={classes} />;
    }
  }
};
