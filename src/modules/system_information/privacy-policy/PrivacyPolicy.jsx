import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Loader from "components/shared/Loader";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSystemInformation } from "services/system_information/useSystemInformation";
import { categoryStore } from "store/categoryStore";
import SystemInformationUpdate from "../components/SystemInformationUpdate";

const PrivacyPolicy = ({ permissions }) => {
  const { data, isLoading } = useSystemInformation();
  const { t } = useTranslation("index");
  const privacyItem = data?.data?.find((item) => item.key === "privacy");
  const [infoValue, setInfoValue] = useState("");
  const [title, setTitle] = useState("");
  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  return (
    <>
      {isLoading && <Loader />}
      {editedID && (
        <SystemInformationUpdate
          infoValue={infoValue}
          title={title}
          id={editedID}
        />
      )}
      {privacyItem ? (
        <Box sx={{ color: "text.main" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              mb: 2,
            }}
          >
            {permissions?.System_Information?.Update === true ? (
              <IconButton
                onClick={() => {
                  handleEdit(privacyItem?.id);
                  setInfoValue(privacyItem.description);
                  setTitle(privacyItem.title);
                }}
                sx={{ width: "40px", height: "40px" }}
              >
                <Tooltip title={t("Edit")}>
                  <Box>
                    <ModeTwoToneIcon sx={{ color: "text.main" }} />
                  </Box>
                </Tooltip>
              </IconButton>
            ) : null}
            <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
              {privacyItem.title}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: privacyItem.description,
            }}
          />
        </Box>
      ) : (
        !isLoading && (
          <Typography sx={{ color: "GrayText" }}>No Privacy policy</Typography>
        )
      )}
    </>
  );
};

export default PrivacyPolicy;
