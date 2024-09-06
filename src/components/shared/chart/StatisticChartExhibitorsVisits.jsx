import { Box, CardContent, Typography, useTheme } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const StatisticChartExhibitorsVisits = ({ data }) => {
  const [dataArray, setDataArray] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    if (data && data?.exhibitors_visits) {
      const newDataArray = data.exhibitors_visits.map((item) => ({
        company_name: item.company_name,
        visits_count: item.visits_count,
        visitors_countries_count: item.visitors_countries_count,
        countries_visits: item.countries_visits.map((country) => ({
          country_name: country.user_country,
          visits_count: country.visits_count,
        })),
      }));
      setDataArray(newDataArray);
    }
  }, [data]);

  const colors = ["#2D3B6D", "#5E72B9", "#6496E0", "#FF33C7", "#33FFD3"];  

  const options = {
    chart: {
      id: "apexchart-example",
      type: "bar",
      stacked: false,
      toolbar: { show: false },
    },
    xaxis: {
      categories: dataArray.map((item) => item.company_name),
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
          fontSize: "14px",
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
      show: false,
    },
  };

  const series = [
    { name: "Visits Count", data: dataArray.map((item) => item.visits_count) },
    {
      name: "Visitors Countries Count",
      data: dataArray.map((item) => item.visitors_countries_count),
    },
    ...dataArray.flatMap((item) =>
      item.countries_visits.map((country) => ({
        name: `${item.company_name}: ${country.country_name}`,
        data: [country.visits_count],
      }))
    ),
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
          {"Exhibitors visits"}
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
              {"Total visits"} :{" "}
              {data?.exhibitors_visits?.reduce(
                (acc, item) => acc + item.visits_count,
                0
              )}
            </Typography>
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Chart
              type="bar"
              height={"1000px"}
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

export default StatisticChartExhibitorsVisits;
