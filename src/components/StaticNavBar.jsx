import systemway_logo from "@assets/systemway_logo.png";

export default function StaticNavBar() {
  return (
    <div className="navbar shadow-md px-2 bg-white ">
      <div className="navbar-start">
        <a
          className="btn btn-ghost p-2 h-12 "
          href="https://systemwayconsulting.ca/"
          target="_blank"
        >
          <img
            src={systemway_logo}
            alt="Systemway Logo"
            className="h-10 w-auto object-contain"
          />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-gradient-to-b from-zinc-200 to-zinc-50"
          >
            Snapshot
            {/* dropdown icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card card-compact left-1/2 -translate-x-1/2 bg-gray-100 text-gray-500 w-96 p-2 shadow"
          >
            <div className="card-body">
              <p>
                This page shows the analysis of the situation of Métis citizen
                in homeland and all five provinces, including demographics,
                health, education, housing, labor, language, community, etc.
                Intuitive data graphs listed show the analysis and accurate
                comparisons.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        {/* 保持对称性 */}
        <div className="w-[40px]"></div>
      </div>
    </div>
  );
}
