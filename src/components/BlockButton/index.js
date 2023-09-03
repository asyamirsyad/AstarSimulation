import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import style from "./style.module.scss";
import clsx from "clsx";

const BlockButton = ({
  activated = false,
  deactivated = false,
  onClick,
  onChangeValue = () => {},
  type = "path",
  ...props
}) => {
  let btnClass;
  let btnDisabled = false;

  const [actived, setActived] = useState(false);

  switch (type) {
    case "path":
      btnClass = "btnBlock";
      break;
    case "wall":
      btnClass = "btnWall";
      btnDisabled = true;
      break;
  }

  useEffect(() => {
    if (deactivated) {
      setActived(false);
    }
    setActived(activated);
  }, [activated, deactivated]);

  return (
    <Button
      className={clsx(style[!actived ? btnClass : "btnActived"])}
      disabled={btnDisabled}
      onClick={() => {
        setActived(!actived);
        onClick?.();
        onChangeValue(!actived);
      }}
      {...props}
    />
  );
};
export default BlockButton;
