import React from 'react';
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";
import {Pagination} from "../components/Pagination";

export const Home = ({searchValue}) => {
    const[items, setItems] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'Популярности', sortProperty: 'rating'
    })
const [currentPage, setCurrentPage]= useState(1)


    useEffect(()=> {
        setIsLoading(true)
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}`: '';
        const search = searchValue  ? `search=${searchValue}`: '';

        fetch(`https://6369227915219b8496105d27.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`).then((res)=>{
            return res.json()
        })
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)})
        window.scrollTo(0,0)
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i)=>setCategoryId(i)}/>
                <Sort value={sortType} onClickSortType={(i)=>setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i)=> <Skeleton key={i}/>) : pizzas}
            </div>
            <Pagination  currentPage={currentPage} onChangePage={(number)=> setCurrentPage(number)} />
        </div>
    );
};



// сортировка на фронте, если данные моей пиццы статичны
// .filter((el) => {
//     if(el.name.toLowerCase().includes(searchValue.toLowerCase())){
//         return true
//     }
//     return false
// })