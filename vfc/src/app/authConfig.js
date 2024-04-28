// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md

const msalConfig = {
    auth: {
        clientId: "8344aaf4-acb6-4631-9fe3-577d90475877",
        authority: "https://login.microsoftonline.com/common",
        knownAuthorities: [],
        cloudDiscoveryMetadata: "",
        redirectUri: "http://localhost:3000/",
        postLogoutRedirectUri: "enter_postlogout_uri_here",
        navigateToLoginRequestUrl: true,
        clientCapabilities: ["CP1"],
        protocolMode: "AAD"
    },
    cache: {
        cacheLocation: "sessionStorage",
        temporaryCacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
        secureCookies: false,
        claimsBasedCachingEnabled: true,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii
            ) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
            piiLoggingEnabled: false,
        },
        windowHashTimeout: 60000,
        iframeHashTimeout: 6000,
        loadFrameTimeout: 0,
        asyncPopups: false,
    },
    telemetry: {
        application: {
            appName: "My Application",
            appVersion: "1.0.0",
        },
    },
};

const msalInstance = new PublicClientApplication(msalConfig);