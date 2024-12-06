import {generatePhotoByTemplate} from './render-mini-photos';
import {errorMessageGet} from './messages'
import { getData  } from './api';

await getData(generatePhotoByTemplate,errorMessageGet)

