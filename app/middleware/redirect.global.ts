import { useAuthToken } from "@/composables/useAuthToken";
import { useAlert } from '@/composables/useAlert'
import { SUCCESS_MESSAGES } from "../../core/domain/auth/successMessages";
const { clearToken } = useAuthToken();
const { addAlert } = useAlert();

export default defineNuxtRouteMiddleware((to) => {
    if (to.path === '/') {
        return navigateTo('/movies');
    }

    if (to.path === '/logout') {
        clearToken();
        addAlert({
            type: 'success',
            message: SUCCESS_MESSAGES.LOGOUT_SUCCESS as string,
            duration: 3000
        })
        return navigateTo('/movies');
    }
});
