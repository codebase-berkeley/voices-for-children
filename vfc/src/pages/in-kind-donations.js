import Navbar from "@/app/Components/navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./in-kind-donations.css";
import "react-tabs/style/react-tabs.css";
import Donation from "./donation";
import Inventory from "./inventory";
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
      <UnauthenticatedTemplate>hello unauthenticated</UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Navbar />
        <Tabs>
          <TabList className="tab-list">
            <Tab>Donation log</Tab>
            <Tab>Inventory log</Tab>
          </TabList>

          <TabPanel>
            <Donation />
          </TabPanel>
          <TabPanel>
            <Inventory />
          </TabPanel>
        </Tabs>
      </AuthenticatedTemplate>
    </div>
  );
}
