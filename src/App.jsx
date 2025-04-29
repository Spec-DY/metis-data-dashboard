import { Route, Routes, Navigate } from "react-router";
import SnapShot from "@pages/SnapShot";
import NavBar from "@components/common/NavBar";
import Background from "@components/common/Background";
import { HashRouter } from "react-router";
import Profile from "@pages/Profile";

const PageLayout = ({ children }) => {
  return <div className="mt-10 items-center flex flex-col">{children}</div>;
};

function App() {
  return (
    <HashRouter>
      <Background>
        <NavBar />
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
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </PageLayout>
      </Background>
    </HashRouter>
  );
}

export default App;
