import Router from './views/Router';
import reportWebVitals from './reportWebVitals';
import { initReactRedux } from './init/reactRedux';
import reducers from './reducers';
import exportToWindow from './providers/exportToWindow';
import diagramChange from './providers/diagramChange';
// import debug from './providers/debug';

const providers = [
    exportToWindow,
    diagramChange,
    // debug,
];
initReactRedux(providers, '/', document.getElementById('root'), Router, reducers)

reportWebVitals();
