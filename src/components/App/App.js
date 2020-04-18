import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, CartPage } from '../Pages';
import './App.css';
import Header from '../Header/Header';

const App = () => {
  return <Fragment>
    <Header />
    <main role="main" className="container">
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/cart' component={CartPage} />
      </Switch>
    </main>
  </Fragment>
}

export default App;