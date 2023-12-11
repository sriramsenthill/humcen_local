import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { useState, useEffect } from "react";
import { commonUtils } from "frontend-module";

const eCommerce = () => {
  const [profileName, setName] = useState(null);

  useEffect(() => {
    setName(commonUtils.getUserName());
  }, []);


  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1
          style={{
            fontStyle: "normal",
            fontWeight: "800",
            fontSize: "24px",
            lineHeight: "29px",
          }}
        >
          Hey {profileName},
        </h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>home</li>
        </ul>
      </div>
      <p style={{ textAlign: "left", fontSize: "18" }}>
        We have some quick updates for you today!
      </p>
    </>
  );
}

export default eCommerce