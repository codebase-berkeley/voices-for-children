import { PublicClientApplication } from "@azure/msal-browser";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

export const msalInstance = new PublicClientApplication(msalConfig);

export default MainFunctionX({ Component, pageProps }); {
    console.log('MainFunctionX()');

    return (
        <MsalProvider instance={{msalInstance}}>
            <Component {...pageProps} />
        </MsalProvider>
    )
}