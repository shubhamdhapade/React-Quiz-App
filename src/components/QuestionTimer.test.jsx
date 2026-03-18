import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { QuizContextProvider } from '../store/quiz-context';
import Quiz from '../components/Quiz';

describe('Quiz 100% Coverage', () => {
  it('covers every CSS state and timeout logic', async () => {
    vi.useFakeTimers();
    render(<QuizContextProvider><Quiz /></QuizContextProvider>);

    // 1. SELECT WRONG ANSWER (Covers 'wrong' CSS and 'else' branch in Context)
    const buttons = screen.getAllByRole('button');
    // Find a button that is NOT the correct answer (index 0 is correct in your data)
    const wrongButton = buttons.find(b => b.textContent !== 'Correct Answer text'); 
    fireEvent.click(wrongButton || buttons[1]); 

    act(() => {
      vi.advanceTimersByTime(1000); // Triggers 'wrong' CSS state
      vi.advanceTimersByTime(2000); // Moves to Next Question
    });

    // 2. TRIGGER TIMEOUT (Covers Line 36 in Context)
    act(() => {
      vi.advanceTimersByTime(10000); // QuestionTimer calls onTimeout
    });
    
    act(() => {
      vi.advanceTimersByTime(3000); // Process the skip and move forward
    });

    expect(screen.queryByRole('progressbar')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
