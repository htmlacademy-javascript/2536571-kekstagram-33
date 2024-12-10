import { showFilters } from './render-mini-photos';
import { errorMessageGet,onSuccessGet } from './messages';
import { getData } from './api';
import { filterPhotoByDefault ,getPhotoData} from './filters-posts';

const photosData = await getData(onSuccessGet,errorMessageGet);
if (photosData){
  getPhotoData(photosData);
  showFilters();
  filterPhotoByDefault(photosData);
}

export{ photosData };
