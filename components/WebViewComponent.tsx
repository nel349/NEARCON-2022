import React from "react";
import { WebView } from 'react-native-webview';
// import { Wallet } from 'near-wallet'

const runFirst = `
      window.payee = 'hello222';
       // note: this is required, or you'll sometimes get silent failures
    `;

 export const MyWebComponent = () => {
  return ( <WebView 
    source={{ uri: `http://192.168.1.172:1234` }}
    javaScriptEnabled={true}
    onMessage={async (event) => {
    }} 
    injectedJavaScriptBeforeContentLoaded={runFirst}
   />
   );
};