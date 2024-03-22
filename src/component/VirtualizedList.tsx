// import { Avatar } from "@mui/material";

// import Avatar from '@mui/material/Avatar';
// import { Avatar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { LandMarkModel } from "../model/LandMarkModel";
import { UserModel } from "../model/UserModel";

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

function VirtualizedList({
  userall,
  findLandmarksForUser,
}: {
  userall: UserModel[];
  findLandmarksForUser: (country: string) => LandMarkModel[];
}) {
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    const user = userall[index];
    const landmarks = findLandmarksForUser(user.country);

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <Avatar
            {...stringAvatar(user.name)}
            sx={{ width: 56, height: 56, mb: 0, mx: 1 }}
          />
          <ListItemText
            primary={`${user.username}`}
            secondary={`${user.country}`}
            sx={{
              my: 0,
              mr: 2,
              maxWidth: 50,
            }}
          />

          {/* ทำการแสดง Landmarks ที่เจอ */}
          {landmarks.length > 0 && (
            <ul style={{ margin: 0 }}>
              {landmarks.map((landmark, lIndex) => (
                <li key={lIndex}>{String(landmark)}</li>
              ))}
            </ul>
          )}
        </ListItemButton>
      </ListItem>
      // <ListItem style={style} key={index} component="div" disablePadding>
      //   <ListItemButton>
      //     <Avatar
      //       {...stringAvatar(user.name)}
      //       sx={{ width: 56, height: 56, mb: 0, mx: 1 }}
      //     />
      //     <ListItemText
      //       primary={`${user.username}`}
      //       secondary={`${user.country}`}
      //       sx={{ my: 0, minWidth: "fit-content", mr: 5 }} // Adjust the margin as needed
      //     />

      //     <Box
      //       component="ul"
      //       sx={{
      //         p: 0,
      //         m: 0,
      //         listStyleType: "none",
      //         "& li": { display: "inline", mr: 3 },
      //       }}
      //     >
      //       {landmarks.map((landmark, lIndex) => (
      //         <li key={lIndex}>{String(landmark)}</li>
      //       ))}
      //     </Box>
      //   </ListItemButton>
      // </ListItem>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 200,
        bgcolor: "background.paper",
        height: "50vh",
      }}
    >
      <FixedSizeList
        // className={classes.myScroll}

        height={700}
        width={500}
        itemSize={150} // ปรับค่าตามความเหมาะสม
        itemCount={userall.length}
        overscanCount={1}
        style={{
          scrollbarWidth: "none",
        }}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}

export default VirtualizedList;
