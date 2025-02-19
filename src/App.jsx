import NaviBar from "./components/NaviBar";
import { Route, Routes, Navigate } from "react-router-dom";
// import {BrowserRouter} from "react-router-dom";
import SnapShot from "./pages/SnapShot";
import StaticNavBar from "./components/StaticNavBar";
import Background from "./components/Background";
import { HashRouter } from "react-router-dom";

const PageLayout = ({ children }) => {
  return <div className="mt-10 items-center flex flex-col">{children}</div>;
};

function App() {
  return (
    <HashRouter>
      {/* uncomment below line when there will be more tabs than snapshot */}
      {/* <NaviBar /> */}
      <Background>
        <StaticNavBar />
        <PageLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/snapshot" replace />} />
            <Route path="/snapshot" element={<SnapShot />} />
            <Route
              path="/snapshot/:province/:category"
              element={<SnapShot />}
            />
            <Route
              path="/snapshot/:province/:category/:subcategory"
              element={<SnapShot />}
            />
          </Routes>
        </PageLayout>
      </Background>
    </HashRouter>
  );
}

export default App;
