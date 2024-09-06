import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSettings } from "services/settings/useSettings";
import { useDebounce } from "hooks/useDebounce";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { categoryStore } from "store/categoryStore";
import { settingsStore } from "store/settingsStore";

export const useSettingIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, setQuery } = useSettings();
  const [direction] = settingsStore((state) => [state.direction]);
  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const columns = useMemo(() => {
    return [t("settings.name"), t("settings.value"), t("operations")];
  }, [t]);
  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  const handleSearch = useDebounce((e) => {
    setQuery(e.target.value);
  }, 1000);
  const [settingName, setSettingName] = useState("");
  const rows = useMemo(() => {
    return data?.data?.length > 0 ? (
      data?.data?.map((service, index) => (
        <TableRow
          sx={{ height: "65px" }}
          key={index}
          hover={true}
          onClick={() => setSettingName(service.name)}
        >
          <TableCell sx={{ minWidth: { xs: 50, lg: 200 } }}>
            <Typography
              sx={{
                fontSize: { xs: "10px", lg: "100%" },
              }}
            >
              {service.name ?? "name"}
            </Typography>
          </TableCell>
          <TableCell
            sx={{
              minWidth: { xs: 50, lg: 200 },
            }}
          >
            <Box
              dangerouslySetInnerHTML={{
                __html: service.value.substring(0, 100) + "...",
              }}
            />
          </TableCell>

          <TableCell
            align="center"
            sx={{
              minWidth: { xs: 50, lg: 200 },
            }}
          >
            <IconButton
              onClick={() => handleEdit(service?.id)}
              sx={{ width: "40px", height: "40px" }}
            >
              <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                <ModeTwoToneIcon sx={{ color: "text.main" }} />
              </Tooltip>
            </IconButton>
          </TableCell>
        </TableRow>
      ))
    ) : (
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
  }, [data, direction, handleEdit, t]);
  return {
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
  };
};
