import { useAuthToken } from '@/composables/useAuthToken';
import { useAlert } from '@/composables/useAlert';
import { SUCCESS_MESSAGES } from '@core/domain/auth/SuccessMessages';
import { ERRORS_MESSAGES } from '@core/domain/auth/ErrorMessages';

const { clearToken, isAuthenticated } = useAuthToken();
const { addAlert } = useAlert();

export default defineNuxtRouteMiddleware(to => {
  if (to.path === '/') {
    return navigateTo('/movies');
  }

  if (to.path === '/tickets' && !isAuthenticated()) {
    addAlert({
      type: 'error',
      message: ERRORS_MESSAGES.USER_MUST_BE_AUTHENTICATED as string,
      duration: 3000,
    });
    return navigateTo('/auth/login');
  }

  if (to.path === '/logout') {
    clearToken();
    addAlert({
      type: 'success',
      message: SUCCESS_MESSAGES.LOGOUT_SUCCESS as string,
      duration: 3000,
    });
    return navigateTo('/movies');
  }
});
