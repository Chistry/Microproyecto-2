import './homepage.css';
import { useUser } from '../../user';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage() {

    const usuario = useUser();
    const navegar = useNavigate();

    useEffect(() =>{
        if (!usuario) {
          navegar('/login', {replace: true})
        }
      }, [usuario, navegar]);

    return (
        <div className="homepage">
            <h1>🕹️ Infinity Pixels 👾</h1>
            <h2>¡Explora y únete a nuestros clubs de videojuegos!</h2>	
            <div className="club-section">
                <button className="club1" onClick={() => navegar('/club1', {replace: true})}>
                    <h2>Club de Aventureros</h2>
                    <p>Explora lugares misteriosos y descubre tesoros ocultos con otros entusiastas de la aventura.</p>
                </button>
                <button className="club2" onClick={() => navegar('/club2', {replace: true})}>
                    <h2>Club de Estrategia</h2>
                    <p>Reúnete con estrategas brillantes para debatir tácticas, resolver enigmas y conquistar mundos virtuales.</p>
                </button>
                <button className="club3" onClick={() => navegar('/club3', {replace: true})}>
                    <h2>Club de Constructores</h2>
                    <p>Comparte tus creaciones en Minecraft, diseña estructuras asombrosas y colabora en proyectos épicos.</p>
                </button>
                <button className="club4" onClick={() => navegar('/club4', {replace: true})}>
                    <h2>Club de Fútbol Virtual</h2>
                    <p>Forma parte de un equipo virtual, compite en torneos y demuestra tus habilidades en FIFA.</p>
                </button>
                <button className="club5" onClick={() => navegar('/club5', {replace: true})}>
                    <h2>Club de Cazadores de Zombis</h2>
                    <p>Únete a otros supervivientes en la lucha contra hordas de no muertos en juegos como Left 4 Dead o Resident Evil.</p>
                </button>
            </div>
        </div>
    );
}

export default HomePage;

