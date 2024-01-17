import React from "react";
import { parseCookies } from "nookies";

const Account = () => {
  return <div>Account</div>;
};

export default Account;

export const getServerSideProps = async (ctx) => {
  // Get the user session token from the cookies.
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { location: "/login" });
    res.end();
  }
  return {
    props: {},
  };
};
