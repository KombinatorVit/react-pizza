import React, {useContext, useRef} from 'react';
import qs from 'qs'
import {Categories} from "../components/Categories";
import {Sort, sortlist} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {useEffect} from "react";
import {Pagination} from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/filter/slice";
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/pizza/asyncActions";
import {selectPizzaData} from "../redux/pizza/selectors";
import {selectFilter} from "../redux/filter/selectors";


export const Home = ({}) => {

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }


    const getPizzas = async () => {
        const sortBy = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';


        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );

        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (isMounted.current) {
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
        getPizzas()
    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items.map((obj) => <Link key={obj.id} to={`/pizza/${obj.id}`}> <PizzaBlock  {...obj} /></Link>)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;


