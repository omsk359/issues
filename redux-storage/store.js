let { createStore, applyMiddleware, combineReducers } = Redux;

let myReducer = (state = { arr: [1, 2, 3] }, action) => action.type == 'TEST' ? { arr: [5] } : state;

const engineKey = 'TestKey';

clearStorage = (key = engineKey) => {
    localStorage.removeItem(key);
};

let reducer = combineReducers({ myReducer });

reducer = storage.reducer(reducer);
const engine = createEngine(engineKey);
const storageMiddleware = storage.createMiddleware(engine);

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, loggerMiddleware, storageMiddleware)(createStore);
store = createStoreWithMiddleware(reducer);



console.log('before1:', _.get(store.getState(), 'myReducer.arr'));
console.log('before2:', localStorage.getItem(engineKey));

const load = storage.createLoader(engine);

load(store)
    .then(newState => {
        console.log('Loaded state:', _.get(newState, 'myReducer.arr'));
        console.log('after1:', _.get(store.getState(), 'myReducer.arr'));
        console.log('after2:', localStorage.getItem(engineKey));
    }).catch(() => console.log('Failed to load previous state'));