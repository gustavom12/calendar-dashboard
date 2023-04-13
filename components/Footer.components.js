import React from "react";

const Footer = () => {
  return (
    <footer className="d-flex">
      {/* <img style={{marginRight: 11}} alt="" src="/assets/footerLogo.svg" /> */}
      <div
        style={{
          color: "#868EB7",
        }}
      >
        <div style={{fontWeight: 600, marginTop: 4}}>Desarrollado por Gustavo Mercado</div>
        <div style={{fontWeight: 400}}>© 2023 / Todos los derechos reservados</div>
      </div>
    </footer>
  );
};

export default Footer;
