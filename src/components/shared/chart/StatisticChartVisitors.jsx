// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import { Box, IconButton, Tooltip, Typography } from "@mui/material";
// import { BoxStyled } from "components/styled/BoxStyled";
// const StatisticChartVisitors = ({ data }) => {
//   // const theme = useTheme();
//   // let options = {};
//   // if (data && typeof data.visitors !== "undefined") {
//   //   options = {
//   //     chart: {
//   //       height: 600,
//   //       id: "orders",
//   //     },
//   //     labels: ["visitors"],
//   //     series: [data.visitors?.visitors_count],
//   //     colors: [theme.palette.origin.main],
//   //     dataLabels: {
//   //       enabled: false,
//   //     },
//   //     plotOptions: {
//   //       pie: {
//   //         style: {
//   //           colors: theme.palette.text.main,
//   //         },

//   //         donut: {
//   //           style: {
//   //             colors: theme.palette.text.main,
//   //           },

//   //           labels: {
//   //             style: {
//   //               colors: theme.palette.text.main,
//   //             },
//   //             show: true,

//   //             total: {
//   //               show: true,
//   //               style: {
//   //                 colors: theme.palette.text.main,
//   //               },
//   //               color: theme.palette.text.main,
//   //               label: "Count: " + data.visitors?.visitors_count,
//   //               formatter: function () {
//   //                 return data.visitors?.last_updated;
//   //               },
//   //             },
//   //           },
//   //         },
//   //       },
//   //     },
//   //   };
//   // } else {
//   //   options = {
//   //     chart: {
//   //       id: "orders",
//   //     },
//   //     labels: [],
//   //     series: [],
//   //   };
//   // }

//   return (
//     <BoxStyled
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         ml: { xs: "0px" },
//         paddingInlineStart: 2,
//         paddingInlineEnd: 4,
//         pt: 3,
//         pb: 5,
//         color: "text.main",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <IconButton>
//           <Tooltip>
//             <PeopleAltIcon sx={{ color: "text.main" }} />
//           </Tooltip>
//         </IconButton>
//         <Typography sx={{ color: "text.main" }} variant="h5">
//           Visitors count
//         </Typography>
//       </Box>
//       <Typography>Count: {data.visitors?.visitors_count}</Typography>
//       <Typography>Last Updated: {data.visitors?.last_updated}</Typography>

//     </BoxStyled>
//   );
// };

// export default StatisticChartVisitors;
