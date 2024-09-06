import { Box, Typography } from "@mui/material";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import { useCountriesVisitorIndex } from "../hooks/useCountriesVisitorIndex";

const CountriesVisitorIndex = () => {
  const {
    t,
    data,
    page,
    rows,
    setPage,
    columns,
    isLoading,
    handleSearch,
    dataLoaded
  } = useCountriesVisitorIndex();

  return (
    <>
      {isLoading && <Loader />}

      <Box
        sx={{
          width: { sl: "300px" },
          backgroundColor: { xs: "background.main" },
          ml: { xs: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "25px",
          }}
        >
          <Typography
            sx={{
              color: "text.main",
            }}
            variant="h5"
          >
            {t("Countries visitors")}
          </Typography>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          {dataLoaded && (
            <Box
              sx={{
                mb: "15px",
              }}
            >
              <TextFieldStyled
                sx={{ width: "100%", mt: 2 }}
                placeholder={t("search")}
                onChange={handleSearch}
              />
            </Box>
          )}
          <Table
            columns={columns}
            rows={rows}
            page={page}
            total={data?.data?.paginate?.total}
            setPage={setPage}
            count={
              Math.ceil(
                data?.data?.pagination?.total / data?.data?.pagination?.per_page
              ) || 1
            }
          />
          {data && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Typography sx={{ color: "text.main" }}>{t("total")}</Typography>
              <Typography sx={{ color: "text.main" }}>
                {data?.data?.pagination?.total ?? 0}
              </Typography>
            </Box>
          )}
        </BoxStyled>
      </Box>
    </>
  );
};

export default CountriesVisitorIndex;
