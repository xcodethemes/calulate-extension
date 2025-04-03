import React from 'react'

const Navbar = ({setView}) => {
  return (
     <nav className="flex justify-between mb-5">
           <div className="text-xl text-gray-800 font-bold ">Trading App</div>
          
           <div className="flex gap-2.5 items-center">
             <img
               src="icons/setting.png"
               alt="Settings"
               className="icon"
               style={{ width: "20px", height: "20px", cursor: "pointer" }}
               onClick={() => setView("settings")}
             />
             <img
               src="icons/notes.png"
               alt="Notes"
               className="icon"
               style={{ width: "20px", height: "20px", cursor: "pointer" }}
               onClick={() => setView("notes")}
             />
           </div>
         </nav>
  )
}

export default Navbar