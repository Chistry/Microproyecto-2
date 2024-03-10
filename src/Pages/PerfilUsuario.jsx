import { useNavigate } from 'react-router-dom';
import { useUser } from '../user';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function PerfilUsuario(){
    const [datosUsuario, setDatosUsuario] = useState(null);
    const navegar = useNavigate();
    const usuario = useUser();
    console.log(usuario)
    const email = usuario.email

    useEffect(() => {
        if (usuario !== null && usuario !== undefined) {
            const obtenerDatosUsuario = async () => {
                try {
                    const q = query(collection(db, 'usuarios'), where('email', '==', email));
                    console.log(q)
                    const querySnapshot = await getDocs(q);
                    console.log(querySnapshot)
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            setDatosUsuario(doc.data());
                        });
                    } else {
                        console.log('No se encontraron datos para el usuario con email:', email);
                    }
                } catch (error) {
                    console.error('Error al obtener datos del usuario:', error);
                }
            };

            obtenerDatosUsuario();
        }
    }, [usuario, email]);

    if (usuario === undefined) {
        return <p>Cargando...</p>;
    }
    
    if (usuario === null) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h2>Perfil de Usuario</h2>
                <div>
                    <p>Nombre: {datosUsuario.nombre}</p>
                    <p>Apellido: {datosUsuario.apellido}</p>
                    <p>Email: {email}</p>
                    <p>Nombre de Usuario: {datosUsuario.nombreUsuario}</p>
                    <p>Videojuego Preferido: {datosUsuario.videojuegoPreferido}</p>
                </div>
            <button onClick={() => navegar('/register', {replace: true})}>Editar Perfil</button>
        </div>
    );
}