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
  // @NOTE: Example api usage:
  // console.log(await api.getProfileViaDid("did:3:kjzl6cwe1jw148uyox3goiyrwwe3aab8vatm3apxqisd351ww0dj6v5e3f61e8b"));

  // throw new Error(
  //   "@TODO: Please implement me using ApiService and ProfileView or ProfileLoader! This component should display all of the profiles one after the other.",
  // );

  if (dids === "LOADING") {
    return (
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "50px 0", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  // for some reason, dids is empty
  // console.log(dids);
  return (
    <Box>
      { dids.map((did) => <ProfileLoader did={did}></ProfileLoader>) }
    </Box>
  );
};
