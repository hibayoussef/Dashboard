import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useDebounce } from "hooks/useDebounce";
import { usePermissions } from "hooks/usePermissions";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCountriesVisitor } from "services/visitors_countries/useCountriesVisitor";
import * as yup from "yup";
export const useCountriesVisitorIndex = () => {
  const { t } = useTranslation("index");
  const { permissions } = usePermissions();
  const [dataLoaded, setDataLoaded] = useState(false);
  let createValidation = yup.object().shape({
    exhibition_id: yup.string(),
  });

  const formOptions = { resolver: yupResolver(createValidation) };
  const { register, setValue, watch } = useForm(formOptions);
  const exhibition_id = watch("exhibition_id");

  const { data, isLoading, page, setPage, setQuery } = useCountriesVisitor({
    exhibition_id,
  });
  const handleSearch = useDebounce((e) => {
    setQuery(e.target.value);
    setPage(1);
  }, 1000);

  const columns = useMemo(() => {
    return [t("country"), t("user count")];
  }, [t]);
  console.log("data?", data?.data?.data);

  const rows = useMemo(() => {
    return data?.data?.data?.length > 0 ? (
      data?.data?.data?.map((exhibitor, index) => (
        <TableRow sx={{ height: "65px" }} key={index} hover={true}>
          <TableCell sx={{ minWidth: { xs: 50, lg: 100 } }}>
            <Typography>{exhibitor?.country ?? "N/A"}</Typography>
          </TableCell>
          <TableCell sx={{ minWidth: { xs: 50, lg: 100 } }}>
            <Typography>{exhibitor?.user_count ?? "N/A"}</Typography>
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
  }, [t, data, isLoading]);
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
    isLoading,
    handleSearch,
    dataLoaded,
    permissions,
    register,
    exhibition_id,
    setValue,
  };
};
