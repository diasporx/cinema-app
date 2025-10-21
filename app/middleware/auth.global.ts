function isAuthenticated(): boolean { return false }

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/auth/login' || to.path === '/auth/register') {
        return
    }

    if (isAuthenticated() === false) {
        return navigateTo('/auth/login')
    }
})
