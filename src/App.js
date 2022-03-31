import logo from './logo.svg';
import './App.css';
import Routes from './router';
import {Provider} from 'react-redux';
import store from './redux_helper/stores';
// import { SnackbarProvider, useSnackbar } from 'notistack';
import Layout from './layout';
import LoadingModal from './components/modals/loading';
import AlertMessage from './components/modals/alert';


function App() {
  return (
      <Provider store = {store}>
        <LoadingModal />
        <AlertMessage/>
        <Layout>
          <Routes />
        </Layout>
      </Provider>
  );
}

export default App;
