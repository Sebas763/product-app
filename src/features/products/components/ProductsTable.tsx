import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../models/response/Product";
import { deleteProduct, getProducts } from "../services/ProductService";
import { Trash2 } from "lucide-react";
 
export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
 
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
 
  const handleDelete = async (productResourceId: string) => {
    const confirmed = window.confirm(
      "¿Está seguro de que desea eliminar este producto?",
    );
 
    if (!confirmed) return;
 
    setDeletingId(productResourceId);
    setError(null);
 
    try {
      await deleteProduct(productResourceId);
 
      // Actualizar la tabla sin recargar la página
      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.productResourceId !== productResourceId,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el producto",
      );
    } finally {
      setDeletingId(null);
    }
  };
 
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
                <th>Product Resourse ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
 
            <tbody>
              {products.map((product) => (
                <tr key={product.productResourceId}>
                  <td>{product.productResourceId}</td>
                  <td className="px-6 py-4 font-medium">
                    <Link
                      to={`/products/${product.productResourceId}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {product.name}
                    </Link>
                  </td>
 
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(product.productResourceId)}
                      disabled={deletingId !== null}
                      title={`Eliminar ${product.name}`}
                      aria-label={`Eliminar ${product.name}`}
                      className="rounded-lg p-2.5 text-red-600 transition-colors focus-visible:outline-2 focus-visible:outline-red-600
                                 hover:bg-red-50
                                 disabled:cursor-not-allowed
                                 disabled:opacity-50"
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}