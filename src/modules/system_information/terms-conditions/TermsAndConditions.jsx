// import { Box, Typography } from "@mui/material";
// import Loader from "components/shared/Loader";
// import React from "react";
// import { useSystemInformation } from "services/system_information/useSystemInformation";

// const TermsAndConditions = () => {
//   const { data, isLoading } = useSystemInformation();
//   const termsItem = data?.data?.find((item) => item.key === "terms");

//   return (
//     <>
//       {isLoading && <Loader />}
//       {termsItem ? (
//         <Box sx={{ color: "text.main" }}>
//           <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
//             {termsItem.title}
//           </Typography>
//           <Typography
//             variant="body2"
//             dangerouslySetInnerHTML={{
//               __html: termsItem.description,
//             }}
//           />
//         </Box>
//       ) : (
//         !isLoading && (
//           <Typography sx={{ color: "GrayText" }}>
//             No terms and conditions
//           </Typography>
//         )
//       )}
//     </>
//   );
// };

// export default TermsAndConditions;
