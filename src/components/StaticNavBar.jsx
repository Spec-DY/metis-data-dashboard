import systemway_logo from "@assets/systemway_logo.png";

export default function StaticNavBar() {
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar-start">
        <a
          className="btn btn-ghost p-2"
          href="https://systemwayconsulting.ca/"
          target="_blank"
        >
          <img
            src={systemway_logo}
            alt="Systemway Logo"
            className="h-8 w-auto object-contain"
          />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="text-lg font-semibold tracking-wide hover:text-primary transition-colors">
              SNAPSHOT
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* 保持对称性 */}
        <div className="w-[40px]"></div>
      </div>
    </div>
  );
}
