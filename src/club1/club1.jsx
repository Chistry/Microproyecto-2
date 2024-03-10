import './club1.css';

const Club1 = () => {
    return (
        <div className="container">
            <div className="image-container">
                <img src="./club1image.jpg" alt="Imagen del club" />
            </div>
            <div className="content-and-image-container">
                <div className="content-container">
                    <h1 className="club-title">Club de Aventureros</h1>
                    <p className="club-description">Únete a un club de videojuegos de aventuras donde explorarás paisajes enigmáticos y desentrañarás secretos ancestrales en emocionantes expediciones virtuales. ¿Listo para una emocionante odisea virtual llena de aventura y descubrimiento?</p>
                    <div className="games-container">
                        <div className="games-section1">
                            <h2>Videojuegos <br /> Disponibles</h2>
                            <ul>
                                <li>The Witcher 3: Wild Hunt</li>
                                <li>The Legend of Zelda: Breath of the Wild</li>
                                <li>Assassins Creed Valhalla</li>
                            </ul>
                        </div>
                        <div className="games-section2">
                            <h2>Videojuegos <br /> Recomendados</h2>
                            <ul>
                                <li>Monster Hunter: World</li>
                                <li>Baldurs Gate 3</li>
                                <li>SEA OF THIEVES</li>
                            </ul>
                        </div>
                    </div>
                    <button className="join-button">¡Unirse!</button>
                </div>
            </div>
            
        </div>
    );
};

export default Club1;
