import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function NaviBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define available tabs
  const tabs = [{ path: "/snapshot", label: "SnapShot" }];

  const currentTabIndex = tabs.findIndex(
    (tab) => tab.path === location.pathname
  );

  const handleChange = (event, newValue) => {
    navigate(tabs[newValue].path);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="absolute" sx={{ bgcolor: "white", color: "black" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tabs
            value={currentTabIndex === -1 ? 0 : currentTabIndex}
            onChange={handleChange}
            variant="fullWidth"
            textColor="primary"
            sx={{
              flex: 1,
              "& .MuiTab-root": {
                // uncomment this line to make the text lowercase or as is
                // textTransform: "none",
              },
              "& .Mui-selected": {
                color: "primary.main",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Box>
      </AppBar>
    </Box>
  );
}
