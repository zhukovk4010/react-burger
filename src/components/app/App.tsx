import { useEffect, useState } from 'react';

import AppHeader from '../app-header/AppHeader'
import Main from '../main/Main';

const URL = 'https://norma.nomoreparties.space/api/ingredients';


const App = () => {

	const [state, setState] = useState({ ingredientsData: [], isLoading: true, hasError: false });

	//Выполнение запроса к серверу
	//Если возвращается ответ, то отрисовывается приложении
	//Если нет ответа, то отрисовывается сообщение с просьбой перезагрузить сайт, а в консоли показывается ошибка
	useEffect(() => {
		const getIngredientsData = async () => {

			setState({ ...state, isLoading: true, hasError: false });

			try {
				const res = await fetch(URL);
				if (res.ok) {
					const data = await res.json();
					setState({ ingredientsData: data.data, isLoading: false, hasError: false })
				} else {
					return Promise.reject(`Ошибка ${res.status}`);
				}
			} catch (error) {
				setState({ ingredientsData: [], isLoading: false, hasError: true })
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
			<Main ingredientsData={state.ingredientsData} />
		</>
	)
}


export default App;
