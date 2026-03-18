import { render, screen, fireEvent } from '@testing-library/react';
import { QuizContext } from '../store/quiz-context';
import Summary from './Summary';
import React from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// 1. Mock the data accurately to match your loop logic
vi.mock('../assets/question', () => ({
  default: [
    { answers: ['Correct 1'] },
    { answers: ['Correct 2'] }
  ]
}));

describe('Summary Component Coverage', () => {
  // 2. Mock window.location.reload
  const reloadMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('location', { reload: reloadMock });
  });

  it('calculates scores (Lines 15-47)', () => {
    const modalRef = React.createRef(); // Define the missing ref
    
    render(
      <QuizContext.Provider value={{ userAnswers: ['Correct 1', 'Wrong Answer'] }}>
        <Summary ref={modalRef} />
      </QuizContext.Provider>
    );

    // Verify percentages/counts
    const scoreContainer = screen.getByText(/Final Score:/i);
    expect(scoreContainer).toHaveTextContent('50%');

    // Use getByText to find the label, then find the count above it
    expect(screen.getByText('Correct').previousSibling.textContent).toBe('1');
    expect(screen.getByText('Total').previousSibling.textContent).toBe('2');
  });

  it('triggers window reload on button click', () => {
    render(
      <QuizContext.Provider value={{ userAnswers: ['Correct 1'] }}>
        <Summary ref={React.createRef()} />
      </QuizContext.Provider>
    );

    // Use { hidden: true } since it's inside a <dialog>
    const retakeBtn = screen.getByRole('button', { name: /retake quiz/i, hidden: true });
    fireEvent.click(retakeBtn);
    expect(reloadMock).toHaveBeenCalled();
  });

});
