import systemway_logo from "@assets/systemway_logo.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function StaticNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { tabname: "Snapshot", path: "/snapshot/Homeland/demographic" },
    { tabname: "Community Profile", path: "/profile" },
  ];

  return (
    <div className="navbar shadow-md px-2 bg-white ">
      <div className="navbar-start">
        <a
          className="z-10"
          href="https://systemwayconsulting.ca/"
          target="_blank"
        >
          <img
            src={systemway_logo}
            alt="Systemway Logo"
            className="h-11 w-auto"
          />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {tabs.map((tab, index) => (
          <div
            tabIndex={index}
            role="button"
            className="btn m-1 bg-gradient-to-b from-zinc-200 to-zinc-50"
            onClick={() => navigate(tab.path)}
          >
            {tab.tabname}
          </div>
        ))}
      </div>

      <div className="navbar-end">
        <div className="w-[40px]"></div>
      </div>
    </div>
  );
}
