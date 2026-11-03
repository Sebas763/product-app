import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Detalle del producto
        </h2>
 
        {isLoading && <p className="text-gray-500">Cargando producto...</p>}
 
        {error && (
          <p role="alert" className="text-red-600">
            {error}
          </p>
        )}
 
        {!isLoading && !error && product && (
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Product Resource ID
              </label>
 
              <p className="mt-1 break-all rounded-lg bg-gray-100 p-3 text-sm text-gray-800">
                {product.productResourceId}
              </p>
            </div>
 
            <div>
              <label className="text-sm font-medium text-gray-500">
                Nombre del producto
              </label>
 
              <p className="mt-1 rounded-lg bg-gray-100 p-3 text-gray-800">
                {product.name}
              </p>
            </div>
          </div>
        )}
 
        <div className="mt-8 flex justify-end">
          <Link
            to="/products"
            className="rounded-lg bg-slate-800 px-5 py-2 text-white hover:bg-slate-700"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    </div>
  );
}