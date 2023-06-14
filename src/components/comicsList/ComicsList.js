import './comicsList.scss';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';


const ComicsList = () => {

  const [comic, setComic] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicEnded, setComicEnded] = useState(false);
  
  const {getAllComic, process, setProcess} = useMarvelService();

  const setContent = (process, Component, newItemLoading ) => {
    switch (process) {
     case 'waiting':
       return <Spinner/>;
     case 'loading':
       return newItemLoading ? <Component/> : <Spinner/>;
     case 'confirmed':
       return <Component/>;   
     case 'error':
       return <ErrorMessage/>;   
     default:
       throw new Error('Unexpected process state');
    }
   }

  useEffect(() =>{
    onRequest(offset, true);
    //eslint-disable-next-line
  },[])

  const onRequest = (offset, initial) =>{
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
     getAllComic(offset)
    .then(onComicLoaded)
    .then(() => setProcess('confirmed'))
  }

  const onComicLoaded = (newComic) =>{
    let ended = false;
    if(newComic.length < 8){
      ended = true;
  }
    setComic(comic => [...comic, ...newComic]);
    setOffset(offset => offset + 8);
    setNewItemLoading(false);
    setComicEnded(ended);
}
  const renderItems = (comic) => {
   const items = comic.map((elem, i) => {
    let imgStyle = {'objectFit' : 'cover'};
      if (elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
          imgStyle = {'objectFit' : 'unset'};
      }
     return (
      <li key={i} className="comics__item" style={imgStyle}>
        <Link to={`/comic/${elem.id}`}>
            <img src={elem.thumbnail} alt={elem.title} className="comics__item-img"/>
            <div className="comics__item-name">{elem.title}</div>
            <div className="comics__item-price">{elem.price}</div>
        </Link>
      </li>
     )
    })

    return(
      <ul className="comics__grid"> 
      {items}
      </ul>
    )
  }
  /* const content = renderItems(comic);
  const spinner = loading && !newItemLoading ? <Spinner/> : null;
  const fail = error ? <ErrorMessage/> : null; */

  return (
    <div className="comics__list">  
    {setContent(process, () => renderItems(comic), newItemLoading)}        
           {/*  {content}
            {spinner}
            {fail}  */}      
        <button onClick={() => onRequest(offset)} 
                className="button button__main button__long"
                tabIndex={0}
                style = {{'display': comicEnded ? 'none' : 'block'}}
                disabled ={newItemLoading}
                >
            <div className="inner">load more</div>
        </button>
    </div>
  )
}

export default ComicsList;