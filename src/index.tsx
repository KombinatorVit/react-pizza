import './index.css';
import {Provider} from 'react-redux';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {store} from './redux/store';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')  as HTMLElement
);

