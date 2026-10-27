import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../models/response/Product";
import { getProducts } from "../services/ProductService";

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al obtener los productos",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h2>Lista de productos</h2>

      {error && (
        <div
          role="alert"
          className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <p
          role="status"
          className="px-6 py-16 text-center text-sm text-slate-500"
        >
          Cargando productos...
        </p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Product Resource ID</th>
                <th>Nombre</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.productResourceId}>
                  <td>{product.productResourceId}</td>
                  <td>{product.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}