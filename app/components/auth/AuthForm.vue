<template>
  <div class="form">
    <div class="input-field mb-4">
      <label for="userNameField">Логин</label>
      <input
          id="userNameField"
          v-model="loginField"
          type="text"
          placeholder="username"
      >
    </div>
    <div class="input-field mb-4">
      <label for="passwordField">Пароль</label>
      <input
          id="passwordField"
          v-model="passField"
          type="password"
          placeholder="password"
      >
    </div>
    <div v-if="mode === 'register'" class="input-field mb-4">
      <label for="RepeatPasswordField">Пароль</label>
      <input
          id="RepeatPasswordField"
          v-model="repeatPassField"
          type="password"
          placeholder="password"
      >
    </div>
    <div v-if="errorMessage.length" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span class="font-medium">{{ errorMessage }}</span>
    </div>
    <div v-if="successMessage.length" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      <span class="font-medium">{{ successMessage }}</span>
    </div>

    <button class="button mb-4" type="button" @click="submit">{{ isLogin ? 'Войти' : 'Зарегестрироваться' }}</button>

    <template v-if="isLogin">
      <h2>Если у вас нет аккаунта <NuxtLink class="underline" to="/auth/register">зарегистрируйтесь</NuxtLink></h2>
    </template>
    <template v-else>
      <h2>Если вы уже зарегистрированы, то <NuxtLink class="underline" to="/auth/login">войдите</NuxtLink></h2>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { AuthCredentials } from '@core/domain/auth/types'
import { getErrorMessage } from '@core/domain/auth/errorHandler'
import { AuthValidator } from '@core/domain/auth/AuthValidator'

const props = defineProps<{ mode: 'login' | 'register' }>();
const isLogin = props.mode === 'login';

const loginField = ref("");
const passField = ref("");
const repeatPassField = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const { $authUC } = useNuxtApp();

const submit = async () => {
  if (!isLogin) {
    const passwordMatchError = AuthValidator.validatePasswordMatch(passField.value, repeatPassField.value);
    if (passwordMatchError) {
      errorMessage.value = passwordMatchError;
      return;
    }
  }
  try {
    errorMessage.value = '';
    const credentials: AuthCredentials = {
      username: loginField.value,
      password: passField.value
    }

    const result = isLogin ? await $authUC.loginUser.exec(credentials) : await $authUC.registerUser.exec(credentials);
    successMessage.value = result.message || 'Пользователь успешно зарегистрирован'
    await navigateTo('/auth/login');

  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error)
  }
}
</script>
