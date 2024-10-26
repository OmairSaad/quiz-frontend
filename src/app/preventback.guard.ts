import { CanDeactivateFn } from '@angular/router';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';

export const preventbackGuard: CanDeactivateFn<StartQuizComponent> = (component, currentRoute, currentState, nextState) => {
  return false;
};
