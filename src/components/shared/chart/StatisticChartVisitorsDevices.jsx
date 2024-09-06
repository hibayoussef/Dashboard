// import { Box, CardContent, Typography, useTheme } from "@mui/material";
// import { BoxStyled } from "components/styled/BoxStyled";
// import { useEffect, useState } from "react";
// import Chart from "react-apexcharts";

// const StatisticChartVisitorsDevices = ({ data }) => {
//   const [dataArray, setDataArray] = useState([]);
//   const theme = useTheme();
//   useEffect(() => {
//     if (data && data?.visitors_devices) {
//       const newDataArray = data.visitors_devices.map((item) => ({
//         device_type: item.device_type,
//         user_count: item.user_count,
//       }));
//       setDataArray(newDataArray);
//     }
//   }, [data]);

//   const colors = ["#2D3B6D", "#5E72B9"];

//   const options = {
//     chart: {
//       id: "apexchart-example",
//       type: "bar",
//       stacked: false,
//       toolbar: { show: false },
//     },
//     xaxis: {
//       categories: dataArray.map((item) => item.device_type),
//       labels: {
//         style: {
//           colors: theme.palette.text.main,
//           fontSize: "10px",
//         },
//         rotate: -10,
//       },
//     },
//     yaxis: {
//       labels: {
//         style: {
//           colors: theme.palette.text.main,
//         },
//       },
//     },
//     theme: {
//       monochrome: {
//         enabled: true,
//         shadeTo: "light",
//         shadeIntensity: 1,
//         color: theme.palette.origin.main,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         dataLabels: {
//           position: "top",
//         },
//         states: {
//           hover: {
//             color: "#ffff",
//           },
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//       style: {
//         colors: ["red"],
//       },
//     },
//     stroke: {
//       width: 2,
//       colors: [theme.palette.origin.main],
//     },
//     fill: {
//       colors: colors,
//       opacity: 0.6,
//     },
//     tooltip: {
//       y: {
//         formatter: function (val) {
//           return val;
//         },
//       },
//     },
//     legend: {
//       show: false,
//     },
//   };

//   const series = [
//     {
//       name: "Device type",
//       data: dataArray.map((item) => item.device_type),
//     },
//     {
//       name: "User count",
//       data: dataArray.map((item) => item.user_count),
//     },
//   ];

//   return (
//     <BoxStyled
//       sx={{
//         width: { xs: "250px", lg: "100%" },

//         color: "gray",
//         ml: { xs: "0px" },
//         p: 2,
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Typography sx={{ color: "text.main" }} variant="h5">
//           {"Visitors devices"}
//         </Typography>
//       </Box>

//       <Box
//         sx={{
//           width: "100%",
//           height: "fit-content",
//           "& .apexcharts-series[rel='1']": {
//             transform: "translateY(-6px)",
//           },
//           "& .apexcharts-series[rel='2']": {
//             transform: "translateY(-9px)",
//           },
//         }}
//       >
//         <CardContent>
//           <Typography
//             sx={{
//               color: "text.main",
//               gap: "10px",
//               display: "flex",
//             }}
//           >
//             <Typography variant="p" sx={{ color: "text.main" }}>
//               {"Total visitors devices"} :{" "}
//               {data?.visitors_devices?.reduce(
//                 (acc, item) => acc + item.user_count,
//                 0
//               )}
//             </Typography>
//           </Typography>

//           <Box sx={{ width: "100%" }}>
//             <Chart
//               type="bar"
//               height={"600px"}
//               width={"100%"}
//               series={series}
//               options={options}
//             />
//           </Box>
//         </CardContent>
//       </Box>
//     </BoxStyled>
//   );
// };

// export default StatisticChartVisitorsDevices;

import { Box, CardContent, Typography, useTheme } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const StatisticChartVisitorsDevices = ({ data }) => {
  const [dataArray, setDataArray] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (data && data?.visitors_devices) {
      const newDataArray = data.visitors_devices.map((item) => ({
        device_type: item.device_type,
        user_count: item.user_count,
      }));
      setDataArray(newDataArray);
    }
  }, [data]);

  const options = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    labels: dataArray.map((item) => item.device_type.replace(/_/g, " ")),
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: "light",
        shadeIntensity: 0.65,
        color: theme.palette.origin.main,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "16px",
        colors: ["white"],
      },
    },
    stroke: {
      width: 2,
      colors: [theme.palette.origin.main],
    },
    fill: {
      opacity: 0.8,

      type: "gradient",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = dataArray.map((item) => item.user_count);

  return (
    <BoxStyled
      sx={{
        width: { xs: "100%" },
        color: "white",
        ml: { xs: "0px" },
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "text.main" }} variant="h5">
          {"Visitors devices"}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "fit-content",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              color: "text.main",
              gap: "10px",
              display: "flex",
            }}
          >
            <Typography variant="p" sx={{ color: "text.main" }}>
              {"Total visitors devices"} :{" "}
              {data?.visitors_devices?.reduce(
                (acc, item) => acc + item.user_count,
                0
              )}
            </Typography>
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ReactApexChart
              type="donut"
              height={"300px"}
              width={"300px"}
              series={series}
              options={options}
            />
          </Box>
        </CardContent>
      </Box>
    </BoxStyled>
  );
};

export default StatisticChartVisitorsDevices;
