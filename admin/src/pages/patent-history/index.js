import React from "react";
import styles from "@/styles/PageTitle.module.css";
import RecentOrders from "@/components/Dashboard/eCommerce/RecentOrders";
import Search from "@/components/Dashboard/eCommerce/Search";
import DefaultSelect from "@/components/Forms/AdvancedElements/DefaultSelect";

const ContactList = () => {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>On Going Patents</h1>
        <Search />
        <DefaultSelect />
      </div>
      <br></br>
      <RecentOrders />
      <br></br>
    </>
  );
}

export default ContactList;
