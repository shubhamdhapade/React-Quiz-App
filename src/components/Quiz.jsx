
import { useContext, useCallback, useMemo, useRef, useEffect } from "react";
import { QuizContext } from "../store/quiz-context";
import QuestionTimer from "./QuestionTimer";
import Summary from "./Summary";

export default function Quiz() {
    const { activeQuestion, activeQuestionAnswersOptions, handleAnswerSelection, quizIsCompleted, setAnswerStateCSS, selectedAnswer } = useContext(QuizContext);
    const modal = useRef();
    const shuffledOptions = useMemo(() => {
        if (!activeQuestionAnswersOptions) return [];
        return [...activeQuestionAnswersOptions].sort(() => Math.random() - 0.5);
    }, [activeQuestionAnswersOptions]);
    const handleSkip = useCallback(() => {
        handleAnswerSelection(null);
    }, [handleAnswerSelection]);
    useEffect(() => {
        if (quizIsCompleted && modal.current) {
            modal.current.showModal();
        }
    }, [quizIsCompleted]);
    if (quizIsCompleted) {
        return <Summary ref={modal} />
    }
    return (
        <>
            <div
                className="mx-auto max-w-[50rem] p-8 bg-linear-to-b from-[#3e2a60] to-[#321061] rounded-4xl text-center shadow-[1px_1px_8px_4px_rgba(12,5, 32,0.6)]"
            >
                <div className="items-center flex flex-col justify-center border-2 border-solid border-[#c1b2dd] rounded-3xl p-8" >
                    <QuestionTimer key={activeQuestion} timeout={10000} onTimeout={() => handleSkip()} />
                    <h2
                        className="mt-2 mb-10 m-0 font-roboto text-[1.5rem] font-normal text-[#c1b2dd]"
                    >{activeQuestion}
                    </h2>
                    {shuffledOptions && shuffledOptions.length > 0 && (
                        <ul
                            className="list-none m-0 p-0 flex flex-col gap-2 items-center"
                        >
                            {shuffledOptions?.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                // The correct answer is always at index 0 of the original data array
                                const isCorrect = option === activeQuestionAnswersOptions[0];

                                let cssClasses = "bg-[#6cb7f5] hover:bg-[#9d5af5] focus:bg-[#9d5af5] hover:text-white focus:text-white";

                                if (setAnswerStateCSS !== '') {
                                    if (isSelected) {
                                        // Logic for the button the user actually clicked
                                        if (setAnswerStateCSS === 'answered') cssClasses = "bg-[#f5a76c] text-[#2c203d]";
                                        else if (setAnswerStateCSS === 'correct') cssClasses = "bg-[#5af59d] text-[#2c203d]"; // Green
                                        else if (setAnswerStateCSS === 'wrong') cssClasses = "bg-[#f55a98] text-[#2c203d]"; // Red/Pink
                                    }

                                    // REVEAL CORRECT ANSWER: If user was wrong, show the correct one in light green
                                    // If not selected and not correct, dim it (grayish)
                                    if (!isSelected && setAnswerStateCSS !== 'answered') {
                                        if (isCorrect) {
                                            cssClasses = "bg-[#5af59d]/60 text-[#2c203d]"; // Light Green
                                        } else {
                                            cssClasses = "bg-[#ccc] text-[#777] opacity-50"; // Grayed out
                                        }
                                    }
                                }

                                return (
                                    <li key={`${index}-${option}`} className="mx-auto w-[90%]">
                                        <button
                                            disabled={setAnswerStateCSS !== ''}
                                            className={`${cssClasses} inline-block w-full font-roboto text-[0.9rem] p-4 px-8 border-none rounded-3xl cursor-pointer transition-all duration-200 ease-in-out`}
                                            onClick={() => handleAnswerSelection(option)}
                                        >
                                            {option}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                </div>
            </div>
        </>

    );
}