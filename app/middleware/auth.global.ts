export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/auth/login' || to.path === '/auth/register') {
        return;
    }

    const { isAuthenticated } = useAuthToken();

    if (!isAuthenticated()) {
        return navigateTo('/auth/login');
    }
});
