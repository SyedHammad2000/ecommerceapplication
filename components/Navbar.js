import React from "react";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const cookie = parseCookies();
  const user = cookie?.user ? JSON.parse(cookie?.user) : "";
  console.log(user);

  return (
    <div className="navbar">
      <h1>Big Buy</h1>

      <ul className="flex gap-8 mr-2">
        <li className="link">
          <Link href={"/"}>Home</Link>
        </li>

        <>
          {user ? (
            <>
              <button
                className="bg-cyan-900 text-slate-50 hover:opacity-80 w-24 mt-1 rounded-lg"
                onClick={() => {
                  router.push("/login");
                  cookies.remove("user");
                  cookies.remove("token");
                  toast.success("Logged Out");
                }}
              >
                Logout
              </button>

              <li>
                <Link href={"/account"}>Account</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
              <li>
                <Link href={"/signup"}>SignUp</Link>
              </li>
            </>
          )}
        </>
        {user?.role === "admin" ? (
          <li>
            <Link href={"/create"}>Create</Link>
          </li>
        ) : (
          <></>
        )}
        <li>
          <Link href={"/cart"}>Cart</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
