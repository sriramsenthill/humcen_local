import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import BasicTabs from "./Tabs";

const Settings = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          mb: "15px",
          display: "flex",
          p: "12px 12px",
          flexDirection: "column",
          background: "white",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "24px",
            lineHeight: "140%",
            color: "#00002B",
          }}
        >
          Settings
        </Typography>

        <BasicTabs />
      </Card>
    </>
  );
}

export default Settings;