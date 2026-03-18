// src/tests/setup.js
import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  // Check for 'modal-root' specifically
  if (!document.getElementById('modal-root')) {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }
});
// Mock HTMLDialogElement methods for JSDOM
HTMLDialogElement.prototype.showModal = vi.fn(function() { this.open = true; });
HTMLDialogElement.prototype.close = vi.fn(function() { this.open = false; });
