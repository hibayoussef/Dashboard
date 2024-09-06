import SwitchComponent from "components/shared/SwitchComponent";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStatus } from "../hooks/useStatus";
import Loader from "components/shared/Loader";

const StatusAction = ({ id, children, action }) => {
  const { t } = useTranslation("index");
  const statusItem = useStatus({ id: id, action: action });
  const [loading, setLoading] = useState(false);

  const handleToggleChangeStatus = () => {
    setLoading(true);
    statusItem.mutate(id, {
      onSuccess: () => {
        setLoading(false);
      },

      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      {loading && <Loader />}

      {/* <Button onClick={handleClickOpen} sx={{ color: color }}> */}
      {/* </Button> */}
      <SwitchComponent
        notActive={t("unactive")}
        active={t("active")}
        checked={action !== true ? true : false}
        onChange={handleToggleChangeStatus}
      >
        {children}
      </SwitchComponent>
    </>
  );
};

export default StatusAction;
