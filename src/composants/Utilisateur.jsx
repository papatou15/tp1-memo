import './Utilisateur.scss';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {deconnexion} from '../code/utilisateur-modele';

export default function Utilisateur({localUtilisateur}) {
  return (
    <div className="Utilisateur">
      <span className="nom">{localUtilisateur.displayName}</span>
      <Avatar className="avatar" alt={localUtilisateur.displayName} src={localUtilisateur.photoURL} />
      
      <Button 
        variant="outlined"
        size="small"
        className="btn-deconnexion"
        onClick={deconnexion}
      >
        Déconnexion
      </Button>
    </div>
  );
}