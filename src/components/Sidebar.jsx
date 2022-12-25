import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import {RiCloseLine} from 'react-icons/ri'
import { updateLogo } from "../assets";
import { links } from "../assets/constants";
import { Link } from "react-router-dom";

const NavLinks =({handleClick}) => (
  <div className="mt-1">
    {links.map((link) => (
      <NavLink
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        key={link.name}
        to={link.to}
        onClick={() => handleClick && handleClick()}
      >
        <link.icon className="w-6 h-6 mr-2"/>
        {link.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <Link to=""><img src={updateLogo} alt="logo" className="w-full object-contain"/></Link>
        <NavLinks />
      </div>
      
      <div className="absolute md:hidden block z-10 top-1 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2 cursor-pointer" onClick={() => setMobileMenuOpen(false)}/>
        ): (
          <HiOutlineMenu className="w-6 h-6 text-white mr-2 cursor-pointer" onClick={() => setMobileMenuOpen(true)}/>
        )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from=white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
      <Link to=""><img src={updateLogo} alt="logo" className="w-full h-14 object-contain"/></Link>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
      </div>
    </>
  );
}

export default Sidebar;
