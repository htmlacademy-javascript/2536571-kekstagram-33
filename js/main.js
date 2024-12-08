import {generatePhotoByTemplate,showFilters} from './render-mini-photos';
import {errorMessageGet} from './messages';
import { getData } from './api';
import {filterPhotoByDefault,filterPhotoByRandom,filterPhotoByLikes } from './filters-posts'

const photosData = await getData(errorMessageGet);
if (photosData){
  generatePhotoByTemplate(photosData);
  showFilters();
  filterPhotoByDefault(photosData);
}

export{photosData}
