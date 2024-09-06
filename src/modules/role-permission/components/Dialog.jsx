import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "components/shared/Loader";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteRole } from "services/role-permission/useDeleteRole";
const DeleteDialog = ({ id, page, count }) => {
  const { t } = useTranslation("index");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const deleteRole = useDeleteRole({ page, count });
  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteRole = () => {
    setLoading(true);
    deleteRole.mutate(id, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <React.Fragment>
      <Tooltip title={t("Delete")}>
        <DeleteTwoToneIcon
          sx={{ color: "error.main" }}
          onClick={handleClickOpen}
        />
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-elevation": {
              width: "100vw",
            },
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ color: "primary.main" }}
        >
          {t("delete item")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="responsive-dialog-title"
            sx={{ color: "primary.main" }}
          >
            {t("are you sure you want to delete it ?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("disagree")}</Button>
          {loading && <Loader />}

          <Button autoFocus variant="contained" onClick={DeleteRole}>
            {t("agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
