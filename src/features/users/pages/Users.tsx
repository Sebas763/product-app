import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import UsersTable from "../components/UsersTable";

const Users = () => {
  return (
    <section aria-labelledby="users-title">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            Administración de usuarios
          </p>
          <h1
            id="users-title"
            className="mt-1 text-3xl font-bold tracking-tight text-zinc-50"
          >
            Usuarios
          </h1>
          <p className="mt-2 text-zinc-400">
            Consulta, agrega y administra los usuarios del sistema.
          </p>
        </div>

        <Link
          to="/users/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm pressable hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          <Plus size={16} aria-hidden="true" />
          Agregar usuario
        </Link>
      </div>

      <UsersTable />
    </section>
  );
};

export default Users;
