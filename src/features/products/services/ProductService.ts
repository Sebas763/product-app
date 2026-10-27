import type { Product } from '../models/response/Product';
import { config } from '../../../config';

const API_URL = `${config.api.url}/api/products`;

export async function getProducts(): Promise<Product[]> {
  //Significa que la función promete devolver una lista de productos.
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en productService:", error);
    throw error;
  }
}