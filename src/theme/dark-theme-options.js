//
// Colors

const neutral = {
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};

const divider = "#2D3748";
const colors = {
  background: {
    main: "#121212",
    paper: "#1E1E1E",
  },
  extrenal: {
    main: "#212b36",
  },
  origin: {
    // main: "#85D9D1",
    main: "#2D3B6D",
    hover: "#B3BEE2",
    sidebar: " black",
  },
  edit: {
    main: "#fff",
  },
  text: {
    main: "#fff",
  },
  primary: {
    main: "rgb(32, 101, 209)",
  },
  inactive: {
    main: "rgba(145, 158, 171, 0.16)",
  },
  darkGray: {
    main: "rgb(145, 158, 171)",
  },
  lightGray: {
    main: "rgb(99, 115, 129)",
  },
  warning: {
    main: "rgb(255, 193, 7)",
  },
  error: {
    main: "rgb(255, 72, 66)",
  },
  success: {
    main: "rgb(84, 214, 44)",
  },
  card: {
    // main: "rgb(33, 43, 54)",
    // main: "#312D4B",
    main: "#0F0F0F",
  },
};

export const typography = {
  fontFamily: [].join(","),

  button: {
    fontSize: "14px",
  },

  h1: {
    fontSize: "64px",
    fontWeight: "bold",
  },
  h2: {
    fontSize: "48px",
    fontWeight: "bold",
  },
  h3: {
    fontSize: "40px",
    fontWeight: "bold",
  },
  h4: {
    fontSize: 26,
    fontWeight: "bold",
  },
  h5: {
    fontSize: 23,
    fontWeight: "bold",
  },
  h6: {
    fontSize: 20,
  },

  subtitle1: {
    fontSize: "0.955rem",
  },
  subtitle2: {
    fontSize: 12,
  },

  body1: {
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  body2: {
    fontSize: "14px",
  },
  caption: {
    fontSize: "12px",
  },
  inputTitle: {
    fontSize: "0.875rem",
    fontWeight: 500,
    // color: "#078172",
    color: "#0195FF",
  },
};

export const darkThemeOptions = {
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              transition: "250ms",
            },
            color: "#bdc8f0",
            backgroundColor: "inherit",
            "&.Mui-selected ": {
              color: "#ffff",
              backgroundColor: "#2196F3",
            },
          },
        },
      },
    },
    // MuiTab:{
    //   styleOverrides:{
    //     root:{
    //       "& .MuiTabs-indicator":{
    //         color:"red",
    //         backgroundColor:
    //       }
    //     }
    //   }
    // },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiAutocomplete-option": {
            color: "red",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: "rgba(145, 158, 171, 0.08)",
            transform: "scale(1.1)",
            transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "&.MuiTableHead-root ": {
            backgroundColor: colors.inactive.main,
          },
          ".MuiTableCell-root.MuiTableCell-head": {
            color: colors.text.main,
            textTransform: "capitalize",
          },
          ".MuiTableCell-root.MuiTableCell-head:first-of-type": {
            borderRadius: "8px 0 0 8px",
          },
          ".MuiTableCell-root.MuiTableCell-head:last-of-type": {
            borderRadius: "0 8px 8px 0",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root.MuiTableCell-body": {
            // background: colors.background.main,
            color: colors.text.main,
            ...typography.body2,
            borderBottom: "none",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: {
            variant: "error",
          },
          style: {
            backgroundColor: "#F44336",
            color: "#d7dcec",
            "&:hover": {
              backgroundColor: "#C62828",
            },
          },
        },
        {
          props: {
            variant: "primary",
          },
          style: {
            backgroundColor: colors.primary.main,
            boxShadow: "rgb(32 101 209 / 24%) 0px 8px 16px 0px",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "rgb(16, 57, 150)",
              boxShadow: "none",
            },
          },
        },
        {
          props: {
            variant: "success",
          },
          style: {
            backgroundColor: "#F44336",
            color: "#d7dcec",
            "&:hover": {
              backgroundColor: "#C62828",
            },
          },
        },
      ],
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: "#FFFFFF",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(189, 200, 240,0.2)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "center",
        },
      },
    },

    // MuiFormHelperText: {
    //   styleOverrides: {
    //     root: {
    //       "&.MuiFormHelperText-root": {
    //         color: "#8492c4",
    //         marginLeft: "0",
    //       },
    //       "&.MuiFormHelperText-root.Mui-error": {
    //         color: "#C62828",
    //       },
    //     },
    //   },
    // },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 1,
            color: colors.text.secondary,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider,
        },
      },
    },

    // MuiMenu: {
    //   styleOverrides: {
    //     paper: {
    //       borderColor: divider,
    //       borderStyle: "solid",
    //       borderWidth: 1,
    //     },
    //   },
    // },
    // MuiPopover: {
    //   styleOverrides: {
    //     paper: {
    //       borderColor: divider,
    //       borderStyle: "solid",
    //       borderWidth: 1,
    //     },
    //   },
    // },
    // MuiSwitch: {
    //   styleOverrides: {
    //     switchBase: {
    //       color: neutral[700],
    //     },
    //     track: {
    //       backgroundColor: neutral[500],
    //       opacity: 1,
    //     },
    //   },
    // },
    // MuiTableCell: {
    //   styleOverrides: {
    //     root: {
    //       textTransform: "capitalize",
    //       borderBottom: `1px solid ${divider}`,
    //     },
    //   },
    // },
    // MuiTableHead: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "inherit",
    //       ".MuiTableCell-root": {
    //         borderBottom: `1px solid ${divider}`,
    //         color: "#d7dcec",
    //         textTransform: "capitalize",
    //       },
    //     },
    //   },
    // },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(124, 77, 255, 0.082)",
          },
        },
      },
    },
    // MuiPagination: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiPaginationItem-root": {
    //         "&:hover": {
    //           backgroundColor: "rgba(255, 255, 255, 0.08)",
    //           transition: "250ms",
    //         },
    //         color: "#bdc8f0",
    //         backgroundColor: "inherit",
    //         "&.Mui-selected ": {
    //           color: "#ffff",
    //           backgroundColor: "#2196F3",
    //         },
    //       },
    //     },
    //   },
    // },
    MuiDialog: {
      styleOverrides: {
        root: {
          ".MuiDialog-container .MuiPaper-root": {
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: colors.background.main,
            borderRadius: 8,
            width: "35%", // this one will be deleted in the end
            zIndex: "1200",
          },
        },
      },
    },
  },

  palette: {
    mode: "dark",
    ...colors,
  },
  typography: {
    ...typography,
  },
};
