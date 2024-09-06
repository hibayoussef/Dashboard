import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { usePermissions } from "hooks/usePermissions";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useContactInfo } from "services/contact-information/useContactInfo";
import { categoryStore } from "store/categoryStore";
import { settingsStore } from "store/settingsStore";
import StatusAction from "../components/StatusAction";
export const useContactIndex = () => {
  const { t } = useTranslation("index");
  const { permissions } = usePermissions();
  const { data, isLoading } = useContactInfo();
  const [direction] = settingsStore((state) => [state.direction]);
  const [value, setvalue] = useState("");
  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const columns = useMemo(() => {
    return [
      t("name"),
      t("value"),
      t("status"),
      t("change status"),
      t("operations"),
    ];
  }, [t]);

  const handleEdit = useCallback(
    (id, value) => {
      setEditedID(id);
      setvalue(value);
    },
    [setEditedID]
  );
  const rows = useMemo(() => {
    return data?.data?.length > 0 ? (
      data?.data?.map((contact, index) => (
        <TableRow sx={{ height: "65px" }} key={index} hover={true}>
          <TableCell sx={{ minWidth: { xs: 50, lg: 100 } }}>
            <Typography>{contact.name ?? "N/A"}</Typography>
          </TableCell>
          <TableCell sx={{ minWidth: { xs: 50, lg: 100 } }}>
            <Typography>{contact.value ?? "N/A"}</Typography>
          </TableCell>
          <TableCell sx={{ minWidth: { xs: 50, lg: 100 } }}>
            <Typography>
              {contact.status === true ? "Active" : "Un-Active" ?? "N/A"}
            </Typography>
          </TableCell>
          <TableCell sx={{ minWidth: 200 }} align="center">
            {permissions?.Contact_Information?.Change_Status === true ? (
              <StatusAction
                id={contact?.id}
                action={contact?.status === true ? 0 : true}
              >
                {contact?.status === true ? t("unactive") : t("active")}
              </StatusAction>
            ) : (
              "Don't have permission to change status"
            )}
          </TableCell>
          {permissions.Contact_Information?.Update === false ? (
            "Don't have permissions for update"
          ) : (
            <TableCell
              align="center"
              sx={{
                minWidth: { xs: 50, lg: 200 },
              }}
            >
              {permissions.Contact_Information?.Update === true ? (
                <IconButton
                  onClick={() => {
                    handleEdit(contact?.id);
                    setvalue(contact.value);
                  }}
                  sx={{ width: "40px", height: "40px" }}
                >
                  <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                    <Box>
                      <ModeTwoToneIcon sx={{ color: "text.main" }} />
                    </Box>
                  </Tooltip>
                </IconButton>
              ) : null}
            </TableCell>
          )}
        </TableRow>
      ))
    ) : isLoading ? null : (
      <Box
        sx={{
          display: "flex",
          alignItems: "cenet",
          justifyContent: "center",
          width: "200%",
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
    data,
    isLoading,
    direction,
    handleEdit,
    permissions.Contact_Information?.Change_Status,
    permissions.Contact_Information?.Update,
  ]);
  return {
    t,
    data,
    rows,
    columns,
    editedID,
    isLoading,
    value,
  };
};
