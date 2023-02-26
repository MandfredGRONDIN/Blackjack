import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
   const [email, setEmail] = useState("Email");
   const [emailError, setEmailError] = useState("");
   const [user, setUser] = useState("User");
   const [userError, setUserError] = useState("");
   const [password, setPassword] = useState("Password");
   const navigate = useNavigate();

   const handleSign = async (e) => {
      e.preventDefault();
      let pseudo = user;
      let item = { email, pseudo, password };
      let result = await fetch(
         `${process.env.REACT_APP_API_URL}api/auth/signup`,
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
         setUserError("");
         setEmailError(result.errorEmail);
      } else if (result.errorPseudo) {
         setEmailError("");
         setUserError(result.errorPseudo);
      } else {
         localStorage.setItem("userId", result.userId);
         navigate(`/lobby`);
      }
   };

   return (
      <div>
         <form
            className="d-flex col-flex"
            action=""
            onSubmit={handleSign}
            id="sign__form"
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
            <label htmlFor="user"></label>
            <input
               type="text"
               name="user"
               id="user"
               onClick={(e) => {
                  if (e.target.value === "User") {
                     e.target.value = "";
                  }
               }}
               onChange={(e) => setUser(e.target.value)}
               value={user}
            />
            {userError && <div className="user error">{userError}</div>}
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
            <input
               className="cursor"
               id="login__submit"
               type="submit"
               value="Login"
            />
         </form>
      </div>
   );
}
