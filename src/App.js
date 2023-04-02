import './App.css';
import MainComponent from './components/theme-component';
import DisplayComponent from './components/display-component';
import PaymentSuccessComponent from './components/payment-success-component';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainComponent component={DisplayComponent}/>
      </header>
    </div>
  );
}

function PaymentSuccessApp(){
  return (
    <div className="App">
      <header className="App-header">
        <MainComponent component={PaymentSuccessComponent}/>
      </header>
    </div>
  )
}

export {
  PaymentSuccessApp,
  App
}
