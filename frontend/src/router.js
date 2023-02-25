import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/Signup";
import Lobby from "./views/Lobby";
import Bet from "./views/Bet";
import Game from "./views/Game";
import Error from "./views/Error";
import Layout from "./layout";

function Routing() {
   return (
      <div className="App">
         <Layout>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/Login" element={<Login />} />
               <Route path="/Signup" element={<SignUp />} />
               <Route path="/Lobby" element={<Lobby />} />
               <Route path="/Bet" element={<Bet />} />
               <Route path="/Game/:id" element={<Game />} />
               <Route path="/*" element={<Error />} />
            </Routes>
         </Layout>
      </div>
   );
}

export default Routing;
