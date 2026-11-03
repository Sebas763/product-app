import { useState } from "react";
 
import { Link, useNavigate } from "react-router-dom";
 
import { createUser } from "../services/UserService";
import type { NewUser } from "../models/request/User";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
 
// Datos que maneja el formulario
type UserFormValues = {
  name: string;
  email: string;
};
 
export default function CreateUser() {
  const navigate = useNavigate();
 
  const [serverError, setServerError] = useState<string | null>(null);
 
  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      email: "",
    },
  });
 
  // Se ejecuta cuando el usuario presiona Guardar
  const onSubmit = async (data: UserFormValues) => {
    setServerError(null);
 
    // Construimos el request que espera el backend C#
    const request: NewUser = {
      userResourceId: crypto.randomUUID(),
      name: data.name.trim(),
      email: data.email.trim(),
    };
 
    try {
      // Llamamos al servicio que ejecuta el POST
      await createUser(request);
 
      // Regresamos al listado si se guardó correctamente
      navigate("/users");
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Error al registrar el usuario",
      );
    }
  };
 
  return (
    <div className="mx-auto max-w-xl">
      <Link to="/users" className="mb-6 inline-flex rounded-md text-sm font-medium text-emerald-300 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-emerald-400">← Volver a usuarios</Link>
      <div className="animate-card rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
          Agregar usuario
        </h1>
        <p className="mb-8 mt-2 text-sm leading-6 text-zinc-400">Completa la información para agregar un usuario al sistema.</p>
 
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Nombre */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Nombre
            </label>
 
            <input
              id="name"
              type="text"
              placeholder="Ejemplo: María Rojas"
              {...register("name", {
                required: "El nombre es obligatorio",
                validate: (value) =>
                  value.trim().length >= 2 ||
                  "El nombre debe tener al menos 2 caracteres",
                maxLength: {
                  value: 50,
                  message: "El nombre no puede pasar de 50 caracteres",
                },
              })}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950/60 text-zinc-50 placeholder:text-zinc-500
                         px-4 py-2 outline-none
                         transition-[border-color,box-shadow] duration-150
                         focus:border-emerald-500 focus:ring-4
                         focus:ring-emerald-500/30"
            />
 
            {/* Mensaje de validación */}
            {errors.name && (
              <p id="name-error" role="alert" className="animate-fade mt-2 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>
 
          {/* Correo electrónico */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Correo electrónico
            </label>
 
            <input
              id="email"
              type="email"
              placeholder="Ejemplo: maria.rojas@correo.com"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Escribe un correo válido",
                },
                maxLength: {
                  value: 100,
                  message: "El correo no puede pasar de 100 caracteres",
                },
              })}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950/60 text-zinc-50 placeholder:text-zinc-500
                         px-4 py-2 outline-none
                         transition-[border-color,box-shadow] duration-150
                         focus:border-emerald-500 focus:ring-4
                         focus:ring-emerald-500/30"
            />
 
            {/* Mensaje de validación */}
            {errors.email && (
              <p id="email-error" role="alert" className="animate-fade mt-2 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
 
          {/* Error devuelto por el servicio */}
          {serverError && (
            <p
              role="alert"
              className="animate-fade rounded-lg bg-red-500/10 p-3 text-sm text-red-400"
            >
              {serverError}
            </p>
          )}
 
          {/* Botones */}
          <div className="flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:justify-end">
            <Link
              to="/users"
              className="rounded-xl border border-zinc-700 text-center text-sm font-medium pressable focus-visible:outline-2 focus-visible:outline-emerald-400
                         px-5 py-2 text-zinc-300
                         hover:bg-zinc-800"
            >
              Cancelar
            </Link>
 
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm pressable focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400
                         font-medium text-white
                         hover:bg-emerald-700
                         disabled:cursor-not-allowed
                         disabled:opacity-50"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {isSubmitting && (
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                )}
                {isSubmitting ? "Guardando..." : "Guardar usuario"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}