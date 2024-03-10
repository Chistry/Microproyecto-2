import './homepage.css';

function HomePage() {
    return (
        <div className="homepage">
            <h1>🕹️ VideoClub 👾</h1>
            <div className="club-section">
                <button className="club1">
                    <h2>Club de Aventureros</h2>
                    <p>Explora lugares misteriosos y descubre tesoros ocultos con otros entusiastas de la aventura.</p>
                </button>
                <button className="club2">
                    <h2>Club de Estrategia</h2>
                    <p>Reúnete con estrategas brillantes para debatir tácticas, resolver enigmas y conquistar mundos virtuales.</p>
                </button>
                <button className="club3">
                    <h2>Club de Constructores</h2>
                    <p>Comparte tus creaciones en Minecraft, diseña estructuras asombrosas y colabora en proyectos épicos.</p>
                </button>
                <button className="club4">
                    <h2>Club de Fútbol Virtual</h2>
                    <p>Forma parte de un equipo virtual, compite en torneos y demuestra tus habilidades en FIFA.</p>
                </button>
                <button className="club5">
                    <h2>Club de Cazadores de Zombis</h2>
                    <p>Únete a otros supervivientes en la lucha contra hordas de no muertos en juegos como Left 4 Dead o Resident Evil.</p>
                </button>
            </div>
        </div>
    );
}

export default HomePage;

