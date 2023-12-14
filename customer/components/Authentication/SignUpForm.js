import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Typography, Card, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "@/components/Authentication/Authentication.module.css";
import { useRouter } from "next/router";

const SignUpForm = () => {
  const router = useRouter();
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateFormField(name, value);
  };

  const validateFormField = (name, value) => {
    switch (name) {
      case "firstName":
        setFirstNameValid(value.trim() !== "");
        setFirstNameError(value.trim() === "" ? "First name is required" : "");
        break;
      case "lastName":
        setLastNameValid(value.trim() !== "");
        setLastNameError(value.trim() === "" ? "Last name is required" : "");
        break;
      case "email":
        setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        setEmailError(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email address"
        );
        break;
      case "password":
        setPasswordValid(value.length >= 8);
        setPasswordError(
          value.length < 8 ? "Password must be at least 8 characters" : ""
        );
        break;
      case "confirmPassword":
        setConfirmPasswordValid(value !== "" && value === formData.password);
        setConfirmPasswordError(
          value !== "" && value === formData.password
            ? ""
            : "Passwords do not match"
        );
        break;
      default:
        break;
    }
  };

  const isFormValid =
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    passwordValid &&
    confirmPasswordValid;

  const handleSignup = async (event) => {
    event.preventDefault();

    const formValid =
      isFormValid &&
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.password &&
      formData.confirmPassword;

    if (formValid) {
      try {
        setLoading(true);
        // const res = await axios.post('/api/noauth/partner/signup', {
        //   ...formData
        // })

        // if (res?.data?.id) {
        //   router.push('/authentication/sign-in/')
        // } else {
        //   setSignupError('Server Error')
        //   console.log('res-->', res)
        // }
        console.log(formData);
      } catch (error) {
        setSignupError(
          error.response?.data?.error || error.response?.statusText
        );
        console.error("Error saving user data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      validateFormField("firstName", formData.firstName);
      validateFormField("lastName", formData.lastName);
      validateFormField("email", formData.email);
      validateFormField("password", formData.password);
      validateFormField("confirmPassword", formData.confirmPassword);
    }
  };

  return (
    <>
      <div className="authenticationBox">
        <div className={styles.container} style={{ height: "100%" }}>
          <div className={styles.leftContainer}>
            <div className={styles.topContainer}>
              <div className={styles.cardContainer}>
                <img
                  src="/images/sign.png"
                  alt="favicon"
                  className={styles.sign}
                />
                <Card className={styles.floatingCard}>
                  <h2>Applied patent</h2>
                  <p>
                    200<strong>+ </strong>
                  </p>
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
                  Blockchain Driven One Stop IP platform to protect your <br />
                  Inventions Globally.
                </Typography>
              </Typography>
            </div>
          </div>
          <div className={styles.rightContainer} style={{ height: "1200px" }}>
            <Box
              component="main"
              sx={{
                maxWidth: "490px",
                ml: "auto",
                mr: "auto",
                padding: "50px 0 100px",
              }}
            >
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                  background: "#fff",
                  padding: "30px 20px",
                  borderRadius: "10px",
                  mb: "20px",
                }}
                className="bg-black"
              >
                <Grid container alignItems="center" spacing={2}>
                  <h1>Sign Up</h1>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!firstNameValid}
                      helperText={firstNameError}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!lastNameValid}
                      helperText={lastNameError}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                      value={formData.email}
                      onChange={handleChange}
                      error={!emailValid}
                      helperText={emailError}
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
                      value={formData.password}
                      onChange={handleChange}
                      error={!passwordValid}
                      helperText={passwordError}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      component="label"
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                      }}
                    ></Typography>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!confirmPasswordValid}
                      helperText={confirmPasswordError}
                    />
                  </Grid>
                </Grid>
              </Box>

              {signupError && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mb: 2 }}
                >
                  {signupError}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid || loading}
                onClick={handleSignup}
                sx={{
                  mt: "20px",
                  textTransform: "capitalize",
                  borderRadius: "100px",
                  fontWeight: "500",
                  fontSize: "16px",
                  marginLeft: "20px",
                  padding: "14px 0px 14px 0px",
                  color: "#fff !important",
                  width: "450px",
                  height: "48px",
                  background:
                    "linear-gradient(270deg, #02E1B9 0%, #00ACF6 100%)",
                }}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Sign up"
                )}
              </Button>

              <Typography
                style={{
                  fontSize: "15px",
                  marginBottom: "30px",
                  marginTop: "15px",
                  marginLeft: "20px",
                  textAlign: "center",
                }}
              >
                Already have an account?{" "}
                <Link
                  href="/authentication/sign-in/"
                  className="primaryColor text-decoration-none"
                >
                  Log In
                </Link>
              </Typography>

              <Typography
                fontSize="12px"
                mt="20%"
                textAlign="center"
                color="#676B5F"
              >
                2023 Copyrights. All Rights Reserved
              </Typography>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
