'use client';
import { useEffect, useState } from "react"; // Importa useEffect y useState
import axios from "axios";
import '../../../../components/EditarVenta.css'; // Ruta al archivo CSS

async function editVenta(e, id, usuarioId, productoId, cantidad) {
    e.preventDefault(); // Evita la acción predeterminada del formulario

    // Verificar que los IDs de usuario y producto no sean vacíos
    if (!usuarioId || !productoId) {
        alert("Debe seleccionar un usuario y un producto.");
        return;
    }

    const url = `http://localhost:3000/ventas/editarVenta/${id}`; // URL para editar la venta
    const datos = {
        cantidad: cantidad, // Utilizamos la cantidad del estado
        idUsuario: usuarioId, // ID del usuario seleccionado
        idProducto: productoId // ID del producto seleccionado
    };

    // Enviar la solicitud PATCH al backend para editar la venta
    try {
        const response = await axios.patch(url, datos); // Usar PATCH para editar
        alert(response.data.message); // Mensaje del backend
        location.replace("http://localhost:3001/ventas/mostrar"); // Redirigir después de guardar
    } catch (error) {
        console.error("Error al actualizar la venta:", error);
        alert("Hubo un error al actualizar la venta.");
    }
}

export default function EditarVenta({ params }) {
    const [usuarioId, setUsuarioId] = useState(""); // Estado para el ID de usuario
    const [productoId, setProductoId] = useState(""); // Estado para el ID de producto
    const [usuarioNombre, setUsuarioNombre] = useState(""); // Estado para el nombre del usuario
    const [productoNombre, setProductoNombre] = useState(""); // Estado para el nombre del producto
    const [usuarios, setUsuarios] = useState([]); // Estado para la lista de usuarios
    const [productos, setProductos] = useState([]); // Estado para la lista de productos
    const [cantidad, setCantidad] = useState(""); // Estado para la cantidad
    const [filteredUsuarios, setFilteredUsuarios] = useState([]); // Estado para los usuarios filtrados
    const [filteredProductos, setFilteredProductos] = useState([]); // Estado para los productos filtrados
    const id = params?.id; // Usa el operador de encadenamiento opcional

    useEffect(() => {
        async function fetchVenta() {
            if (id) {
                const url = `http://localhost:3000/ventas/buscarPorId/${id}`;
                try {
                    const response = await axios.get(url);
                    console.log(response.data); // Verifica los datos recibidos

                    // Asignar los valores directamente a los estados
                    setCantidad(response.data.cantidad); // Asigna la cantidad al estado
                    setUsuarioId(response.data.idUsuario); // Asigna el ID del usuario
                    setProductoId(response.data.idProducto); // Asigna el ID del producto

                    // Obtén los nombres de usuario y producto correspondientes
                    setUsuarioNombre(response.data.usuarioNombre); 
                    setProductoNombre(response.data.productoNombre); 
                } catch (error) {
                    console.error("Error al recuperar los datos de la venta:", error);
                }
            }
        }
        fetchVenta();

        // Obtener usuarios y productos para el autocompletado
        async function fetchUsuariosProductos() {
            try {
                const usuariosRes = await axios.get("http://localhost:3000/"); // URL para obtener usuarios
                const productosRes = await axios.get("http://localhost:3000/productos"); // URL para obtener productos
                setUsuarios(usuariosRes.data); // Asigna la lista de usuarios
                setProductos(productosRes.data); // Asigna la lista de productos
            } catch (error) {
                console.error("Error al obtener usuarios o productos:", error);
            }
        }

        fetchUsuariosProductos();
    }, [id]);

    // Filtrar usuarios por el texto ingresado
    const handleUsuarioChange = (e) => {
        const value = e.target.value;
        setUsuarioNombre(value); // Actualiza el estado del nombre de usuario
        setFilteredUsuarios(
            usuarios.filter(usuario =>
                usuario.nombre.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    // Filtrar productos por el texto ingresado
    const handleProductoChange = (e) => {
        const value = e.target.value;
        setProductoNombre(value); // Actualiza el estado del nombre del producto
        setFilteredProductos(
            productos.filter(producto =>
                producto.nombre.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    // Seleccionar un usuario de la lista filtrada
    const handleSelectUsuario = (usuario) => {
        setUsuarioId(usuario.id); // Establecer el ID de usuario
        setUsuarioNombre(usuario.nombre); // Establecer el nombre de usuario
        setFilteredUsuarios([]); // Cierra la lista de sugerencias
    };

    // Seleccionar un producto de la lista filtrada
    const handleSelectProducto = (producto) => {
        setProductoId(producto.id); // Establecer el ID del producto
        setProductoNombre(producto.nombre); // Establecer el nombre del producto
        setFilteredProductos([]); // Cierra la lista de sugerencias
    };

    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={(e) => editVenta(e, id, usuarioId, productoId, cantidad)} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Editar Venta</h1>
                        </div>
                        <div className="card-body">
                            {/* ID Usuario */}
                            <div className="autocomplete">
                                <input
                                    placeholder="Buscar Usuario"
                                    className="form-control mb-3"
                                    type="text"
                                    value={usuarioNombre} // Vinculando el estado del nombre
                                    onChange={handleUsuarioChange} // Actualizando el estado de nombre
                                    required // Campo requerido
                                />
                                {/* Lista de usuarios filtrados con autocompletado */}
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
                            
                            {/* ID Producto */}
                            <div className="autocomplete">
                                <input
                                    placeholder="Buscar Producto"
                                    className="form-control mb-3"
                                    type="text"
                                    value={productoNombre} // Vinculando el estado del nombre
                                    onChange={handleProductoChange} // Actualizando el estado de nombre
                                    required // Campo requerido
                                />
                                {/* Lista de productos filtrados con autocompletado */}
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

                            {/* Cantidad */}
                            <input
                                id="cantidad"
                                placeholder="Cantidad Vendida"
                                className="form-control mb-3"
                                type="text" // Mantener cantidad como texto
                                value={cantidad} // Vincula el valor al estado de cantidad
                                onChange={(e) => setCantidad(e.target.value)} // Actualiza el estado de cantidad
                            />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}