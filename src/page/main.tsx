import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandMarkModel } from "../model/LandMarkModel";
import { decodeData, getLandmarksAll } from "../service/Service";

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

const MainPage = () => {
  const encodedUserData = localStorage.getItem("user");
  const userData = encodedUserData ? decodeData(encodedUserData) : null;
  const [landmarkall, setlandmarkall] = useState<LandMarkModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const landmarkall = getLandmarksAll();

    if (landmarkall) {
      setlandmarkall(landmarkall);
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!userData) {
    return (
      <>
        {/* <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            textAlign: "center",
          }}
        >
          <p style={{ fontFamily: "Sarabun" }}>ไม่พบข้อมูลผู้ใช้</p>

          <Button onClick={() => navigate("/login")}>Login</Button>
        </Container> */}
        <Container
          maxWidth="sm"
          sx={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              borderRadius: 2,
              p: 4,
              textAlign: "center",
            }}
          >
            {/* <AccountCircleIcon fontSize="large"  /> */}
            <AccountCircleIcon
              fontSize="large"
              sx={{ width: 100, height: 100 }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontFamily: "Sarabun" }}
            >
              ไม่พบข้อมูลผู้ใช้
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{ fontFamily: "Sarabun" }}
            >
              กรุณาลองเข้าสู่ระบบอีกครั้ง
            </Typography>
            <Button
              variant="outlined"
              // color="secondary"
              onClick={() => navigate("/login")}
              sx={{
                mt: 2,
                fontFamily: "Sarabun",
                color: "black",
                borderColor: "black",
              }}
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  const findLandmarksForUser = (userCountry: string) => {
    const landmark = landmarkall.find((lm) => lm.country === userCountry);
    return landmark ? landmark.landmark : [];
  };

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
          flexDirection: "column",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            p: 2,
          }}
        ></Box>
        <Container
          maxWidth="sm"
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            {...stringAvatar(userData.name)}
            sx={{ width: 96, height: 96, mb: 2 }}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: "Sarabun", fontSize: "40px" }}
          >
            {userData.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                textAlign: "start",
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontFamily: "Sarabun", fontSize: "24px" }}
              >
                ชื่อผู้ใช้: {userData.username}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontFamily: "Sarabun", fontSize: "24px" }}
              >
                ประเภทของผู้ใช้: {userData.typeuser}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontFamily: "Sarabun", fontSize: "24px" }}
              >
                ประเทศ: {userData.country}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontFamily: "Sarabun", fontSize: "24px" }}
              >
                สถานที่สำคัญในประเทศ
              </Typography>
              <List sx={{ width: "100%" }}>
                {findLandmarksForUser(userData.country).map((lm, index) => (
                  <ListItem key={index}>
                    {/* <Typography
                      variant="body1"
                      sx={{ fontFamily: "Sarabun", fontSize: "20px" }}
                    >
                      <Link to={`https://www.google.com/search?q=${lm}`}  >
                        {lm}
                      </Link>
                      
                    </Typography> */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Sarabun",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open(
                          `https://www.google.com/search?q=${lm}`,
                          "_blank"
                        )
                      }
                    >
                      {lm}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MainPage;
