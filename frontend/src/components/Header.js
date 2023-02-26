import React, { useEffect, useState } from "react";

export default function Header() {
   const [dataUser, setDataUser] = useState("");
   const userId = localStorage.getItem("userId");

   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/auth/${userId}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const data = await response.json();
         setDataUser(data);
      }
      fetchData();
   }, [userId, dataUser.solde]);

   return (
      <div className="header background-primary d-flex align-items-baseline justify-content-between">
         <div className="w-25">Solde {dataUser.solde}€</div>
         <div className="d-flex w-25 text-align-center justify-content-evenly align-items-baseline">
            <div className="i__header d-flex justify-content-center align-items-center">
               <i className="fa-solid fa-user"></i>
            </div>
            <div>{dataUser.pseudo}</div>
         </div>
      </div>
   );
}
