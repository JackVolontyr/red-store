import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, CartPage } from '../Pages';
import './App.css';

const App = () => {
  return <div className="rs-app">
    <Switch>
      <Route path='/' component={HomePage} exact />
      <Route path='/cart' component={CartPage} />
    </Switch>
  </div>
}

export default App;