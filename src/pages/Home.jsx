import React, {useContext, useRef} from 'react';
import axios from "axios";
import qs from 'qs'
import {Categories} from "../components/Categories";
import {Sort, sortlist} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";
import {Pagination} from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {useNavigate} from "react-router-dom";


export const Home = ({}) => {

    const {categoryId, sort, currentPage} = useSelector(state => state.filter)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const {searchValue} = useContext(SearchContext)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }


    const fetchPizzas = () => {
        setIsLoading(true)
        const sortBy = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';


        axios.get(`https://6369227915219b8496105d27.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`).then(res => {
            setItems(res.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if(isMounted.current){
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }

        isMounted.current = true

    }, [categoryId, sortType, searchValue, currentPage])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortlist.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilters({...params, sort}))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {

        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage])



    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>) : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};



