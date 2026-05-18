import './style.css'
import { getWeatherData } from './components/logic';
import { userRequest } from './components/ui';

userRequest(getWeatherData);


