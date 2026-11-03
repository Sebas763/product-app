const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
