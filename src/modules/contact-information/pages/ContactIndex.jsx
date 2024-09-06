import { Box, Typography } from "@mui/material";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { BoxStyled } from "components/styled/BoxStyled";
import ContactInfoUpdate from "../components/ContactInfoUpdate";
import { useContactIndex } from "../hooks/useContactIndex";

const ContactIndex = () => {
  const { t, data, rows, columns, editedID, isLoading, value } =
    useContactIndex();

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <ContactInfoUpdate id={editedID} value={value} />}

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
            {t("Contact informations")}
          </Typography>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Table
            columns={columns}
            rows={rows}
            // page={page}
            total={data?.data?.paginate?.total}
            // setPage={setPage}
            count={
              Math.ceil(
                data?.data?.pagination?.total / data?.data?.pagination?.per_page
              ) || 1
            }
          />
        </BoxStyled>
      </Box>
    </>
  );
};

export default ContactIndex;
