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



function App() {


  return (
    <div className="App">
      <div className="wrapper">
<Header />
        <div className="content">
          <div className="container">
<Routes>
<Route path='/' element={<Home />}/>
<Route path='/cart' element={<Cart />}/>
<Route path='*' element={<NotFoundBlock />}/>
</Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
