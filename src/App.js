import './scss/app.scss';
import {Header} from "./components/Header";
import {Categories} from "./components/Categories";
import {Sort} from "./components/Sort";
import {PizzaBlock} from "./components/PizzaBlock";
import {useState, useEffect} from "react";


function App() {
const[items, setItems] = useState([])

useEffect(()=> {
    fetch('https://6369227915219b8496105d27.mockapi.io/items').then((res)=>{
        return res.json()
    })
        .then((arr) => {
            setItems(arr)        })
}, [])

  return (
    <div className="App">
      <div className="wrapper">
<Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {items.map((el, i) => (
                    <PizzaBlock key={i} {...el}
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
