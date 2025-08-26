import { alpha, SxProps, Theme } from "@mui/material";

export const menuWrapperSx: SxProps<Theme> = (theme)=>({
  pt: {xs:2, md:0},
  backgroundColor: {md:theme.palette.primary.light},
  height: {xs:'auto',md:"40px"},
});

export const menuContentSx: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  alignItems: {xs:"start",md:'center'},
  height: "100%",
  flexDirection: {xs:"column",md:'row'},
};

export const selectSx: SxProps<Theme> = {
  minWidth: 180,
  color: "black",
  fontWeight: 300,
  fontSize: "1rem",
  "&:before, &:after": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: "black",
  },
  "& .MuiSelect-select": {
    padding: 0,
    display: "flex",
    alignItems: "center",
    height: "40px",
  },
};

export const buttonSx: SxProps<Theme> = (theme)=>({
  color: "black",
  textTransform: "none",
  fontWeight: 300,
  fontSize: "1rem",
  width: "max-content",
  height: "40px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black,0.1),
  },
});

//BlueMenu.styles.ts
"use client";

import {
  Box,
  Button,
  Container,
}

//BlueMenu.tsx

export { default } from "./BlueMenu";
export * from "./BlueMenu.styles"; 

//index.ts


export const menuWrapperSx: SxProps<Theme> = (theme)=>({
  pt: {xs:2, md:0},
  backgroundColor: {md:theme.palette.primary.light},
  height: {xs:'auto',md:"40px"},

});