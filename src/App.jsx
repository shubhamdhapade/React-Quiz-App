import './App.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { QuizContextProvider } from './store/quiz-context';
import Header from './components/Header';
import Quiz from './components/Quiz';

function App() {
  return (
    <QuizContextProvider>
      <ToastContainer />
      <Header />
      <Quiz />
    </QuizContextProvider>
  )
}

export default App
