import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDebounce } from "hooks/useDebounce";
import { usePermissions } from "hooks/usePermissions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRole } from "services/role-permission/useRole";
import { categoryStore } from "store/categoryStore";
import { settingsStore } from "store/settingsStore";
import DeleteDialog from "../components/Dialog";
export const useRoleIndex = () => {
  const { t } = useTranslation("index");
  const { permissions } = usePermissions();
  const navigate = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);
  const { data, page, setPage, isLoading, count, setQuery } = useRole();
  const [direction] = settingsStore((state) => [state.direction]);
  const handleSearch = useDebounce((e) => {
    setQuery(e.target.value);
    setPage(1);
  }, 1000);
  const [editedID, setEditedID, editPass] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const columns = useMemo(() => {
    return [
      t("name"),
      t("permission count"),
      t("permissions"),
      t("operations"),
    ];
  }, [t]);

  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  const handleCreate = () => {
    navigate("create");
  };
  const rows = useMemo(() => {
    return data?.data?.data?.length > 0 ? (
      data?.data?.data?.map((permission, index) => (
        <TableRow sx={{ height: "65px" }} key={index} hover={true}>
          <TableCell sx={{ minWidth: { xs: 50, lg: 200 } }}>
            <Typography>{permission.name ?? "N/A"}</Typography>
          </TableCell>
          <TableCell sx={{ minWidth: { xs: 50, lg: 200 } }}>
            <Typography>{permission.permission_count ?? "N/A"}</Typography>
          </TableCell>
          <TableCell
            sx={{
              minWidth: { xs: 50, lg: 200 },
            }}
          >
            <Typography>
              {permission.permissions?.length > 0
                ? permission.permissions.map((item) => item.name).join(", ")
                : "N/A"}
            </Typography>
          </TableCell>

          <TableCell
            align="center"
            sx={{
              minWidth: { xs: 50, lg: 200 },
            }}
          >
            {permissions?.Role?.Delete === false &&
            permissions?.Role?.Update === false ? (
              "Don't have permission for oprations"
            ) : permissions?.Role?.Update === true ? (
              <IconButton
                onClick={() => handleEdit(permission?.id)}
                sx={{ width: "40px", height: "40px", mr: 1 }}
              >
                <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                  <Box>
                    <ModeTwoToneIcon sx={{ color: "text.main" }} />
                  </Box>
                </Tooltip>
              </IconButton>
            ) : null}
            {permissions?.Role?.Delete === true ? (
              <IconButton sx={{ width: "40px", height: "40px" }}>
                <Tooltip title={t("Delete")}>
                  <Box>
                    <DeleteDialog
                      id={permission?.id}
                      count={count}
                      page={page}
                    />
                  </Box>
                </Tooltip>
              </IconButton>
            ) : null}
          </TableCell>
        </TableRow>
      ))
    ) : isLoading ? null : (
      <Box
        sx={{
          display: "flex",
          alignItems: "cenet",
          justifyContent: "center",
          width: "100%",
          my: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "GrayText" }}>
          {t("no data to shown")}
        </Typography>
      </Box>
    );
  }, [
    t,
    page,
    data,
    count,
    direction,
    handleEdit,
    isLoading,
    permissions?.Role?.Delete,
    permissions?.Role?.Update,
  ]);
  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      setDataLoaded(true);
    }
  }, [data]);
  return {
    t,
    data,
    page,
    rows,
    setPage,
    columns,
    editedID,
    isLoading,
    count,
    editPass,
    navigate,
    handleCreate,
    handleSearch,
    dataLoaded,
    permissions,
  };
};
