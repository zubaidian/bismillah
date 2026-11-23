declare global {
  interface Window {
    __ggzcPendingExamTab?: 'papers' | 'pattern' | 'quiz' | 'viva' | 'tutor' | 'counselor';
  }
}

export function openAiTutorSection() {
  if (typeof window === 'undefined') return;

  // Set synchronous pending tab so lazy-mounted ExamPrepSection opens directly on 'tutor'
  window.__ggzcPendingExamTab = 'tutor';

  // Prefetch ExamPrepSection chunk immediately
  import('../components/ExamPrepSection').catch(() => {});

  // Ensure LazySection mounts ExamPrepSection if it is still a placeholder
  window.dispatchEvent(
    new CustomEvent<{ targetId: string }>('ggzc:activate-section', {
      detail: { targetId: 'ai-tutor' },
    })
  );

  // Notify ExamPrepSection if already mounted
  window.dispatchEvent(new CustomEvent('exam-prep:open-tutor'));

  const scrollToTutor = (behavior: ScrollBehavior = 'smooth') => {
    const panel = document.getElementById('ai-tutor-panel');
    if (panel) {
      panel.scrollIntoView({ behavior, block: 'start' });
      return true;
    }
    const section = document.getElementById('exam-prep');
    if (section) {
      section.scrollIntoView({ behavior, block: 'start' });
    }
    return false;
  };

  if (scrollToTutor('smooth')) {
    window.setTimeout(() => scrollToTutor('smooth'), 180);
    return;
  }

  let attempts = 0;
  const poll = () => {
    attempts += 1;
    window.dispatchEvent(new CustomEvent('exam-prep:open-tutor'));
    if (scrollToTutor('smooth')) {
      window.setTimeout(() => scrollToTutor('smooth'), 220);
    } else if (attempts < 35) {
      window.setTimeout(poll, 75);
    }
  };
  window.setTimeout(poll, 75);
}
