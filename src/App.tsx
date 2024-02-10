import Routes from './routes'
import './App.css';
import {ConuterProvider} from'./context/TimerContext';


function App() {

  return (
    <ConuterProvider>
      <Routes/>
    </ConuterProvider>
  )
}

export default App
