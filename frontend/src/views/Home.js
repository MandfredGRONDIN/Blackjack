import React, { useState } from "react";
import "../styles/index.css";
import Login from "./Login";
import Signup from "./Signup";

export default function Home() {
   // State pour le bouton "Jouer" qui montre ou cache les boutons "Login" et "Signup"
   const [isOpen, setIsOpen] = useState(false);
   // State pour montrer ou cacher le composant Login
   const [showLogin, setShowLogin] = useState(false);
   // State pour montrer ou cacher le composant Signup
   const [showSignup, setShowSignup] = useState(false);

   // Gère le clic sur le bouton "Login"
   const handleLoginClick = () => {
      setShowLogin(true);
      setShowSignup(false);
   };

   // Gère le clic sur le bouton "Signup"
   const handleSignupClick = () => {
      setShowSignup(true);
      setShowLogin(false);
   };

   return (
      <main className="home text-align-center">
         <h1 className="text-style">Blackjack</h1>
         <div className="">
            {/* Si le bouton "Jouer" n'est pas cliqué, on montre seulement le bouton "Jouer" */}
            {!isOpen ? (
               <div
                  className="button__play text-style cursor"
                  onClick={() => setIsOpen(true)}
               >
                  Jouer
               </div>
            ) : (
               /* Si le bouton "Jouer" est cliqué, on montre les boutons "Login" et "Signup" 
                  sauf si l'utilisateur a déjà cliqué sur l'un des deux boutons */
               <div className="log-signup">
                  {showLogin || showSignup ? null : (
                     <>
                        <div
                           className="log__button cursor"
                           onClick={handleLoginClick}
                        >
                           Login
                        </div>
                        <div
                           className="log__button cursor"
                           onClick={handleSignupClick}
                        >
                           Signup
                        </div>
                     </>
                  )}
                  {/* Si l'utilisateur a cliqué sur le bouton "Login", on montre le composant Login */}
                  {showLogin && <Login />}
                  {/* Si l'utilisateur a cliqué sur le bouton "Signup", on montre le composant Signup */}
                  {showSignup && <Signup />}
               </div>
            )}
         </div>
      </main>
   );
}
