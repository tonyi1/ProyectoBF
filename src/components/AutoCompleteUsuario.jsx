'use client';
import React, { useState } from "react";
import axios from "axios";

const AutocompleteUsuario = ({ onUsuarioSelect }) => {
    const [query, setQuery] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    const buscarUsuarios = async (q) => {
        setQuery(q);
        if (q.trim() === "") {
            setUsuarios([]);
            return;
        }
        try {
            const { data } = await axios.get(`http://localhost:3000/buscar?query=${q}`); // Endpoint ajustado para usuarios
            setUsuarios(data);
        } catch (error) {
            console.error("Error al buscar usuarios:", error);
        }
    };

    return (
        <div className="mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar usuario"
                value={query}
                onChange={(e) => buscarUsuarios(e.target.value)}
            />
            {usuarios.length > 0 && (
                <ul className="list-group">
                    {usuarios.map((usuario) => (
                        <li
                            key={usuario.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => {
                                onUsuarioSelect(usuario);
                                setQuery(usuario.nombre); // Actualizar el input con el nombre seleccionado
                                setUsuarios([]); // Limpiar sugerencias
                            }}
                        >
                            {usuario.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteUsuario;