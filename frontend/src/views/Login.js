import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./Signup";

export default function Login() {
   const [email, setEmail] = useState("Email");
   const [emailError, setEmailError] = useState("");
   const [password, setPassword] = useState("Password");
   const [passwordError, setPasswordError] = useState("");
   const [showSignup, setShowSignup] = useState(false);
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();
      let item = { email, password };
      let result = await fetch(
         `${process.env.REACT_APP_API_URL}api/auth/login`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
            },
            body: JSON.stringify(item),
         }
      );
      result = await result.json();
      console.log(result);
      if (result.errorEmail) {
         setPasswordError("");
         setEmailError("email incorrect");
      } else if (result.errorPassword) {
         setPasswordError("Mot de passe incorrect");
         setEmailError("");
      } else {
         localStorage.setItem("userId", result.userId);
         navigate(`/lobby`);
      }
   };

   return (
      <div>
         {showSignup ? ( // expression conditionnelle pour afficher soit Login, soit Signup
            <SignUp />
         ) : (
            <form
               className="d-flex col-flex"
               action=""
               onSubmit={handleLogin}
               id="login__form"
            >
               <label htmlFor="email"></label>
               <input
                  type="text"
                  name="email"
                  id="email"
                  onClick={(e) => {
                     if (e.target.value === "Email") {
                        e.target.value = "";
                     }
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
               {emailError && <div className="email error">{emailError}</div>}
               <label htmlFor="password"></label>
               <input
                  type="password"
                  name="password"
                  id="password"
                  onClick={(e) => {
                     if (e.target.value === "Password") {
                        e.target.value = "";
                     }
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
               />
               {passwordError && (
                  <div className="password error">{passwordError}</div>
               )}
               <div
                  className="cursor switch__signup"
                  onClick={() => setShowSignup(true)}
               >
                  Devenir membre?
               </div>
               <input
                  className="cursor"
                  id="login__submit"
                  type="submit"
                  value="Login"
               />
            </form>
         )}
      </div>
   );
}
