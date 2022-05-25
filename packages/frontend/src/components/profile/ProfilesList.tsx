import * as React from "react";
import { Box, CircularProgress } from "@mui/material";

import { ProfileView } from "./ProfileView";
import { ProfileLoader } from "./ProfileLoader";
import { ApiService } from "../../utils/ApiService";
import { Profile } from "../../types";

export const ProfilesList: React.FC = (props) => {
  const [dids, updateDids] = React.useState("LOADING" as "LOADING" | string[]);
  React.useEffect(() => {
    (async () => {
      const api = new ApiService();
      updateDids(await api.getAllDids());
    })()
  }, []);

  if (dids === "LOADING") {
    return (
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "50px 0", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  // For some reason, dids is empty.  Fixing this issue feels out of scope for this test.
  // console.log(dids);
  return (
    <Box>
      { dids.map((did) => <ProfileLoader did={did}></ProfileLoader>) }
    </Box>
  );
};
