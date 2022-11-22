import './scss/app.scss';
import React, { Suspense } from 'react';

import {
    Route,
    Routes
} from 'react-router-dom';
import {NotFoundBlock} from './components/NotFoundBlock';
import MainLayout from './layouts/MainLayout';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
const Cart = React.lazy(() => import('./pages/Cart'));

function App() {


    return (
        <div className="App">

            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route path="" element={<Home/>}/>
                    <Route path="cart"  element={
                        <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                            <Cart />
                        </Suspense>}/>
                    <Route path="pizza/:id" element={<FullPizza/>}/>
                    <Route path="*" element={<NotFoundBlock/>}/>
                </Route>
            </Routes>
        </div>


    );
}

export default App;
