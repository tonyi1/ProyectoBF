"use client"
import Link from "next/link";

export default function EditarUsuario({ id }) {
    return (
        <Link href={`/usuarios/editar/${id}`}>
            Editar
        </Link>
    );
}

