import Footer from "../components/Footer.components";
import LeftMenu from "../components/LeftMenu.components.jsx";
import Navbar from "../components/Navbar.components";
import { useMenuData } from "../contexts/MenuContext";
import useWindowWidth from "../base/useWindowWidth";

export default function Layout({ children }) {
  const { collapsed } = useMenuData();
  const windowWidth = useWindowWidth();
  return (
    <div
      className="app"
      style={{
        gridTemplateColumns:
          windowWidth < 600
            ? "0 100%"
            : collapsed
            ? "250px calc(100vw - 250px)"
            : "70px calc(100vw - 80px)",
      }}
    >
      <LeftMenu />
      <div />
      <div className="right-app">
        <Navbar />
        <main style={{ width: "100%", paddingBottom: 40, paddingRight: 30 }}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
