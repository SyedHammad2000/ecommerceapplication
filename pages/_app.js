// Custom _app.js
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import "./globals.css";
import "../styles/Navbar.scss";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider } from "@chakra-ui/react";

export default function MyApp({ Component, pageProps }) {
  return (
    
      <Layout>
        <Head>
          <title>My App</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    
  );
}


