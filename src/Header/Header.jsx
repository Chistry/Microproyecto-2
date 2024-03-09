import { useState } from 'react';
import './Header.css'; // Asegúrate de importar tu archivo CSS


// JSON de ejemplo
const juegos = [
    { id: 1, nombre: 'Juego 1' },
    { id: 2, nombre: 'Juego 2' },
    { id: 3, nombre: 'Juego 3' },

];

function Header() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Buscar el juego en la base de datos de Firebase
        const juegoEncontrado = juegos.find(juego => juego.nombre.toLowerCase() === searchTerm.toLowerCase());
        if (juegoEncontrado) {
            console.log('Juego encontrado:', juegoEncontrado);
          // Aquí puedes hacer la lógica para redirigir al usuario al juego encontrado
        } else {
            console.log('Juego no encontrado');
          // Aquí puedes mostrar un mensaje al usuario indicando que el juego no fue encontrado
        }
    };

    return (
        <header className="header">
            <div className="header__left">
                <img src= "/cube-3d-design-element.png" alt="Home" className="header__button" />
            </div>
                <div className="header__middle">
                {/* Buscador */}
                <input
                    type="text"
                    placeholder="Buscar juego..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            <div className="header__right">
                {/* Imagen para ir al perfil del usuario (sustituye "profile.png" por la ruta de tu imagen) */}
                <img src="/profile.png" alt="Perfil" className="header__button" />
            </div>
        </header>
    );
}

export default Header;
