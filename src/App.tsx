import './scss/app.scss';
import {
    Route,
    Routes
} from "react-router-dom";
import {Home} from "./pages/Home";
import {NotFoundBlock} from "./components/NotFoundBlock";
import {Cart} from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import FullPizza from './pages/FullPizza';


function App() {

    return (
        <div className="App">

                    <Routes>
                        <Route path={'/'} element={<MainLayout/>}>
                        <Route path='' element={<Home/>}/>
                        <Route path='cart' element={<Cart/>}/>
                        <Route path='pizza/:id' element={<FullPizza/>}/>
                        <Route path='*' element={<NotFoundBlock/>}/>
                        </Route>
                    </Routes>
                </div>



    );
}

export default App;
