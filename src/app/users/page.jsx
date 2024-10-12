import axios from "axios";
import Link from "next/link";  // Usamos Link de Next.js para navegación dinámica

async function getUsers() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const usuarios = await axios.get(url);
  return usuarios.data;
}

export default async function Users() {
  const universidades = await getUsers();
  
  return (
    <>
      <h1>Usuarios</h1>
      <p>Estas en Usuarios</p>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            universidades.map((universidad, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {/* Usamos Link y tomamos solo el primer nombre (dividiendo por espacio) */}
                  <Link href={`/users/${universidad.name.split(' ')[0]}`}>
                    {universidad.name}
                  </Link>
                </td>
                <td>{universidad.username}</td>
                <td>{universidad.email}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}
