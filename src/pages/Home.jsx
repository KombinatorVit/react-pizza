import React from 'react';
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";

export const Home = () => {
    const[items, setItems] = useState([])
    const[isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        fetch('https://6369227915219b8496105d27.mockapi.io/items').then((res)=>{
            return res.json()
        })
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)})
        window.scrollTo(0,0)
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i)=> <Skeleton key={i}/>)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </div>
    );
};

