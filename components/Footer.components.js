import React from "react";

const Footer = () => {
  return (
    <footer className="d-flex">
      <img style={{marginRight: 11}} alt="" src="/assets/footerLogo.svg" />
      <div
        style={{
          color: "#868EB7",
        }}
      >
        <div style={{fontWeight: 600, marginTop: 4}}>Fichap - Gestión inteligente de equipos</div>
        <div style={{fontWeight: 400}}>© 2022 / Todos los derechos reservados</div>
      </div>
    </footer>
  );
};

export default Footer;
