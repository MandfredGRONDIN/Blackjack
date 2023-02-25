import React, { useState } from "react";
import "../styles/index.css";

export default function Home() {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <main className="home text-align-center">
         <h1>Blackjack</h1>
      </main>
   );
}
