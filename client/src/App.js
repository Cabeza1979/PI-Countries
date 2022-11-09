import './App.css';
import { Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Inicio from './components/inicio';
import pPrincipal from './components/render';
import Details from './components/Details';

function App() {
  return (
    <div className="App">
       <Route path="/" component={Inicio} exact/>  
       <Route path="/home" component ={Navbar} exact/>
       <Route path="/home" component = {pPrincipal} exact />
       <Route path="/country/:idCountry" exact render={({match}) => <Details match={match} />} />


    </div>
  );
}

export default App;
