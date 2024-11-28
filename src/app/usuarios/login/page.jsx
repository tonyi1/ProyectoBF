'use client';
const axios = require("axios");

async function validarLogin(e){
    e.preventDefault();
    const url ="http://localhost:3000/login";
    const datos={
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value
    }
    const usuario = await axios.post(url,datos);
    console.log(usuario.data);

}

export default function Login() {
    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={validarLogin} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Login</h1>
                        </div>
                        <div className="card-body">
                            <input id="usuario" placeholder="Usuario" autoFocus className="form-control mb-3" type="text" />
                            <input id="password" placeholder="Password" className="form-control mb-3" type="text" />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar usuario</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}