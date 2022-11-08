import './scss/app.scss';
import {Header} from "./components/Header";
// noinspection ES6CheckImport
import {
    Route,
    Routes
} from "react-router-dom";
import {Home} from "./pages/Home";
import {NotFoundBlock} from "./components/NotFoundBlock";
import {Cart} from "./pages/Cart";
import {createContext, useState} from "react";

export const SearchContext = createContext('')

function App() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="App">
            <div className="wrapper">
<SearchContext.Provider value={{searchValue, setSearchValue }}>
    <Header/>
    <div className="content">
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='*' element={<NotFoundBlock/>}/>
        </Routes>
    </div>
</SearchContext.Provider>
            </div>
        </div>
    );
}

export default App;
