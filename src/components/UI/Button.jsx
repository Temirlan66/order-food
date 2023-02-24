// import styled from "styled-components";
// import {styled} from "@mui/system"

import { Button } from "@mui/material";
import { styled } from "@mui/system";
export default function BasicButtons({
  children,
  borderStyle,
  variant = "contained",
  ...restProps
}) {
  return (
    <StyledButton variant={variant} {...restProps}>
      {children}
    </StyledButton>
  );
}



const getBackgroundColor = (variant) => {
  return variant === "contained" ? "rgb(126, 42, 10)" : "#fff";
};
const getBorder = (variant) => {
  return variant === "contained"
    ? "none"
    : " 1px solid #8A2B06; color:#8A2B06 ";
};

const getBorderRadius = (borderStyle) => {
  return borderStyle === "rounder" ? "20px" : "6px";
};


const getPadding = (borderStyle) => {
  return borderStyle === "rounded" ? "10px 32px" : "8px 6px";
};



const StyledButton = styled(Button)(({ borderStyle, variant }) => ({
  background: getBackgroundColor(variant),
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  borderRadius: getBorderRadius(borderStyle),
  color: "white",
  margin: "0",
  border: getBorder(variant),
  padding: getPadding(variant),
  cursor: "pointer",
  "&:hover": {
    background: "#2c0d00",
  },
  "& :active": {
    color: " #993108",
  },
  "& :disabled": {
    color: "CAC6C4",
  },
}))
