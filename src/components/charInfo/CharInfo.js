import './charInfo.scss';
import {useState, useEffect} from 'react';
import setContent from '../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';


 const CharInfo = (props) => {
  const [charId, setCharId] = useState(null);
  
  const {getCharacter, clearError, process, setProcess} =  useMarvelService();

  useEffect(() => {
    CharInfoUpdate();
    //eslint-disable-next-line
  }, [props.charIdRes])
 

  const CharInfoUpdate = () =>{
    if(!props.charIdRes){
      return
    }
    clearError();
         getCharacter(props.charIdRes)
        .then(setCharInfoId)
        .then(() => setProcess('confirmed'))
  }

  const setCharInfoId = (charId) =>{
    setCharId(charId);
  }
 
   /* const skeleton = charId || error || loading ? null : <Skeleton/>;
   const fail = error ? <ErrorMessage/> : null;
   const spinner = loading ? <Spinner/> : null;
   const content = !(error || loading || !charId) ? <View charId = {charId}/> : null; */
   
    return (
       <div className="char__info">
         {setContent(process, View, charId)}
         {/* {fail}
         {spinner}
         {content} */}
      </div>
        
  )
  } 

const View = ({data}) => {
const {name, description, thumbnail, comics, homepage, wiki} = data;
const comic = comics.map((elem, i) =>{
  /* eslint-disable-next-line */
  if (i > 9) return
  
  return (
    <li key={i} className="char__comics-item">
    {elem.name}
   </li>
  )
})

const imageStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : {objectFit: 'cover'} ;

return(
  <>
     <div className="char__basics">
              <img style={imageStyle} src={thumbnail} alt={name}/>
              <div>
                  <div className="char__info-name">{name}</div>
                  <div className="char__btns">
                      <a href={homepage} className="button button__main">
                          <div className="inner">homepage</div>
                      </a>
                      <a href={wiki} className="button button__secondary">
                          <div className="inner">Wiki</div>
                      </a>
                  </div>
              </div>
          </div>
          <div className="char__descr">
              {description}
          </div>
          <div className="char__comics">Comics:</div>
          <ul className="char__comics-list">
            {comics.length === 0 ? 'The character has no comics' : null}
            {comic}
            
          </ul>
  </>
)

}

CharInfo.propTypes = {
  charIdRes: PropTypes.number
}

export default CharInfo; 