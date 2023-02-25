import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";

export default function Layout({ children }) {
   const location = useLocation();
   const lowercasePathname = location.pathname.toLowerCase();
   const isHomePage = lowercasePathname === "/";
   const isLoginPage = lowercasePathname === "/login";
   const isSignupPage = lowercasePathname === "/signup";

   // Ajouter un header à toute les pages sauf à la page Login/Register
   return (
      <>
         {!isHomePage && !isLoginPage && !isSignupPage && <Header />}
         {children}
      </>
   );
}
