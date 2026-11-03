import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex max-w-lg flex-col items-center py-16 text-center"
    >
      <span
        aria-hidden="true"
        className="animate-card text-8xl font-black tracking-tighter text-emerald-500/20"
      >
        404
      </span>

      <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
        Error 404 · Fuera de ruta
      </p>

      <h1
        id="not-found-title"
        className="mt-3 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
      >
        Esta página no existe
      </h1>

      <p className="mt-4 text-zinc-400">
        La dirección puede haber cambiado o estar escrita incorrectamente.
        Vuelve al catálogo para seguir revisando tus productos.
      </p>

      <Link
        to="/products"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white pressable hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
      >
        Volver a productos <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </section>
  );
};

export default NotFound;
