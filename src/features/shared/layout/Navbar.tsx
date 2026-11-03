import { Link, NavLink } from "react-router-dom";
import { Package, ShoppingBasket, UsersRound } from "lucide-react";

const linkBase =
  "pressable inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-emerald-400";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `${linkBase} ${
    isActive
      ? "bg-emerald-500/10 text-emerald-300"
      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50"
  }`;

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          to="/products"
          className="pressable flex items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-emerald-400"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-emerald-600 text-white">
            <Package size={20} aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-zinc-50">
            Product<span className="text-emerald-400">Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/products" className={linkClass}>
            <ShoppingBasket size={16} aria-hidden="true" />
            Productos
          </NavLink>

          <NavLink to="/users" className={linkClass}>
            <UsersRound size={16} aria-hidden="true" />
            Usuarios
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
