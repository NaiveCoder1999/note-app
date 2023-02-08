// import logo from './logo.svg';
import './App.css';
import AxiosInvokeTest from './components/AxiosInvokeTest';
import UserApp from './components/UserApp'; //no curly parentheses on UserApp

function App() {
  return (
    <div className="container">
      {/* <AxiosInvokeTest /> */}
      <UserApp />
    </div>
  );
}

export default App;
