import type { User } from "../models/response/User";
import type { NewUser } from "../models/request/User";
import { config } from "../../../config";

const API_URL = `${config.api.url}/api/users`;

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en UserService:", error);
    throw error;
  }
}

export async function getUserById(userResourceId: string): Promise<User> {
  try {
    const response = await fetch(
      `${API_URL}/${encodeURIComponent(userResourceId)}`,
    );

    if (!response.ok) {
      throw new Error(`Error al obtener el usuario: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en UserService:", error);
    throw error;
  }
}

export async function createUser(user: NewUser): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Error al crear el usuario: ${response.status}`);
    }
  } catch (error) {
    console.error("Error en UserService:", error);
    throw error;
  }
}

export async function deleteUser(userResourceId: string): Promise<void> {
  try {
    const response = await fetch(
      `${API_URL}/${encodeURIComponent(userResourceId)}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`Error al eliminar el usuario: ${response.status}`);
    }
  } catch (error) {
    console.error("Error en UserService:", error);
    throw error;
  }
}
