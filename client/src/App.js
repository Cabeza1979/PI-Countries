import './App.css';
import { Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Inicio from './components/inicio';
import pPrincipal from './components/render';
import Details from './components/Details';
import formActivity from './components/formActivity';
import Activities from './components/activities';
import ActDetails from './components/actDetails';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
       <Route path="/" component={Inicio} exact/>  
       <Route path="/home" component ={Navbar} exact/>
       
       <Route path="/home" component = {pPrincipal} exact />
       <Route path="/country/:idCountry" exact render={({match}) => <Details match={match} />} />
       <Route path="/activitY" component={formActivity} exact />
       <Route path="/allactivities" component={Activities} exact />
       <Route path="/activity/:id" exact render={({match}) => <ActDetails match={match} />} />

    </div>
  );
}

export default App;
