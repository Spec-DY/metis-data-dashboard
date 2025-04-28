import systemway_logo from "@assets/systemway_logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { tabname: "Snapshot", path: "/snapshot/Homeland/demographic" },
    { tabname: "Community Profile", path: "/profile" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar shadow-md px-2 bg-white">
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

      {/* Desktop ver */}
      <div className="navbar-center hidden md:flex">
        {tabs.map((tab, index) => (
          <div
            key={index}
            tabIndex={index}
            role="button"
            onClick={() => navigate(tab.path)}
            className={`btn m-1 
              ${
                location.pathname.includes(tab.path.split("/")[1])
                  ? "bg-gradient-to-t from-blue-800 to-blue-900 text-white "
                  : "bg-gradient-to-b from-zinc-200 to-zinc-50"
              }
              `}
          >
            {tab.tabname}
          </div>
        ))}
      </div>

      {/* Mobile nav button */}
      <div className="navbar-end">
        <div className="md:hidden">
          <button onClick={toggleMenu} className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* mobile ver */}
          {isMenuOpen && (
            <div className="absolute right-0 top-16 p-2 shadow bg-white rounded-box w-52 z-50">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(tab.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left p-3 rounded-lg cursor-pointer mb-1 active:opacity-75
                    ${
                      location.pathname.includes(tab.path.split("/")[1])
                        ? "bg-gradient-to-t from-blue-800 to-blue-900 text-white"
                        : "hover:bg-zinc-100"
                    }
                  `}
                >
                  {tab.tabname}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="w-[40px] hidden lg:block"></div>
      </div>
    </div>
  );
}
