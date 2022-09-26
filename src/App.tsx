import './style/app.scss';
import { useEffect } from 'react';
import { Header } from './components/header/Header';
import { Dialog } from './components/Dialog';
import { login } from "./slices/userSlice";
import { LOGIN_STATE } from './constants/local-storage';
import { HomePage } from './pages/HomePage'
import { loadData } from './slices/trendSlice';
import { fetchLanguages, fetchTrends } from './data/trending';
import { useAppDispatch, useAppSelector  } from "./redux";
import { LoginStateType, TrendStateType } from './type';
import { loadLanguages } from './slices/trendSlice';


function App() {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector((state) => state.dialog.open);

  useEffect(() => {
    const loginInfoString: string | null = localStorage.getItem(LOGIN_STATE)
    if (loginInfoString){
      const loginInfo: LoginStateType = JSON.parse(loginInfoString);
      dispatch(login(loginInfo));
    }
  }, [dispatch]);

  useEffect(() => {
    const trendingData: TrendStateType[] = fetchTrends()
    const languages: string[] = fetchLanguages()
    dispatch(loadData(trendingData));
    dispatch(loadLanguages(languages));
  }, [dispatch])

  return (
    <div className="container">
      {dialog && <Dialog /> }
        <Header />
        
        <HomePage />
    </div>
  );
}

export default App;