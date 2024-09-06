import { typography } from "./dark-theme-options";

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

const divider = "#E6E8F0";

const colors = {
  origin: {
    // main: "#85D9D1",
    main: "#2D3B6D",
    hover: "#B3BEE2",
  },
  background: {
    main: "#F8F7FA",
    paper: "white",
  },
  edit: {
    main: "#212b36",
  },
  text: {
    main: "rgb(33, 43, 54)",
  },
  primary: {
    main: "rgb(32, 101, 209)",
  },
  inactive: {
    main: "rgb(244, 246, 248)",
  },
  darkGray: {
    main: "rgb(99, 115, 129)",
  },
  lightGray: {
    main: "rgb(145, 158, 171)",
  },
  warning: {
    main: "rgb(183, 129, 3)",
  },
  error: {
    main: "rgb(183, 33, 54)",
  },
  success: {
    main: "rgb(34, 154, 22)",
  },
  card: {
    main: "rgb(255,255,255)",
  },
};

export const lightThemeOptions = {
  components: {
    MuiButton: {
      variants: [
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
            variant: "error",
          },
          style: {
            backgroundColor: "#F44336",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#C62828",
            },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: "rgba(99, 115, 129, 0.08)",
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
            color: colors.darkGray.main,
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
          ".MuiTableCell-root.MuiTableCell-body": {
            color: colors.text.main,
            borderBottom: "none",
          },
        },
      },
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
          backgroundColor: "rgba(238, 238, 238,0.2)",
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.MuiFormHelperText-root": {
            color: "#9e9e9e",
            marginLeft: "0",
          },
          "&.MuiFormHelperText-root.Mui-error": {
            color: "#C62828",
          },
        },
      },
    },
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
          // borderColor: divider,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[500],
        },
        track: {
          backgroundColor: neutral[400],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          textAlign: "center",
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    //for table heade
    // MuiTableHead: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "inherit",

    //       ".MuiTableCell-root": {
    //         borderBottom: `1px solid ${divider}`,
    //         color: "#212121",
    //         textTransform: "capitalize",
    //       },
    //     },
    //   },
    // },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(237, 231, 246)",
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
    //         color: "#616161",
    //         backgroundColor: "inherit",
    //         "&.Mui-selected ": {
    //           color: "#ffffff",
    //           backgroundColor: "#2196F3",
    //         },
    //       },
    //     },
    //   },
    // },
    // MuiDialog: {
    //   styleOverrides: {
    //     root: {
    //       ".MuiDialog-container .MuiPaper-root": {
    //         boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    //         borderRadius: 8,
    //         width: "35%", // this one will be deleted in the end
    //       },
    //     },
    //   },
    // },
    MuiDialog: {
      styleOverrides: {
        root: {
          ".MuiDialog-container .MuiPaper-root": {
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
    mode: "light",
    ...colors,
  },
  typography: {
    ...typography,
  },
};
