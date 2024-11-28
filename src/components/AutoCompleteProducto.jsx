'use client';
import React, { useState } from "react";
import axios from "axios";

const AutocompleteProducto = ({ onProductoSelect }) => {
    const [query, setQuery] = useState("");
    const [productos, setProductos] = useState([]);

    const buscarProductos = async (q) => {
        setQuery(q);
        if (q.trim() === "") {
            setProductos([]);
            return;
        }
        try {
            const { data } = await axios.get(`http://localhost:3000/productos/buscar?query=${q}`); // Cambiado a "query"
            setProductos(data);
        } catch (error) {
            console.error("Error al buscar productos:", error);
        }
    };

    return (
        <div className="mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar producto"
                value={query}
                onChange={(e) => buscarProductos(e.target.value)}
            />
            {productos.length > 0 && (
                <ul className="list-group">
                    {productos.map((producto) => (
                        <li
                            key={producto.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => {
                                onProductoSelect(producto);
                                setQuery(producto.nombre); // Actualizar el input con el nombre del producto seleccionado
                                setProductos([]); // Limpiar sugerencias
                            }}
                        >
                            {producto.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteProducto;