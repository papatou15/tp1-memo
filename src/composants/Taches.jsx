import Tache from './Tache';
import './Taches.scss';
import { useEffect, useState } from 'react';
import * as tacheModele from '../code/tache-modele';

export default function Taches({localUtilisateur, taches, setTaches}) {

  const [textTaches, setTextTache] = useState('');

  useEffect(
    () => tacheModele.lireTout(localUtilisateur.uid).then(
      lesTaches => setTaches(lesTaches)
    )
    ,
    [localUtilisateur, setTaches]
  );

  function gererAjouterTaches(textTache) {
    //Code pour Firestore
    tacheModele.creer(localUtilisateur.uid, {textTache: textTache}).then(doc => setTextTache([{id: doc.id, ...doc.data()}, ...taches]));
  }

  return (
    <section className="Taches">
      <form onSubmit={e => {gererAjouterTaches(textTaches); e.preventDefault(); setTextTache('');}}>
        <input 
          type="text"   
          placeholder="Ajoutez une tâche ..." 
          name="texteTache"
          autoComplete="off" 
          onChange={e => setTextTache(e.target.value)}
        />
      </form>
      <div className="liste-taches">
        {
          taches.map(tache => <div key={tache.id}><Tache {...tache}/></div>)
        }
      </div>
    </section>
  );
}