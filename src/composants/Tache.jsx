import './Tache.scss';
import { formaterDate } from '../code/helper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function Tache({textTache, dateModif}) {
  return (
    <div className="Tache">
      <CheckCircleIcon />
      <span className="texte">{textTache}</span>
      <span className="date">{formaterDate(dateModif.seconds)}</span>
      <RemoveCircleIcon />
    </div>
  );
}