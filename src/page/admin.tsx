import { Button, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListLandMark from "../component/ListLandMark";
import VirtualizedList from "../component/VirtualizedList";
import { LandMarkModel } from "../model/LandMarkModel";
import { UserModel } from "../model/UserModel";
import { decodeData, getLandmarksAll, getUserAll } from "../service/Service";
const AdminPahe = () => {
  const encodedUserData = localStorage.getItem("user");
  const userData = encodedUserData ? decodeData(encodedUserData) : null;
  const navigate = useNavigate();
  const [userall, setuserall] = useState<UserModel[]>([]);
  const [landmarkall, setlandmarkall] = useState<LandMarkModel[]>([]);
  const Logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const userall = getUserAll();
    const landmarkall = getLandmarksAll();
    if (userall) {
      setuserall(userall);
    }
    if (landmarkall) {
      setlandmarkall(landmarkall);
    }
  }, []);

  // ตรวจสอบว่ามีข้อมูลผู้ใช้หรือไม่
  if (!userData) {
    return (
      <>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <p>ไม่พบข้อมูลผู้ใช้</p>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Container>
      </>
    );
  }

  const findLandmarksForUser = (userCountry: string) => {
    const landmark = landmarkall.find((lm) => lm.country === userCountry);
    return landmark ? landmark.landmark : [];
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  // หากมีข้อมูลผู้ใช้, แสดงข้อมูล
  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={Logout}
        sx={{
          mt: 2,
          position: "absolute",
          top: 0,
          right: 50,
        }}
      >
        Logout
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          {...stringAvatar(userData.name)}
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontFamily: "Sarabun", m: 0 }}>
            {userData.username}
          </Typography>
          <Typography sx={{ fontFamily: "Sarabun", color: "text.secondary" }}>
            {userData.typeuser}
          </Typography>
        </Box>
      </Box>
      <Container sx={{ mt: 3 }}>
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "Sarabun", mb: 3 }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", height: "50vh", width: "100%", gap: 2 }}>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              ".MuiListItemButton-root": { justifyContent: "flex-start" },
            }}
          >
            <Typography variant="h5">LIST USERS</Typography>
            <hr />
            <VirtualizedList
              userall={userall}
              findLandmarksForUser={(country: string) =>
                findLandmarksForUser(country) as unknown as LandMarkModel[]
              }
            />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              ".MuiListItemButton-root": { justifyContent: "flex-start" },
            }}
          >
            <Typography variant="h5">LIST LANDMARKS</Typography>
            <hr />
            <ListLandMark />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AdminPahe;
