import { Provider } from 'react-redux';

import store from '../../services/store';

import AppHeader from '../app-header/AppHeader'
import Main from '../main/Main';


const App = () => {

	return (
		<>
			<AppHeader />
			<Provider store={store}>
				<Main />
			</Provider>
		</>
	)
}


export default App;
