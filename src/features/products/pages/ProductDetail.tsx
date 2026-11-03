import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBasket } from "lucide-react";
import type { Product } from "../models/response/Product";
import { getProductById } from "../services/ProductService";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("Identificador de producto no válido");
      setIsLoading(false);
      return;
    }

    let active = true;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductById(id);

        if (active) {
          setProduct(data);
        }
      } catch (error) {
        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : "Error al obtener el producto",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="animate-card rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400">
            <ShoppingBasket size={24} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Producto
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
              Detalle del producto
            </h2>
          </div>
        </div>

        {isLoading && (
          <div role="status" aria-label="Cargando producto" className="space-y-5">
            {[0, 1].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-32 animate-pulse rounded-full bg-zinc-800" />
                <div className="h-11 animate-pulse rounded-lg bg-zinc-800" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="animate-fade rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        {!isLoading && !error && product && (
          <dl className="animate-fade space-y-5">
            <div>
              <dt className="text-sm font-medium text-zinc-400">
                Product Resource ID
              </dt>
              <dd className="mt-1.5 break-all rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 font-mono text-sm text-zinc-300">
                {product.productResourceId}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-400">
                Nombre del producto
              </dt>
              <dd className="mt-1.5 rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 font-medium text-zinc-50">
                {product.name}
              </dd>
            </div>
          </dl>
        )}

        <div className="mt-8 flex justify-end border-t border-zinc-800 pt-6">
          <Link
            to="/products"
            className="pressable group inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 focus-visible:outline-2 focus-visible:outline-emerald-400"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 ease-out pointer-fine:group-hover:-translate-x-0.5"
            />
            Volver a productos
          </Link>
        </div>
      </div>
    </div>
  );
}
