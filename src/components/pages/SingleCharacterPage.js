import avenger from '../../resources/img/Avengers.png';
import logo from '../../resources/img/Avengers_logo.png';
import './singleCharacterPage.scss';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import setContent from '../utils/setContent';
import { Helmet } from 'react-helmet';
const SingleCharacterPage = () =>{
const {id} = useParams();
const {getCharacter, setProcess, process} = useMarvelService();
const[charInfo, setCharInfoId] = useState(null);

useEffect(() =>{
  onUpdate(id)
  //eslint-disable-next-line
},[id])

const onUpdate = (info)=>{
  getCharacter(info)
  .then(setChar)
  .then(() => setProcess('confirmed'))

}
const setChar = (info) =>{
  setCharInfoId(info)
}

return(
  <>
  <header className="character-page">
    <div className="character-page__wrapavanger">
      <img src={avenger} alt="Avenger" />
    </div>
    <div className="character-page__textwrap">
    New comics every week! <br/>
    Stay tuned!
    </div>
    <div className="character-page__wraplogo">
      <img src={logo} alt="Avenger-logo" />
    </div>
  </header>

    {setContent(process, View, charInfo)}
  </>
)
}

const View = ({data}) =>{
  const {name, thumbnail, description} = data;

  return(
    <div className="character-page__wrapper">
      <Helmet>
    <meta
      name="description"
      content="Marvel character page"
    />
    <title>  {`Single ${name} page`} </title>
    </Helmet>
    <div className="character-page__thubnailwrap">
      <img src={thumbnail} alt={name} />
    </div>
    <div className="charactter-page__textwrap">
      <div className="character-page__title">{name}</div>
      <div className="character-page__description">{description}</div>
    </div>
    
  </div>
  )
}
export default SingleCharacterPage;