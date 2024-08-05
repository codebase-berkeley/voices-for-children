import Navbar from "@/app/Components/navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./in-kind-donations.css";
import "react-tabs/style/react-tabs.css";
import Donation from "./inventory";
import Inventory from "./donation";
import {
  PublicClientApplication,
  EventType,
  InteractionStatus,
} from "@azure/msal-browser";
import Login from "./loginpage";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { authScopes, msalConfig } from "../app/authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import LoginPage from "./loginpage";
// import Data from "./rawdata";
const msalInstance = new PublicClientApplication(msalConfig);

export default function Inkind() {
  return (
    <div>
      <MsalProvider instance={msalInstance}></MsalProvider>
      <Navbar />
      <Tabs>
        <TabList className="tab-list">
          <Tab>Inventory log</Tab>
          <Tab>Donation log</Tab>
        </TabList>

        <TabPanel>
          <Donation />
        </TabPanel>
        <TabPanel>
          <Inventory />
        </TabPanel>
      </Tabs>
    </div>
  );
}
