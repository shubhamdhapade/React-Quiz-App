import { createContext, useCallback, useReducer } from "react";
import { showToasterMessage } from "../utilities/Toaster";
import dummyRaWQuizData from "../assets/question";

export const QuizContext = createContext({
    activeQuestion: null,
    activeQuestionAnswersOptions: null,
    correctAnswer: null,
    handleAnswerSelection: () => { },
    quizIsCompleted: false,
    setAnswerStateCSS: '',
    selectedAnswer: null,
    userAnswers: [],
});

const initialState = {
    userAnswers: [],
    answerState: '',
    selectedAnswer: null,
};

function quizReducer(state, action) {
    switch (action.type) {
        case 'SELECT_ANSWER':
            return {
                ...state,
                selectedAnswer: action.payload,
                answerState: 'answered',
                userAnswers: [...state.userAnswers, action.payload]
            };
        case 'SET_RESULT':
            return { ...state, answerState: action.payload };
        case 'NEXT_QUESTION':
            return { ...state, answerState: '', selectedAnswer: null };
        default:
            return state;
    }
}

export function QuizContextProvider({ children }) {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    const activeQuestionIndex = state.answerState === '' ? state.userAnswers.length : state.userAnswers.length - 1;
    const quizIsCompleted = activeQuestionIndex === dummyRaWQuizData.length;
    const currentQuestion = dummyRaWQuizData[activeQuestionIndex];
    const correctAnswer = currentQuestion?.answers[0];
    const handleAnswerSelection = useCallback((selected) => {
        dispatch({ type: 'SELECT_ANSWER', payload: selected });
        setTimeout(() => {
            if (selected === correctAnswer) {
                showToasterMessage("Correct Answer!", "success");
                dispatch({ type: 'SET_RESULT', payload: 'correct' });
            } else {
                const msg = selected === null ? "Time's up!" : "Wrong Answer!";
                showToasterMessage(msg, "error");
                dispatch({ type: 'SET_RESULT', payload: 'wrong' });
            }
            setTimeout(() => {
                dispatch({ type: 'NEXT_QUESTION' });
            }, 2000);
        }, 1000);
    }, [correctAnswer]);

    const contextValue = {
        activeQuestion: currentQuestion?.text,
        activeQuestionAnswersOptions: currentQuestion?.answers,
        correctAnswer,
        handleAnswerSelection,
        quizIsCompleted,
        setAnswerStateCSS: state.answerState,
        selectedAnswer: state.selectedAnswer,
        userAnswers: state.userAnswers
    };

    return (
        <QuizContext.Provider value={contextValue}>
            {children}
        </QuizContext.Provider>
    );
}
