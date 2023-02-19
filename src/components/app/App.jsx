import { useEffect, useReducer } from 'react';

import { IngredientsContext } from '../../utils/context';

import AppHeader from '../app-header/AppHeader'
import Main from '../main/Main';

const URL = 'https://norma.nomoreparties.space/api/ingredients';


//Начальное состояние state
const initialState = {
	//Все ингредиенты
	ingredients: [],
	//Выбранные ингредиенты
	selectedIngredients: {
		bun: {},
		otherIngredients: [],
		totalPrice: 0
	},
	//Состояние загрузки
	isLoading: true,
	//Наличие ошибки
	hasError: false,
	//Заказы
	orders: []
};

//Редюсер
//Изменяет состояние ингредиентов, заказов, загрузки и наличие ошибки при обращении к серверу (type: addIngredients, addError)
//Подобъект selectedIngredients изменяется при добавлении в него ингредиетов и высчитывает итоговую стоимость
const reducer = (state, action) => {
	switch (action.type) {
		//При успешном получении данных из API
		case 'addIngredients':
			return {
				...state,
				ingredients: action.data,
				isLoading: false,
				hasError: false
			}
		//При ошибке получения или полученных данных из API
		case 'addError':
			return {
				...state,
				isLoading: false,
				hasError: true
			}
		//Добавление выбранного ингредиента в selectedIngredients
		case 'addSelectedIngredient':
			//Если тип ингредиента 'bun'
			if (action.ingredient.type === 'bun') {
				//Если булка уже была добавлена и нужно перезаписать ее и изменить итоговую стоимость
				if (state.selectedIngredients.bun.price != undefined) {
					return {
						...state,
						selectedIngredients: {
							...state.selectedIngredients,
							bun: action.ingredient,
							totalPrice: state.selectedIngredients.totalPrice -
								(state.selectedIngredients.bun.price * 2) +
								(action.ingredient.price * 2)
						}
					}
				}
				//При первоначальном добавлении булки
				return {
					...state,
					selectedIngredients: {
						...state.selectedIngredients,
						bun: action.ingredient,
						totalPrice: state.selectedIngredients.totalPrice + (action.ingredient.price * 2),
					}
				}
			} else {
				//Если тип ингредиента не булка, то добавляется в отдельный массив,
				//Итоговая стоимость тоже изменяется
				return {
					...state,
					selectedIngredients: {
						...state.selectedIngredients,
						otherIngredients: [...state.selectedIngredients.otherIngredients, action.ingredient],
						totalPrice: state.selectedIngredients.totalPrice + action.ingredient.price
					},

				}
			}
			//Добавляем заказ в массив orders
		case 'addOrder':
			return {
				...state,
				orders: [...state.orders, {name: action.name, orderNumber: action.orderNumber}]
			}
		default:
			throw new Error(`Wrong type of action ${action.type}`)
	}
}


const App = () => {

	//Создание состояния через Reducer
	const [state, dispatch] = useReducer(reducer, initialState);


	//Выполнение запроса к серверу
	//Если возвращается ответ, то отрисовывается приложении
	//Если нет ответа, то отрисовывается сообщение с просьбой перезагрузить сайт, а в консоли показывается ошибка
	useEffect(() => {
		const getIngredientsData = async () => {
			try {
				const res = await fetch(URL);
				if (res.ok) {
					const data = await res.json();
					dispatch({ type: 'addIngredients', data: data.data })
				} else {
					return Promise.reject(`Ошибка ${res.status}`);
				}
			} catch (error) {
				dispatch({ type: 'addError' })
				console.error('Ошибка:', error)
			}
		}
		getIngredientsData();
	}, [])

	if (state.hasError === true) {
		return (
			<h1>Произошла ошибка, перезагрузите страницу</h1>
		)
	}

	if (state.isLoading === true) {
		return (
			<h1>Идет загрузка страницы</h1>
		)
	}

	return (
		<>
			<AppHeader />
			<IngredientsContext.Provider value={{ state, dispatch }}>
				<Main />
			</IngredientsContext.Provider>
		</>
	)
}


export default App;
