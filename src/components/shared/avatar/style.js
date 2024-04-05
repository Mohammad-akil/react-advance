export const styleSheet = (theme, props) => ({
  containedBlack: {
    backgroundColor: "black !important",
    color: "white !important",
    transition: "0.5s all ease-in-out",
    "&:hover": {
      backgroundColor: "white !important",
      color: "black !important",
    },
  },

  outlinedBlack: {
    backgroundColor: "white !important",
    borderColor: "black !important",
    color: "black !important",
    transition: "0.5s all ease-in-out",
    "&:hover": {
      backgroundColor: "black !important",
      borderColor: "black",
      color: "white !important",
    },
  },

  textBlack: {
    backgroundColor: "transparent !important",
    borderColor: "black !important",
    color: "black !important",
    transition: "0.5s all ease-in-out",
    "&:hover": {
      backgroundColor: "black !important",
      borderColor: "white",
      color: "white !important",
    },
  },
});
