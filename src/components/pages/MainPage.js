import {useState} from 'react';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {Helmet} from 'react-helmet';
import CharacterSearchForm from '../characterSearchForm/CharacterSearchForm';


const MainPage = () =>{

  const [charId, setCharId] = useState(null)

  const onSetCharId = (charId) => {
     setCharId(charId)
   }  
  return(
    <>
    <Helmet>
    <meta
      name="description"
      content="Marvel information portal"
    />
    <title>Marvel information portal</title>
    </Helmet>
    <ErrorBoundary>
    <RandomChar/>
    </ErrorBoundary>
    <div className="char__content">
      <ErrorBoundary>
        <CharList charId = {onSetCharId}/>
      </ErrorBoundary>
      <div>
      <ErrorBoundary>
        <CharInfo charIdRes = {charId}/>
      </ErrorBoundary> 
      
      <ErrorBoundary>
        <CharacterSearchForm/>
      </ErrorBoundary>
      </div>
     
    </div>
   <img className="bg-decoration" src={decoration} alt="vision"/>
   </>
  )
}
export default MainPage;