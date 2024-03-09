import { auth, db } from './firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export async function Logearse(email, password) {
    try{
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        console.log(user)
        return user;
    } catch (e) {
        return null;
    }
}

export async function validarInicioSesion(email) {
    try {
        const q = query(collection(db, 'usuarios'), where('email', '==', email));
        console.log(q)
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

export async function LogearseConGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      return user;
    } catch (e) {
      return null;
    }
  }

export async function Registrarse(nombre, apellido, nombreUsuario, email, contraseña, videojuegoPreferido) {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, contraseña);
        await setDoc(doc(db, "usuarios", user.uid), {
            nombre,
            apellido,
            nombreUsuario,
            email,
            videojuegoPreferido
        });
        return user;
    } catch (e) {
        console.error(e)
        return null;
    }
  }

export async function Deslogearse(){
    await signOut(auth);
}