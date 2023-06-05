import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Signin from './pages/signin';
import { useSelector } from 'react-redux';
import ModalView from './includes/modal';

const App = () => {

  const modal_view = useSelector(state => state.modal_view);
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} exact />
          <Route path="/settings" element={<Settings />} exact />
          <Route path="/" element={<Home />} exact />
        </Routes>
      </HashRouter>

      {modal_view.modal_view ?
        <div className="main-div-modal nodrag">
          {ModalView(modal_view.modal_title, modal_view.modal_main_text)}
        </div> : null}
    </div>
  );
}

export default App;
