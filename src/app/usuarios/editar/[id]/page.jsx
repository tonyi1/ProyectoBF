"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditarUsuario() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Obtiene el ID del usuario desde la URL
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    // Cargar los datos actuales del usuario cuando se monta el componente
    useEffect(() => {
        async function obtenerUsuario() {
            try {
                const { data } = await axios.get(`http://localhost:3000/usuarios/${id}`);
                setNombre(data.nombre);
                setUsuario(data.usuario);
                // No es seguro mostrar la contraseña, así que no la seteamos aquí
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        }

        if (id) {
            obtenerUsuario();
        }
    }, [id]);

    // Función para manejar la actualización del usuario
    async function actualizarUsuario(event) {
        event.preventDefault();

        try {
            const url = `http://localhost:3000/editarUsuario/${id}`;
            await axios.put(url, { nombre, usuario, password });
            router.push("/usuarios/mostrar");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    }

    return (
        <form onSubmit={actualizarUsuario}>
            <div>
                <label>Nombre:</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Usuario:</label>
                <input 
                    type="text" 
                    value={usuario} 
                    onChange={(e) => setUsuario(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Actualizar</button>
        </form>
    );
}
