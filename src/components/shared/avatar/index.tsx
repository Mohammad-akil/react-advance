import { Avatar as MuiAvatar } from "@mui/material";
import React from "react";
import colors from "./colors.json";
const Avatar = ({ children, ...props }: any) => {
  return (
    <MuiAvatar
      {...props}
      sx={{
        ...props.sx,
        color: "white",
        opacity: props.src ? "" : "0.7",
        background: props.isIcon
          ? ""
          : children
          ? colors?.find(
              (item) =>
                item.id === children?.toString()?.slice(0, 1)?.toLowerCase()
            )?.backgroundColor
          : "",
      }}
    >
      {children}
    </MuiAvatar>
  );
};
export default Avatar;
