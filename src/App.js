import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signin from './components/signin';
import Home from './components/home';
import { home_redirect } from './global_vars';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducer from './store/reducer';

// let initialState = {
//   val: 42
// }
// function reducer (state = initialState, action) {
//   // const newState = { ...state };

//   switch (action.type) {
//       case "ADD_VAL":
//           return { val: state.val + 1 }
//       default:
//           return state;
//   }
// }

const store = createStore(reducer);
// console.log(this.props)
// store.dispatch({ type: "ADD_VAL"})

function App() {
  return (
    <Provider store={store}>
      <Router basename="/elite">
      <Switch>
        <Route path="/signin" exact>
          <Signin />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
