import BorrarUsuario from "@/components/borrar";
import axios from "axios";
import EditarUsuario from "../editar/page";

async function getUsuarios(){
    const url="http://localhost:3000";
   const usuarios=await axios.get(url);
   //console.log(universidades.data);
//return universidades.data;
return usuarios.data;
}
//noticias();
export default async function Uni() {
  const usuarios=await getUsuarios();
    return(
        <>
        console.log({process.env.BASE_URL});
            <h1>Usuarios</h1>
            <p>Estas en usuarios</p>
            <table className="table">
<thead>
<tr>
   <th>Id</th> 
   <th>Nombre</th> 
   <th>Usuario</th> 
   <th>Editar/Borrar</th>
</tr>
</thead>
<tbody>
{
    usuarios.map((usuario, i)=>(
        <tr key={i}>
            <td>{i+1}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.usuario}</td>
            <td>
<BorrarUsuario id={usuario.id}/>
<EditarUsuario href="">Editar</EditarUsuario>
            </td>
        </tr>
    ))
}
</tbody>

            </table>
        </>
    );
}