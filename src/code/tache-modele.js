import { bdFirestore } from "./init";
import { getDocs, collection, addDoc, Timestamp, getDoc } from "firebase/firestore";

/**
 * Obtenir toutes les taches d'un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecté
 * @returns {Promise<any[]>} Promesse avec le tableau des taches lorsque complétée
 */
export async function lireTout(idUtilisateur) {
    return getDocs(collection(bdFirestore, 'memo', idUtilisateur, 'taches')).then(
        res => res.docs.map(doc => ({id: doc.id, ...doc.data()}))
    );
}

/**
 * Ajouter uen tache pour un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecté
 * @param {object} tache Objet représentant la tache à ajouter 
 * @returns 
 */
export async function creer(idUtilisateur, tache) {
    // On ajoute dateModif à l'objet tache
    // Remarquez que nous utilisons l'objet Timestamp de Firestore pour obtenir
    // un objet date contenant le temps au serveur...
    tache.dateModif = Timestamp.now();
    // Référence à la collection dans laquelle on veut ajouter la tache
    let coll = collection(bdFirestore, 'memo', idUtilisateur, 'taches');
    // Ajout de la tache avec addDoc : retourne une promesse contenant une 
    // "référence" Firestore au document ajouté
    let refDoc = await addDoc(coll, tache);
    // On utilise la référence pour obtenir l'objet représentant le document
    // ajouté grâce à la fonction getDoc (au singulier !) : cette fonction retourne
    // une promesse, d'où l'utilisation de 'await'...
    return await getDoc(refDoc);
}