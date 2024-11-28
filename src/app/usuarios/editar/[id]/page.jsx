'use client';
import { useEffect, useRef } from "react";
import axios from "axios";

async function editUser(e, id, nombreRef, usuarioRef, passwordRef) {
    e.preventDefault();
    try {
        const url = `http://localhost:3000/editarUsuario/${id}`;
        const datos = {
            nombre: nombreRef.current.value,
            usuario: usuarioRef.current.value,
            password: passwordRef.current.value
        };
        await axios.put(url, datos);
        console.log("Edición exitosa");
        location.replace("http://localhost:3001/usuarios/mostrar");
    } catch (error) {
        console.error("Error al editar usuario:", error);
    }
}

export default function EditarUsuario({ params }) {
    const nombreRef = useRef(null);
    const usuarioRef = useRef(null);
    const passwordRef = useRef(null);
    const { id } = params;

    useEffect(() => {
        async function fetchUser() {
            if (id) {
                try {
                    const url = `http://localhost:3000/buscarPorId/${id}`;
                    const response = await axios.get(url);
                    const data = response.data;

                    // Asignar valores solo si existen datos
                    if (data) {
                        if (nombreRef.current) nombreRef.current.value = data.nombre;
                        if (usuarioRef.current) usuarioRef.current.value = data.usuario;
                        if (passwordRef.current) passwordRef.current.value = data.password;
                    }
                } catch (error) {
                    console.error("Error al obtener usuario:", error);
                }
            }
        }

        fetchUser();
    }, [id]);

    return (
        <div className="m-0 row justify-content-center">
            <form 
                className="col-6 mt-5 text-center" 
                onSubmit={(e) => editUser(e, id, nombreRef, usuarioRef, passwordRef)} // Enviar `refs` a `editUser`
                action="" 
                method="post"
            >
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input 
                            ref={nombreRef} 
                            placeholder="Nombre" 
                            className="form-control mb-3" 
                            type="text" 
                        />
                        <input 
                            ref={usuarioRef} 
                            placeholder="Usuario" 
                            className="form-control mb-3" 
                            type="text" 
                        />
                        <input 
                            ref={passwordRef} 
                            placeholder="Password" 
                            className="form-control mb-3" 
                            type="text" 
                        />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar cambios</button>
                    </div>
                </div>
            </form>
        </div>
    );
}