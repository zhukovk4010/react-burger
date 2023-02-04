import AppHeader from '../app-header/AppHeader'
import Main from '../main/Main';

import { data } from '../../utils/data';

import './App.css';


function App() {
  return (
    <>
      <AppHeader />
      <Main data={data} />
    </>
  );
}


export default App;
