import { Box, Typography } from "@mui/material";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import { useSettingIndex } from "../hooks/useSettingIndex";
import SettingUpdate from "../components/SettingUpdate";

const SettingIndex = () => {
  const {
    t,
    data,
    page,
    rows,
    setPage,
    columns,
    editedID,
    isLoading,
    handleSearch,
    settingName,
  } = useSettingIndex();

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <SettingUpdate id={editedID} settingName={settingName} />}

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
            {t("settings.settings")}
          </Typography>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Box
            sx={{
              mb: "15px",
            }}
          >
            <TextFieldStyled
              sx={{ width: "100%" }}
              placeholder={t("search")}
              onChange={handleSearch}
            />
          </Box>
          <Table
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            count={
              Math.ceil(
                data?.data?.paginate?.total / data?.data?.paginate?.per_page
              ) || 1
            }
          />
          {/* <Box
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Typography sx={{ color: "text.main" }}>{t("total")}</Typography>
            <Typography sx={{ color: "text.main" }}>
              {data?.data?.paginate?.total}
            </Typography>
          </Box> */}
        </BoxStyled>
      </Box>
    </>
  );
};

export default SettingIndex;
