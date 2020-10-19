import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import intl from 'react-intl-universal'
import { NavBar } from '../components'
import { monitor , configInsert, MoviesUpdate , recomendacoes , Usuario , configuracoesList , Login} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'
const locales = {
    'pt-BR': require('../locales/pt-BR.json'),
    'en-US': require('../locales/en-US.json')
  };
class App extends Component {
    constructor() {
        super();
    
        const currentLocale = locales[navigator.language]
                                ? navigator.language
                                : 'pt-BR';
    
        intl.init({
          currentLocale,
          locales
        });
      }
      render(){
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path = "/" exact component = {Login} />
                <Route path="/monitor" exact component={monitor} />
                <Route path="/configuracoes/create" exact component={configInsert} />
                <Route path="/recomendacoes" exact component={recomendacoes} />
                <Route path="/usuario" exact component={Usuario} />
                <Route path="/configuracoes/list" exact component={configuracoesList} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesUpdate}
                />
            </Switch>
        </Router>
    )
}
}
export default App
