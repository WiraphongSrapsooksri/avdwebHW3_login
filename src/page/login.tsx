// import { Container, Paper, Typography } from "@mui/material";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../service/Service";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // console.log(username, password);

//     try {
//       const userType = login(username, password);
//       console.log(userType);

//       if (userType === "admin") {
//         navigate("/admin");
//       } else if (userType === "user") {
//         navigate("/");
//       } else {
//         console.log("Login failed");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <Container
//       component="main"
//       maxWidth="xs"
//       sx={{
//         mt: 8,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           my: { xs: 3, md: 6 },
//           p: { xs: 2, md: 3 },
//           width: "100%",
//           maxWidth: 400,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>

//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleLogin}>Login</button>
//       </Paper>
//     </Container>
//   );
// };

// export default LoginPage;

import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/Service";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      const userType = login(username, password);
      console.log(userType);

      if (userType === "admin") {
        navigate("/admin");
      } else if (userType === "user") {
        navigate("/");
      } else {
        console.log("Login failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt: 3,
            mb: 2,
            width: "50%",
            borderColor: "black",
            color: "black",
          }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
