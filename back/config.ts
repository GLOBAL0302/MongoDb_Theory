import path from "path";
import {CorsOptions} from 'cors';

const rootPath = __dirname;

const whitelist = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
    origin:(origin, callback)=>{
        if(!origin || whitelist.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(null, true);
        }
    }
}


const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    corsOptions,
}


export default config;