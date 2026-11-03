import { useEffect, useState } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import { Loader2, UsersRound, UserRound, Trash2 } from "lucide-react";
import type { User } from "../models/response/User";
import { deleteUser, getUsers } from "../services/UserService";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al obtener los usuarios",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (userResourceId: string) => {
    const confirmed = window.confirm(
      "¿Está seguro de que desea eliminar este usuario?",
    );

    if (!confirmed) return;

    setDeletingId(userResourceId);
    setError(null);

    try {
      await deleteUser(userResourceId);

      // Actualizar la tabla sin recargar la página
      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.userResourceId !== userResourceId,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el usuario",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <h2 className="font-semibold text-zinc-50">Lista de usuarios</h2>
        {!isLoading && !error && (
          <span className="animate-fade rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
            {users.length} {users.length === 1 ? "usuario" : "usuarios"}
          </span>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="animate-fade m-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <div role="status" aria-label="Cargando usuarios" className="divide-y divide-zinc-800">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-4">
              <div className="size-9 animate-pulse rounded-lg bg-zinc-800" />
              <div
                className="h-3.5 animate-pulse rounded-full bg-zinc-800"
                style={{ width: `${30 + ((i * 17) % 30)}%` }}
              />
            </div>
          ))}
        </div>
      ) : !error && users.length === 0 ? (
        <div className="animate-fade flex flex-col items-center px-6 py-16 text-center">
          <UsersRound
            size={40}
            className="text-zinc-600"
            aria-hidden="true"
          />
          <p className="mt-3 font-medium text-zinc-50">
            Todavía no hay usuarios
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Agrega el primero para empezar.
          </p>
        </div>
      ) : (
        !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950/60 text-xs uppercase tracking-wider text-zinc-400">
                <tr>
                  <th scope="col" className="w-16 px-6 py-3 font-medium">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="hidden px-6 py-3 font-medium sm:table-cell"
                  >
                    Correo
                  </th>
                  <th
                    scope="col"
                    className="hidden px-6 py-3 font-medium lg:table-cell"
                  >
                    User Resource ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-right font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {users.map((user, index) => (
                  <tr
                    key={user.userResourceId}
                    style={{ "--i": index } as React.CSSProperties}
                    className="group animate-stagger transition-colors duration-150 hover:bg-emerald-500/5"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                      #{user.userId}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/users/${user.userResourceId}`}
                        className="pressable flex w-fit items-center gap-3 rounded-lg font-medium text-zinc-50 group-hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400">
                          <UserRound size={18} aria-hidden="true" />
                        </span>
                        {user.name}
                      </Link>
                    </td>
                    <td className="hidden px-6 py-4 text-zinc-400 sm:table-cell">
                      {user.email}
                    </td>
                    <td className="hidden px-6 py-4 font-mono text-xs text-zinc-500 lg:table-cell">
                      {user.userResourceId}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(user.userResourceId)}
                        disabled={deletingId !== null}
                        title={`Eliminar ${user.name}`}
                        aria-label={`Eliminar ${user.name}`}
                        className="pressable rounded-lg p-2.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {deletingId === user.userResourceId ? (
                          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                        ) : (
                          <Trash2 size={18} aria-hidden="true" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
