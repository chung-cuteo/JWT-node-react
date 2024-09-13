import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import httpAxios from "../utils/httpAxios";
import { useNavigate } from "react-router-dom";
import { logOutApi } from "~/apis";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await httpAxios.get(`/dashboard/access`);
      setUser(res.data);
    };
    fetchData();
  }, []);

  function handleLogout() {
    logOutApi().then(() => {
      location.href = "/login";
    });
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "1120px",
        marginTop: "1em",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 1em",
      }}
    >
      <Alert
        severity="info"
        sx={{ ".MuiAlert-message": { overflow: "hidden" } }}
      >
        <Typography
          variant="span"
          sx={{ fontWeight: "bold", "&:hover": { color: "#fdba26" } }}
        >
          {user?.email}
        </Typography>
      </Alert>

      <Button size="large" onClick={handleLogout}>
        Logout
      </Button>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

export default Dashboard;
