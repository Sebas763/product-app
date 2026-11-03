import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import ProductsTable from "../components/ProductsTable";

const Products = () => {
  return (
    <section aria-labelledby="products-title">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            Administración del catálogo
          </p>
          <h1
            id="products-title"
            className="mt-1 text-3xl font-bold tracking-tight text-zinc-50"
          >
            Productos
          </h1>
          <p className="mt-2 text-zinc-400">
            Consulta, agrega y administra los productos de tu catálogo.
          </p>
        </div>

        <Link
          to="/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm pressable hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          <Plus size={16} aria-hidden="true" />
          Agregar producto
        </Link>
      </div>

      <ProductsTable />
    </section>
  );
};

export default Products;
