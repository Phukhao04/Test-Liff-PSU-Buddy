import axios from 'axios';
import { backUrl } from './config';

export default axios.create({ baseURL: backUrl });
