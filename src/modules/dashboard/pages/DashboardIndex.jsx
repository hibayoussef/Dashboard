import FlagIcon from "@mui/icons-material/Flag";
import MuseumIcon from "@mui/icons-material/Museum";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WebIcon from "@mui/icons-material/Web";
import { Box, Typography } from "@mui/material";
import Loader from "components/shared/Loader";
import SpecializationExhibitors from "components/shared/chart/SpecializationExhibitors";
import StatisticChartVisitorsDevices from "components/shared/chart/StatisticChartVisitorsDevices";
import StatisticSingle from "components/shared/chart/StatisticSingle";
import CountriesVisitorIndex from "modules/countries_visits/pages/CountriesVisitorIndex";
import { useStatistic } from "services/statistic/useStatistic";
const DashboardIndex = () => {
  const { data, isLoading } = useStatistic();
  const objectStatistic = [
    {
      title: "Exhibitors count",
      count: data?.exhibitors?.exhibitors_count,
      last_update: data?.exhibitors?.last_updated,
      icon: <MuseumIcon />,
    },
    {
      title: "Visitors count",
      count: data?.visitors?.visitors_count,
      last_update: data?.visitors?.last_updated,
      icon: <PeopleAltIcon />,
    },
    {
      title: "Visitors countries",
      count: data?.visitors_countries?.countries_count,
      last_update: data?.visitors_countries?.last_updated,
      icon: <FlagIcon />,
    },
    {
      title: "Webinars",
      count: data?.webinars?.webinars_count,
      last_update: data?.webinars?.last_updated,
      icon: <WebIcon />,
    },
  ];
  return (
    <>
      <Box
        className="chart-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h2" color="text.main">
          Dashboard
        </Typography>
        {isLoading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              // flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              {objectStatistic?.map((item) => (
                <StatisticSingle
                  title={item.title}
                  count={item.count}
                  last_update={item.last_update}
                  icon={item.icon}
                />
              ))}
            </Box>
            {/* <StatisticChartExhibitorsVisits data={data} /> */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                width: "100%",
              }}
            >
              <SpecializationExhibitors data={data} />
              <StatisticChartVisitorsDevices data={data} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column" },
                gap: 5,
                mt: 3,
              }}
            >
              <CountriesVisitorIndex />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DashboardIndex;
