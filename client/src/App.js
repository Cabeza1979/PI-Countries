import './App.css';
import { Route } from 'react-router-dom';
import Countries from './components/countries/countries';
import Navbar from './components/navbar/navbar';
import Activities from './components/activities/activities';
import About from './components/about/about';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Route path="/" exact>
          <h1>ESTO ES HOME</h1>
        </Route>
        <Route exact path="/about"  component={About} />  
        <Route exact path="/countries"  component={Countries} />  
        
        <Route exact path="/activities/:id" render={({match, history, location})=><Activities match={match} />} />
        {/* <Route path="/" component = {About} /> */}
    </div>
  );
}

export default App;
