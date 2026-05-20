import './style.css'
import { getWeatherData, inputAutoComplete } from './components/logic';
import { userRequest, setupAutocomplete} from './components/ui';

userRequest(getWeatherData);
setupAutocomplete(inputAutoComplete);

