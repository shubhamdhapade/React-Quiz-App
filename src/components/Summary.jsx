import Modal from "../utilities/Modal";
import quizCompletedImage from "../assets/images/quiz-complete.png";
import { QuizContext } from "../store/quiz-context";
import dummyRaWQuizData from "../assets/question"; 
import { useContext } from "react";
export default function Summary({ref}) {
    const { userAnswers } = useContext(QuizContext);
    const totalQuestions = userAnswers.length;
    const correctAnswers = userAnswers.filter((answer, index) => {
        const questionData = dummyRaWQuizData[index];
        return answer === questionData.answers[0]; // Correct answer is always at index 0
    }).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    return (
        <Modal ref={ref} onReset={() => window.location.reload()}>
            <div
            >
                
                <img 
                    className="block size-32 object-contain mx-auto mb-4 p-4 drop-shadow-[0_0_4px_rgba(0,0,0,0.6)] border-2 border-[#3a2353] rounded-full bg-[#c188f5] "
                    src={quizCompletedImage} alt="Quiz Trophy" />
                    <h2
                    className="font-roboto text-5xl text-center m-0 uppercase text-[#3a2353]"
                >Quiz Completed</h2>
                <div className="flex justify-around mt-8 border-t-2 border-[#3a2353] pt-6">
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-[#3a2353]">{correctAnswers}</span>
                        <span className="text-sm uppercase font-semibold text-[#513a6b]">Correct</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-[#3a2353]">{incorrectAnswers}</span>
                        <span className="text-sm uppercase font-semibold text-[#513a6b]">Wrong / Skipped</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-[#3a2353]">{totalQuestions}</span>
                        <span className="text-sm uppercase font-semibold text-[#513a6b]">Total</span>
                    </div>
                </div>
                
                <div className="mt-8 text-center">
                    <p className="text-xl font-bold text-[#3a2353]">
                        Final Score: {Math.round((correctAnswers / totalQuestions) * 100)}%
                    </p>
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-[#6cb7f5] hover:bg-[#9d5af5] focus:bg-[#9d5af5] text-white rounded-full shadow-lg transition-colors duration-300"
                    >
                        Retake Quiz
                    </button>
                </div>
            </div>
        </Modal>
    );
}