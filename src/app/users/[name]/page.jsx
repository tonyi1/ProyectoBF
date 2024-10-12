"use client";

import React, { useState, useEffect } from 'react'; 
import { useParams } from 'next/navigation';
import axios from 'axios';

// Función para obtener el usuario por el primer nombre
async function getUserByFirstName(firstName) {
  const url = `https://jsonplaceholder.typicode.com/users`;
  const response = await axios.get(url);
  // Buscar al usuario por el primer nombre (comparamos solo la primera parte del nombre completo)
  const user = response.data.find(u => u.name.split(' ')[0] === firstName);
  return user;
}

export default function UserDetail() {
  const { name } = useParams();  // Usamos 'name' que representa el primer nombre
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Para mostrar el estado de carga
  const [error, setError] = useState(null);  // Para manejar errores

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const userData = await getUserByFirstName(name);  // Buscar por el primer nombre
        if (userData) {
          setUser(userData);
        } else {
          setError('Usuario no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el usuario');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [name]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Detalles del Usuario: {user.name}</h1>
      <ul>
        <li><strong>id:</strong> {user.id}</li>
        <li><strong>name:</strong> {user.name}</li>
        <li><strong>username:</strong> {user.username}</li>
        <li><strong>email:</strong> {user.email}</li>
        <li><strong>address:</strong></li>
        <ul>
          <li><strong>street:</strong> {user.address.street}</li>
          <li><strong>suite:</strong> {user.address.suite}</li>
          <li><strong>city:</strong> {user.address.city}</li>
          <li><strong>zipcode:</strong> {user.address.zipcode}</li>
          <li><strong>geo:</strong> </li>
          <ul>
          <li><strong>lat:</strong> {user.address.geo.lat}</li>
          <li><strong>lng:</strong> {user.address.geo.lng}</li>
          
        </ul>
        </ul>
        <li><strong>phone</strong> {user.phone}</li>
        <li><strong>website:</strong> {user.website}</li>
        <li><strong>company:</strong> </li>
        <ul>
          <li><strong>name:</strong> {user.company.name}</li>
          <li><strong>catchPhrase</strong> {user.company.catchPhrase}</li>
          <li><strong>bs</strong> {user.company.bs}</li>
        </ul>
      
       
      </ul>
    </>
  );
}



