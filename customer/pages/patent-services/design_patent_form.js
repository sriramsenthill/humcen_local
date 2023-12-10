import React, { useState, useRef } from "react";
import BannerCard from "@/components/BannerCard";
import Link from "next/link";
import ShoppingCart from "@/components/shoppingCart";
import style from "@/styles/PageTitle.module.css";
import { Button, ButtonProps, Card } from "@mui/material";
import { styled } from "@mui/system";
import DefaultSelect from "@/components/Forms/AdvancedElements/DefaultField";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { CheckBox, Margin } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { useRouter } from "next/router";
import OkDialogueBox from "./dialoguebox";
import CustomDropZone from "@/components/CustomDropBox";
import Head from "next/head";
import {
  Container,
  Paper,

  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Inbox() {
  const [draftingOpen, setDraftingOpen] = useState(true);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [isErrorDialogOpenStatus, setIsErrorDialogOpenStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [summary, setSummary] = useState([]);
  const [totalBill, setBill] = useState([]); // Bill amount state
  const [shoppingList, setList] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [description, setDescription] = useState(null);
  const [patentDetails, setPatentDetails] = useState(null);
  const [files, setFiles] = useState(null);
  const [businessObj, setBusinessObj] = useState('');
  const [marketAndIndustry, setMarketAndIndustry] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [patentInfo, setPatentInfo] = useState("");
  const [success, setSuccess] = useState("");
  const [commGoals, setCommGoals] = useState("");
  const [compLandscape, setCompLandscape] = useState("");
  const [techDescription, setTechDescription] = useState("");


  const router = useRouter();


  const handleDomainChange = (value) => {
    setDomain(value);
  };

  const handlePatentInfo = (event) => {
    setPatentInfo(event.target.value);
  };

  const handleCommGoals = (event) => {
    setCommGoals(event.target.value);
  };

  const handleCompLandscape = (event) => {
    setCompLandscape(event.target.value);
  };

  const handleTechDescription = (event) => {
    setTechDescription(event.target.value);
  }

  const isFormValid = () => {
    // Check if all the required fields are filled
    return (
      domain &&
      patentInfo &&
      commGoals &&
      compLandscape &&
      techDescription
    );
  };

  const handleSubmit = async (e) => {

    if (!isFormValid()) {
      setIsErrorDialogOpen(true);
      return;
    }


    const formData = {
      field: domain,
      patent_information: patentInfo,
      commercialization_goals: commGoals,
      competitive_landscape: compLandscape,
      technology_description: techDescription,
      countries: country,
      bills: totalBill,
    };

    try {
      const response = await axios.post("/patent_licensing", formData);
      const data = response.data;
      console.log("Form submitted successfully");
      console.log(data);
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(error.response.data);
      setIsErrorDialogOpenStatus(true);
    }
  };



  const handleOk = () => {
    setIsSubmitted(false);
    router.push("/");
  };



  const handleDraftingContinue = () => {
    if (isFormValid()) {
      setDraftingOpen(false);
      setCountriesOpen(true);

      setSummary([
        {
          title: "Patent Information",
          text: patentInfo,
        },
        {
          title: "Domain",
          text: domain,
        },
        {
          title: "Commercialization Goals",
          text: commGoals,
        },
        {
          title: "Competitive Landscape",
          text: compLandscape,
        },
        {
          title: "Technology Description",
          text: techDescription,
        },

      ]);
    } else {
      setSuccess(false);
    }
  };


  const handleCountriesContinue = () => {
    if (country.length != 0) {
      setCountriesOpen(false);
      setContactOpen(true);

      setSummary([
        {
          title: "Patent Information",
          text: patentInfo,
        },
        {
          title: "Domain",
          text: domain,
        },
        {
          title: "Commercialization Goals",
          text: commGoals,
        },
        {
          title: "Competitive Landscape",
          text: compLandscape,
        },
        {
          title: "Technology Description",
          text: techDescription,
        },

      ]);

      const newList = []
      console.log(country);
      for (let choices = 0; choices < country.length; choices++) {
        newList.push({
          country: country[choices],
          cost: totalBill[choices]
        });

      }
      setList(newList)

    } else {
      console.log("Yes");
      setContactOpen(false);
      setSuccess(false);
    }



  };


  return (
    <>
      <div style={{ margin: '0 1rem' }}>
        <Paper elevation={3} style={{ borderRadius: '16px', padding: '1rem', margin: '1rem 0' }}>
          {/* Banner */}


          {/* Page title */}
          <div className={style.pageTitle}>
            <ul>
              <li>
                <Link href="/">Dashboard</Link>
              </li>
              <li>
                <Link href="/patent-services">My Patent Services</Link>
              </li>
              <li>Patent Licensing and Commercialization Services</li>
            </ul>
          </div>

          <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Head>
              <title>Patent Licensing and Commercialization Services</title>
            </Head>
            <BannerCard
              title="Patent Licensing & Commercialization"
              imageSrc="/images/banner_img/bg.png"
              color="white"
              style={{ width: '100%', maxWidth: '1200px', margin: '550%' }}></BannerCard>

            <Typography variant="h5" onClick={() => { setDraftingOpen(!draftingOpen); if (contactOpen) { setContactOpen(false) } }} style={{ cursor: 'pointer', fontWeight: "bold", marginLeft: "25px" }}>
              Patent Licensing and Commercialization Services
              <ExpandMoreIcon style={{ transform: draftingOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </Typography>

            {draftingOpen && (
              <div style={{ padding: '1rem 0' }}>
                <Card
                  sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px",
                    mb: "10px",
                  }}
                >
                  <DefaultSelect domain={domain} onDomainChange={handleDomainChange} />
                </Card>
                <Card
                  sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px",
                    mb: "10px",
                  }}
                >
                  <Typography
                    as="h3"
                    sx={{
                      fontSize: 18,
                      fontWeight: 500,
                      mb: "10px",
                    }}
                  >
                    Patent Information :
                  </Typography>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    value={patentInfo}
                    label={!patentInfo && "Share details of the patented technology."}
                    autoComplete="name"
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    onChange={handlePatentInfo} // Provide the onChange event handler
                  />
                </Card>
                <Card
                  sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px",
                    mb: "10px",
                  }}
                >
                  <Typography
                    as="h3"
                    sx={{
                      fontSize: 18,
                      fontWeight: 500,
                      mb: "10px",
                    }}
                  >
                    Commercialization Goals :
                  </Typography>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    value={commGoals}
                    label={!commGoals && "Discuss your specific goals and objectives for licensing and commercializing your patented technology."}
                    autoComplete="name"
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    onChange={handleCommGoals} // Provide the onChange event handler
                  />
                </Card>
                <Card
                  sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px",
                    mb: "10px",
                  }}
                >
                  <Typography
                    as="h3"
                    sx={{
                      fontSize: 18,
                      fontWeight: 500,
                      mb: "10px",
                    }}
                  >
                    Competitive Landscape :
                  </Typography>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    value={compLandscape}
                    label={!compLandscape && "Provide information about existing competitors or companies operating in the same or related fields."}
                    autoComplete="name"
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    onChange={handleCompLandscape} // Provide the onChange event handler
                  />
                </Card>
                <Card
                  sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px",
                    mb: "10px",
                  }}
                >
                  <Typography
                    as="h3"
                    sx={{
                      fontSize: 18,
                      fontWeight: 500,
                      mb: "10px",
                    }}
                  >
                    Technology Description :
                  </Typography>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    value={techDescription}
                    label={!techDescription && "Give a comprehensive description of the patented technology."}
                    autoComplete="name"
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    onChange={handleTechDescription} // Provide the onChange event handler
                  />
                </Card>
              </div>
            )}

            {draftingOpen && <div style={{
              textAlign: "center"
            }}>
              <Button variant="contained" color="primary" onClick={handleDraftingContinue} style={{ marginTop: '1rem', borderRadius: "100px", boxShadow: "none", background: "linear-gradient(90deg, rgba(0, 172, 246, 0.8) 0%, rgba(2, 225, 185, 0.79) 91.25%)" }}>
                Continue
              </Button>
            </div>}

            <Divider style={{ margin: '2rem 0' }} />
            <Typography variant="h5" style={{ fontWeight: "bold", marginLeft: "25px" }}
              onClick={() => { if (!draftingOpen) { setCountriesOpen(!countriesOpen); if (contactOpen) { setContactOpen(false) } } }}>
              Target Country
              <ExpandMoreIcon style={{ transform: countriesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} /></Typography>
            {countriesOpen && (
              <div style={{ padding: '1rem 0' }}>
                {/* Country Selection Buttons */}
                <Typography
                  as="h3"
                  sx={{
                    fontSize: 18,
                    fontWeight: 500,
                    ml: "28px",
                    mb: "10px",
                  }}
                >
                  Select the Country
                </Typography>
                <Button
                  style={{
                    background: country.includes("India") ? "linear-gradient(90deg, rgba(0, 172, 246, 0.8) 0%, rgba(2, 225, 185, 0.79) 91.25%)" : "#F8FCFF",
                    color: country.includes("India") ? "white" : "#BFBFBF",
                    width: "15%",
                    marginRight: "2%",
                    marginLeft: "25px",
                    boxShadow: "none",
                    borderRadius: "100px",
                    height: "60px",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    if (!country.includes("India")) {
                      setCountry(country => [...country, "India"]);
                      setBill([...totalBill, 625]);
                    } else {
                      setCountry(country.filter(nation => nation != "India"));
                      setBill(totalBill.filter(bill => bill != 625));
                    }
                    console.log(country);
                    console.log(totalBill);
                  }}
                >
                  <img
                    src="https://hatscripts.github.io/circle-flags/flags/in.svg"
                    width="24"
                  />
                  &nbsp;&nbsp;India <br />&nbsp;&nbsp;&#40;&#36;625&#41;
                </Button>
                <Button
                  style={{
                    background: country.includes("United States") ? "linear-gradient(90deg, rgba(0, 172, 246, 0.8) 0%, rgba(2, 225, 185, 0.79) 91.25%)" : "#F8FCFF",
                    color: country.includes("United States") ? "white" : "#BFBFBF",
                    width: "18%",
                    marginRight: "2%",
                    boxShadow: "none",
                    borderRadius: "100px",
                    height: "60px",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    if (!country.includes("United States")) {
                      setCountry(country => [...country, "United States"]);
                      setBill([...totalBill, 900]);
                    } else {
                      setCountry(country.filter(nation => nation != "United States"));
                      setBill(totalBill.filter(bill => bill != 900))
                    }
                    console.log(country);
                    console.log(totalBill);
                  }}
                  value="United States"
                >
                  <img
                    src="https://hatscripts.github.io/circle-flags/flags/us.svg"
                    width="24"
                  />
                  &nbsp;&nbsp;United States <br />&nbsp;&nbsp;&#40;&#36;900&#41;
                </Button>
              </div>
            )}
            {countriesOpen && <div style={{
              textAlign: "center"
            }}>
              <Button variant="contained" color="primary" onClick={handleCountriesContinue} style={{ marginTop: '1rem', borderRadius: "100px", boxShadow: "none", background: "linear-gradient(90deg, rgba(0, 172, 246, 0.8) 0%, rgba(2, 225, 185, 0.79) 91.25%)" }}>
                Continue
              </Button>
            </div>}

            <Divider style={{ margin: '2rem 0' }} />
            <Typography variant="h5" style={{
              fontWeight: "bold",
              marginLeft: "25px"
            }}>Summary</Typography>
            {contactOpen && <div style={{ padding: '0.5rem 0' }}>
              {/* Your content for the 'Contact' section */}
              <ShoppingCart priceList={shoppingList} detailsList={summary} total={totalBill.reduce((a, b) => a + b, 0)} service="Patent Licensing and Commercialization Services" />
            </div>
            }
            {contactOpen && isFormValid() && <div style={{ textAlign: "center" }}>
              <Button variant="contained" onClick={() => handleSubmit()} style={{ marginTop: '0.5rem', borderRadius: "100px", boxShadow: "none", background: "linear-gradient(90deg, rgba(0, 172, 246, 0.8) 0%, rgba(2, 225, 185, 0.79) 91.25%)" }}>
                Submit
              </Button>
            </div>}


          </Container>
        </Paper>
      </div>
      <OkDialogueBox success={success} serviceValue={"Patent Drafting"} />
    </>
  );
};

