import AddIcon from "@mui/icons-material/Add";
import { Box, Typography } from "@mui/material";
import { Table } from "components/shared";
import ButtonAction from "components/shared/button/ButtonAction";
import Loader from "components/shared/Loader";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import RoleUpdate from "../components/RoleUpdate";
import { useRoleIndex } from "../hooks/useRoleIndex";

const RoleIndex = () => {
  const {
    t,
    data,
    page,
    rows,
    setPage,
    columns,
    editedID,
    isLoading,
    handleCreate,
    dataLoaded,
    handleSearch,
    permissionList,
    permissions,
  } = useRoleIndex();

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <RoleUpdate id={editedID} permissionList={permissionList} />}

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
            {t("Roles")}
          </Typography>
          {permissions?.Role?.Create === true ? (
            <ButtonAction
              startIcon={<AddIcon />}
              onClick={handleCreate}
              name={t("Create role")}
            />
          ) : null}
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          {dataLoaded && (
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

export default RoleIndex;
