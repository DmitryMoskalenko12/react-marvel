import { useState } from "react";
import useMarvelService from "../../services/MarvelService";
import './characterSearchForm.scss';
import {Link} from 'react-router-dom';
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharacterSearchForm = () => {
  const {getCharacterByName} = useMarvelService();
  const [find, setFind] = useState(null);
  const [res, setRes] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

const onRequest = (name) =>{
   setRes('');
   setError(false);
   setLoading(true);
   getCharacterByName(name)
   .then(getFind)
   .catch((e) => setError(e))
   
}

const getFind = (find) =>{
   setRes(find)
   setLoading(false)
}
const fail = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
const result = !res ? null : res.length > 0 ? <div className="char__search-wrapper">
  <div className="char__search-success">There is! Visit {res[0].name} page?</div>
  <Link  to={`/characters/${res[0].id}`} className="button button__secondary">
    <div className="inner"> To page</div>
  </Link>
</div> : <div className="char__search-error">The character was not found. Check the name and try again </div>;


return(
  <div className="char__search-form">
      
          <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
          <div className="char__search-wrapper">
              <input
                  onChange={(e) => setFind(e.target.value)}
                  name='charName' 
                  type='text' 
                  placeholder="Enter name"/>
              <button 
                  className="button button__main"
                  disabled={loading}>
                  <div onClick={(e) => {
                    e.preventDefault();
                    onRequest(find);
                    }} className="inner">find</div>
              </button>
          </div>
          {fail}
          {result}
      
  
</div>
)
}
export default CharacterSearchForm;