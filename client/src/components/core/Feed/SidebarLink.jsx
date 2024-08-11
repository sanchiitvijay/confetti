import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import "./sidebar.css";
import { memo } from "react";

const SidebarLink=memo(function SideBarLink({link,iconName}){
  
  const Icon= Icons[iconName];
  const location=useLocation();


  const matchRoute=(route)=>{
    return matchPath({path:route},location.pathname);
  }

  return(

      <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)?("bg-[#fff9d8] dark:bg-confettiDarkColor3 dark:text-white "):("bg-opacity-0")}`}
      >
        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${
          matchRoute(link.path)?("opacity-100"):("opacity-0")} `}>
        </span>
        
        <div className="flex item-center gap-x-2">
          <Icon className="text-lg"/>
          <span className="">{link.name}</span>
        </div>

      </NavLink>
   
  );
});

export default SidebarLink;