import {lazy, Suspense} from 'react';
import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import SingleCharacterPage from '../pages/SingleCharacterPage';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
 
    return (
      <Router>
      
       <div className="app">
          <AppHeader/>
          <main>
         <Suspense fallback = {<Spinner/>}>
         <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/Comic" element={<ComicsPage/>}/>
            <Route path="*" element={<Page404/>}/>
            <Route path="/Comic/:comicId" element={<SingleComicPage/>}/>
            <Route path="/characters/:id" element={<SingleCharacterPage/>}/>
          </Routes> 
         </Suspense>
          </main>
          </div>
       
      </Router>
  )
  }
    

export default App;

