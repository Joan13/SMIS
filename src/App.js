import './App.css';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Signin from './pages/signin';
import { home_redirect } from './global_vars';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { TitlebarWid, TitlebarMac } from 'electron-titlebar-react-component';

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} exact />
          <Route path="/settings" element={<Settings />} exact />
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
