import {FC} from 'react';


type CategoriesPropsType = {
    value: number
    onChangeCategory: (i:number) => void
}

export const Categories: FC<CategoriesPropsType> = ({value, onChangeCategory}) => {
    const categories = ['Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',];


    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li key={i} onClick={() => {
                        onChangeCategory(i);
                    }} className={value === i ? 'active' : ''}>{categoryName}
                    </li>
                ))}

            </ul>
        </div>
    );
};