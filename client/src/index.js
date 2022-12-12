import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import WorkerStore from "./store/WorkerStore";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css"
export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            worker:new WorkerStore(),
        }
    }>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);

