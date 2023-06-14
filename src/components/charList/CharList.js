import './charList.scss';
import {useState, useEffect, useRef, useMemo} from 'react';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const {getAllCharacters, process, setProcess} = useMarvelService();

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

  /* window.addEventListener('scroll', ()=> this.onScroll()) */

/* conponentWillUnmount(){
  window.removeEventListener('scroll', ()=> this.onScroll())
} */

const onRequest = (offset, initial) =>{
  initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'))

}
const onCharListLoaded = (newCharList) => {
  let ended = false;
  if(newCharList.length < 9){
    ended = true;
  }
  setCharList((charList) => [...charList, ...newCharList]);
  setOffset((offset) => offset + 9);
  setNewItemLoading(false);
  setCharEnded(ended);
}


/* onScroll = () =>{
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 3) {
    this.onRequest(this.state.offset);
  }
} */
const setItems = useRef([])

const onFocusChange = (id) =>{
  setItems.current.forEach(item => item.classList.remove('char__item_selected'));
  setItems.current[id].classList.add('char__item_selected');
  setItems.current[id].focus();
}
function renderItems (arr) {
  const items =  arr.map((item, i) => {
      let imgStyle = {'objectFit' : 'cover'};
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
          imgStyle = {'objectFit' : 'unset'};
      }
      
      return (
          <li 
              className="char__item"
              onClick={() => {props.charId(item.id);
              onFocusChange(i)}}
              tabIndex={0}
              ref={(el => setItems.current[i] = el)}
              key={item.id}
              onKeyPress = {(e) =>{
               if (e.key === ' ' || e.key === 'Enter') {
                 props.charId(item.id);
                 onFocusChange(i);
               }
              }}>
                  <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                  <div className="char__name">{item.name}</div>
          </li>
      )
  });
  
  return (
      <ul className="char__grid">
          {items}
      </ul>
  )
}

    /* const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null; */
    /* const content = !(loading || error) ? items : null; */
const elements = useMemo(() =>{
 return setContent(process, () => renderItems(charList), newItemLoading)
 // eslint-disable-next-line
}, [process])
    return (
        <div className="char__list">
          {elements}
            {/* {errorMessage}
            {spinner} */}
            {/* {content} */}
            {/* {items} */}
            <button onClick={() => onRequest(offset)} 
                    className="button button__main button__long"
                    disabled ={newItemLoading}
                    style = {{'display': charEnded ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
    
CharList.propTypes = {
  charId: PropTypes.func.isRequired
}

export default CharList;