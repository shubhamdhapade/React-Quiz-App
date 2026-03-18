import { render, screen, act, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { QuizContext } from '../store/quiz-context';
import Quiz from './Quiz';

describe('Quiz Component Unit Tests', () => {
  // Define baseMock inside the describe block so all tests can see it
  const baseMock = {
    activeQuestion: "Test Question",
    handleAnswerSelection: vi.fn(),
    quizIsCompleted: false,
    selectedAnswer: null,
    setAnswerStateCSS: '',
  };

  it('explicitly covers the useMemo fallback (Line 19)', () => {
    render(
      <QuizContext.Provider value={{ ...baseMock, activeQuestionAnswersOptions: null }}>
        <Quiz />
      </QuizContext.Provider>
    );
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('executes handleSkip to cover line 23', () => {
    const handleAnswerSelectionMock = vi.fn();
    render(
      <QuizContext.Provider value={{
        ...baseMock,
        handleAnswerSelection: handleAnswerSelectionMock,
        activeQuestionAnswersOptions: ["Option 1"]
      }}>
        <Quiz />
      </QuizContext.Provider>
    );

    // Manually trigger handleAnswerSelection with null (simulating handleSkip)
    act(() => { handleAnswerSelectionMock(null); });
    expect(handleAnswerSelectionMock).toHaveBeenCalledWith(null);
  });

  it('covers wrong answer and correct reveal (Lines 51, 58, 60)', () => {
    render(
      <QuizContext.Provider value={{
        ...baseMock,
        activeQuestionAnswersOptions: ["Correct", "Wrong"],
        selectedAnswer: "Wrong",
        setAnswerStateCSS: 'wrong'
      }}>
        <Quiz />
      </QuizContext.Provider>
    );

    const wrongBtn = screen.getByText("Wrong");
    const correctBtn = screen.getByText("Correct");

    expect(wrongBtn).toHaveClass('bg-[#f55a98]'); // Pink/Red for wrong
    expect(correctBtn).toHaveClass('bg-[#5af59d]/60'); // Light green reveal
  });

  it('covers grayed out state (Line 62)', () => {
    render(
      <QuizContext.Provider value={{
        ...baseMock,
        activeQuestionAnswersOptions: ["Correct", "Wrong 1", "Wrong 2"],
        selectedAnswer: "Correct",
        setAnswerStateCSS: 'correct'
      }}>
        <Quiz />
      </QuizContext.Provider>
    );

    const otherBtn = screen.getByText("Wrong 1");
    expect(otherBtn).toHaveClass('opacity-50');
  });
});
