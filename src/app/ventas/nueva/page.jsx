'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function NuevaVenta() {
    const [usuarioId, setUsuarioId] = useState(""); // Estado para ID de Usuario
    const [productoId, setProductoId] = useState(""); // Estado para ID de Producto
    const [cantidad, setCantidad] = useState(""); // Estado para Cantidad
    const [usuarioNombre, setUsuarioNombre] = useState(""); // Estado para el nombre de usuario
    const [productoNombre, setProductoNombre] = useState(""); // Estado para el nombre de producto
    const [precio, setPrecio] = useState(0); // Estado para el precio del producto
    const [usuarios, setUsuarios] = useState([]); // Estado para lista de usuarios
    const [productos, setProductos] = useState([]); // Estado para lista de productos
    const [filteredUsuarios, setFilteredUsuarios] = useState([]); // Estado para usuarios filtrados
    const [filteredProductos, setFilteredProductos] = useState([]); // Estado para productos filtrados

    // Función para obtener usuarios y productos de la base de datos
    useEffect(() => {
        async function fetchUsuariosProductos() {
            try {
                const usuariosRes = await axios.get("http://localhost:3000/"); // Obtener usuarios
                const productosRes = await axios.get("http://localhost:3000/productos"); // Obtener productos
                setUsuarios(usuariosRes.data); // Asigna lista de usuarios
                setProductos(productosRes.data); // Asigna lista de productos
            } catch (error) {
                console.error("Error al obtener usuarios o productos:", error);
            }
        }

        fetchUsuariosProductos();
    }, []);

    // Función para manejar la selección de usuario
    const handleUsuarioChange = (e) => {
        const value = e.target.value;
        setUsuarioNombre(value);
        setFilteredUsuarios(
            usuarios.filter(usuario =>
                usuario.nombre.toLowerCase().includes(value.toLowerCase()) // Filtra usuarios por nombre
            )
        );
    };

    // Función para manejar la selección de producto
    const handleProductoChange = (e) => {
        const value = e.target.value;
        setProductoNombre(value);
        setFilteredProductos(
            productos.filter(producto =>
                producto.nombre.toLowerCase().includes(value.toLowerCase()) // Filtra productos por nombre
            )
        );
    };

    // Función para seleccionar un usuario de las sugerencias
    const handleSelectUsuario = (usuario) => {
        setUsuarioId(usuario.id); // Establece el ID del usuario
        setUsuarioNombre(usuario.nombre); // Establece el nombre del usuario
        setFilteredUsuarios([]); // Cierra la lista de sugerencias
    };

    // Función para seleccionar un producto de las sugerencias
    const handleSelectProducto = (producto) => {
        setProductoId(producto.id); // Establece el ID del producto
        setProductoNombre(producto.nombre); // Establece el nombre del producto
        setPrecio(producto.precio); // Establece el precio del producto seleccionado
        setFilteredProductos([]); // Cierra la lista de sugerencias
    };

    // Función para calcular el total de la venta (cantidad * precio)
    const calcularTotal = () => {
        return cantidad && precio ? cantidad * precio : 0;
    };

    // Función para enviar la nueva venta
    async function newVenta(e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const url = "http://localhost:3000/ventas/nuevaVenta"; // URL de la API

        // Obteniendo los datos del estado
        const datos = {
            idUsuario: usuarioId, // Enviar el ID de usuario
            idProducto: productoId, // Enviar el ID de producto
            cantidad: cantidad, // Manteniendo como texto
            precio: calcularTotal(), // Enviar el precio total de la venta (calculado)
        };

        try {
            const response = await axios.post(url, datos); // Envía la solicitud POST
            console.log("Venta agregada:", response.data);
            location.replace("http://localhost:3001/ventas/mostrar"); // Redirige después de agregar
        } catch (error) {
            console.error("Error al agregar venta:", error.response.data);
            alert(error.response.data.message || "Error al agregar venta. Intente nuevamente."); // Muestra mensaje de error
        }
    }

    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={newVenta}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Nueva Venta</h1>
                        </div>
                        <div className="card-body">
                            {/* Campo para seleccionar el Usuario */}
                            <div className="autocomplete">
                                <input
                                    placeholder="Buscar Usuario"
                                    className="form-control mb-3"
                                    type="text"
                                    value={usuarioNombre} // Vinculando el estado
                                    onChange={handleUsuarioChange} // Actualizando el estado
                                    required // Campo requerido
                                />
                                {/* Lista de usuarios filtrados */}
                                {usuarioNombre && filteredUsuarios.length > 0 && (
                                    <ul className="list-group">
                                        {filteredUsuarios.map((usuario) => (
                                            <li
                                                key={usuario.id}
                                                className="list-group-item"
                                                onClick={() => handleSelectUsuario(usuario)}
                                            >
                                                {usuario.nombre}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Campo para seleccionar el Producto */}
                            <div className="autocomplete">
                                <input
                                    placeholder="Buscar Producto"
                                    className="form-control mb-3"
                                    type="text"
                                    value={productoNombre} // Vinculando el estado
                                    onChange={handleProductoChange} // Actualizando el estado
                                    required // Campo requerido
                                />
                                {/* Lista de productos filtrados */}
                                {productoNombre && filteredProductos.length > 0 && (
                                    <ul className="list-group">
                                        {filteredProductos.map((producto) => (
                                            <li
                                                key={producto.id}
                                                className="list-group-item"
                                                onClick={() => handleSelectProducto(producto)}
                                            >
                                                {producto.nombre}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Campo para ingresar la cantidad */}
                            <input
                                placeholder="Cantidad"
                                className="form-control mb-3"
                                type="text" // Acepta texto
                                value={cantidad} // Vinculando el estado
                                onChange={(e) => setCantidad(e.target.value)} // Actualizando el estado
                                required // Campo requerido
                            />

                            {/* Mostrar el precio total de la venta */}
                            {cantidad && precio && (
                                <div className="mb-3">
                                    <strong>Total de la venta: </strong>${calcularTotal()}
                                </div>
                            )}
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar venta</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}