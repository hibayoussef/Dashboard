import { Box, CardContent, Typography, useTheme } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const SpecializationExhibitors = ({ data }) => {
  const [dataArray, setDataArray] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    if (data && data?.specialization_exhibitors) {
      const newDataArray = data.specialization_exhibitors.map((item) => ({
        specialization_name: item.specialization_name,
        exhibitor_count: item.exhibitor_count,
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
    labels: dataArray.map((item) =>
      item.specialization_name.replace(/_/g, " ")
    ),
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

  // const series = [
  //   {
  //     name: "Specialization name",
  //     data: dataArray.map((item) => item.specialization_name),
  //   },
  //   {
  //     name: "Exhibitor count",
  //     data: dataArray.map((item) => item.exhibitor_count),
  //   },
  // ];
  const series = dataArray.map((item) => item.exhibitor_count);

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
          {"Specialization exhibitors"}
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
              mb: 1,
            }}
          >
            <Typography variant="p" sx={{ color: "text.main" }}>
              {"Total specialization exhibitors"} :{" "}
              {data?.specialization_exhibitors?.reduce(
                (acc, item) => acc + item.exhibitor_count,
                0
              )}
            </Typography>
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 2,
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

export default SpecializationExhibitors;
