import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import GlobalStyle from 'theme/GlobalStyle';
import Home from 'views/Home';
import Cart from 'views/Cart';
import Navbar from 'components/Navbar';

function Root() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/koszyk" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default Root;
