import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/components/Authentication/Authentication.module.css";
import { getSession, signIn } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  let callbackUrl = searchParams.get("callbackUrl");
  if (callbackUrl) {
    try {
      const url = new URL(callbackUrl);
      if (url.origin != globalThis.location?.origin) {
        callbackUrl = "";
      }
    } catch (e) {}
    if (callbackUrl.indexOf("logout") > -1) {
      callbackUrl = "";
    }
  }

  callbackUrl = callbackUrl || "/";
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("email");
    const password = data.get("password");

    const result = await signIn("credentials", {
      username,
      password,
      callbackUrl,
      redirect: false,
    });

    const clientSession = await getSession();
    if (result && result.status == 200 && clientSession?.user?.token) {
      router.push(callbackUrl);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <div className="authenticationBox">
        <div className={styles.container}>
          {/* edited by achappan login page responsive code edit authentication component  */}
          {/* <div className={styles.leftContainer}>
            <div className={styles.topContainer}>
              <div className={styles.cardContainer}>
                <img
                  src="/images/sign.png"
                  alt="favicon"
                  className={styles.sign}
                />
                <Card className={styles.floatingCard} >
                  <h2>Applied patent</h2>
                  <p>200<strong>+ </strong> </p>
                </Card>
              </div>
            </div>
            <div className={styles.bottomContainer}>
              <Typography as="h1" mb="5px">
                <img
                  src="/images/logo-white.png"
                  alt="favicon"
                  className={styles.favicon}
                />
                <Typography className={styles.textt}>
                  Let's Empower your <strong>cross </strong>
                </Typography>
                <Typography className={styles.text}>
                  <strong> border patent</strong> seamlessly
                </Typography>
                <Typography className={styles.text2}>
                  Blockchain Driven One Stop IP platform to protect your <br></br>Inventions Globally.
                </Typography>
              </Typography>
            </div>
          </div> */}
          <div className={styles.leftContainer}>
            <img src="/images/loginPageImage.png" alt="loginScreenLeftSideImage" />
          </div>
          <div className={styles.rightContainer}>
            <div className="loginCardStyle">
              <Box >
                <h1>Login Your account</h1>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      mb: "20px",
                      width: { //resize box  
                        xs: 340,
                        md: 370,
                        lg: 400,
                        xl: 500,
                      },
                    }}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          InputProps={{
                            style: { borderRadius: 8 },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          InputProps={{
                            style: { borderRadius: 8 },
                          }}
                        />
                      </Grid>
                    </Grid>

                    {error && (
                      <Typography
                        variant="body2"
                        color="error"
                        align="center"
                        sx={{ mb: 3 }}
                      >
                        {error}
                      </Typography>
                    )}
                    <br /><br />
                    <Grid container alignItems="center" spacing={2} >
                      <Grid item xs={5} sm={5} ml="20px">
                        <FormControlLabel
                          control={
                            <Checkbox value="allowExtraEmails" color="primary" />
                          }
                          label="Remember me."
                        />
                      </Grid>

                      <Grid item xs={5} sm={5} textAlign="end" ml="20px">
                        <Link
                          href="/authentication/forgot-password"
                          className="primaryColor text-decoration-none"
                        >
                          Forgot your password?
                        </Link>
                      </Grid>
                    </Grid>
                    <br />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: "20px",
                        textTransform: "capitalize",
                        borderRadius: "100px", /* Changed to 100px for circular button */
                        fontWeight: "500",
                        fontSize: "16px",
                        padding: "14px 0px 14px 0px", /* Adjust the padding as needed */
                        color: "#fff !important",
                        background: "linear-gradient(270deg, #02E1B9 0%, #00ACF6 100%)",
                      }}
                    >
                      Log In
                    </Button>
                    <Typography fontSize="15px" mb="30px" mt="15px" ml="30px">
                      Don't have an account?{" "}
                      <Link
                        href="/authentication/sign-up"
                        className="primaryColor text-decoration-none"
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </Box>
                  <Typography fontSize="12px" mt="20%" textAlign="center" color="#676B5F">
                    2023 Copyrights. All Rights Reserved
                  </Typography>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};