import { useHttp } from "../components/hooks/http.hooks";

const useMarvelService  = () =>{
const _apiKey = 'apikey=cc870ad11d5b1c6ba492308627064f32';
const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
const _baseOffset = 210;


const { request, clearError, process, setProcess} = useHttp();

const getCharacterByName = async (name) =>{
  const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
  return res.data.results.map(_transformCharacter)
}


const getAllCharacters = async (offset = _baseOffset) =>{
  const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
  return res.data.results.map(_transformCharacter)
}
const getCharacter = async (id) =>{
  const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
  return _transformCharacter(res.data.results[0]);

}
const getAllComic = async (offset = 0) =>{
  const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
  return res.data.results.map(_transformComic)
}
const getComic = async (id) => {
  const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
  return _transformComic(res.data.results[0]);
}
const _transformCharacter = (char) =>{
  return {
    id: char.id,
    name: char.name,
    description: char.description ? `${char.description.slice(0, 210)}...` : 'Character has no description',
    thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items
  }
}

const _transformComic = (comic) =>{
  return {
    id: comic.id,
    title: comic.title,
    language: comic.textObjects.language || 'en-us',
    description: comic.description || 'There is no description',
    pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of pages',
    thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
    price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'not available'
  }
}
return{
  getAllCharacters,
  getCharacter,
  clearError,
  getAllComic,
  getComic,
  process,
  setProcess,
  getCharacterByName
  
}
}
export default useMarvelService;