import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
// import required components
import CreateClothes from './CreateClothes';
import EditClothes from './EditClothes';
import ClothesList from './ClothesList';

// this is the "main" component which sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        {/* SERVERSIDE: Link the routes to components*/}
        <Route exact path="/" component={ClothesList}/>
        {/* pass the id through the EdiClothe component*/}
        <Route path="/edit-clothes/:id" component={EditClothes}/>
        {/* set the path to create a new clothe to CreateClothe component*/}
        <Route path="/create-clothes" component={CreateClothes}/>
      </div>
    </HashRouter>
  );
};

export default App;
