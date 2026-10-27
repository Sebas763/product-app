import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div>
        <p>
          &copy; {new Date().getFullYear()} ProductHub. Todos los derechos
          reservados.
        </p>

        <p>Tu catálogo, en un solo lugar.</p>
      </div>
    </footer>
  );
};

export default Footer;