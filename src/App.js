import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Signin from './pages/signin';
import { home_redirect } from './global_vars';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <Router basename="/">
        <Routes>
          <Route path="/signin" element={<Signin />} exact />
          <Route path="/settings" element={<Settings />} exact />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
