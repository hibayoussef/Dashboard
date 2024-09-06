import { Box, CardContent, Typography, useTheme } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const StatisticChartVisitorsCountriesChart = ({ data }) => {
  const [dataArray, setDataArray] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    if (data && data?.visitors_countries_chart) {
      const newDataArray = data.visitors_countries_chart.map((item) => ({
        country: item.country,
        user_count: item.user_count,
      }));
      setDataArray(newDataArray);
    }
  }, [data]);

  const colors = ["#2D3B6D", "#5E72B9"]; // Define an array of colors

  const options = {
    chart: {
      id: "apexchart-example",
      type: "bar",
      stacked: false,
      toolbar: { show: false },
    },
    xaxis: {
      categories: dataArray.map((item) => item.country),
      labels: {
        style: {
          colors: theme.palette.text.main,
          fontSize: "10px",
        },
        rotate: -10,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.main,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: "light",
        shadeIntensity: 1,
        color: theme.palette.origin.main,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
        states: {
          hover: {
            color: "#ffff",
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ["red"],
      },
    },
    stroke: {
      width: 2,
      colors: [theme.palette.origin.main],
    },
    fill: {
      colors: colors,
      opacity: 0.6,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    legend: {
      show: false, // Disable the legend
    },
  };

  const series = [
    {
      name: "Country",
      data: dataArray.map((item) => item.country),
    },
    {
      name: "User count",
      data: dataArray.map((item) => item.user_count),
    },
  ];

  return (
    <BoxStyled
      sx={{
        width: { xs: "250px", lg: "100%" },

        color: "gray",
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
          {"Visitors countries"}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "fit-content",
          "& .apexcharts-series[rel='1']": {
            transform: "translateY(-6px)",
          },
          "& .apexcharts-series[rel='2']": {
            transform: "translateY(-9px)",
          },
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
              {"Total visitors countries"} :{" "}
              {data?.visitors_countries_chart?.reduce(
                (acc, item) => acc + item.user_count,
                0
              )}
            </Typography>
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Chart
              type="bar"
              height={"600px"}
              width={"100%"}
              series={series}
              options={options}
            />
          </Box>
        </CardContent>
      </Box>
    </BoxStyled>
  );
};

export default StatisticChartVisitorsCountriesChart;
