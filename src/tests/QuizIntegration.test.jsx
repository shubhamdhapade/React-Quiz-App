import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { QuizContextProvider, QuizContext } from '../store/quiz-context';
import { useContext } from 'react';

// A tiny consumer to test the context in isolation
const TestConsumer = () => {
  const { handleAnswerSelection, userAnswers, setAnswerStateCSS } = useContext(QuizContext);
  return (
    <div>
      <button onClick={() => handleAnswerSelection('Correct Answer')}>Correct</button>
      <button onClick={() => handleAnswerSelection('Wrong Answer')}>Wrong</button>
      <button onClick={() => handleAnswerSelection(null)}>Timeout</button>
      <div data-testid="status">{setAnswerStateCSS}</div>
      <div data-testid="answers">{userAnswers.length}</div>
    </div>
  );
};
vi.mock('../utilities/Toaster', () => ({
  showToasterMessage: vi.fn(),
}));
describe('Quiz Context Detailed Coverage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('covers Timeout/Skip logic (Line 36)', async () => {
    render(
      <QuizContextProvider>
        <TestConsumer />
      </QuizContextProvider>
    );

    // Trigger the null path (Line 36: selected === null)
    fireEvent.click(screen.getByText('Timeout'));

    // Fast-forward 1s for the first setTimeout (Sets 'wrong' for timeout)
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByTestId('status').textContent).toBe('wrong');

    // Fast-forward 2s for the second setTimeout (Resets state)
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByTestId('status').textContent).toBe('');
  });

  it('covers Wrong Answer branch (Line 51 else logic)', async () => {
    render(
      <QuizContextProvider>
        <TestConsumer />
      </QuizContextProvider>
    );

    // Change 'Wrong Answer' to 'Wrong' to match the button in TestConsumer
    fireEvent.click(screen.getByText('Wrong'));

    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByTestId('status').textContent).toBe('wrong');
  });

  it('verifies the Provider value object (Lines 50-51)', () => {
    // Simply rendering the provider with any consumer 
    // ensures the contextValue object creation is tracked as covered.
    render(
      <QuizContextProvider>
        <TestConsumer />
      </QuizContextProvider>
    );
    expect(screen.getByTestId('answers').textContent).toBe('0');
  });
});
