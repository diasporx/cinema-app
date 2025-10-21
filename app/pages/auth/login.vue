<template>
  <div class="login-block p-5">
    <h1 class="text-3xl font-bold mb-3">LOGIN PAGE</h1>
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
      <div v-if="successMessage.length" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">{{ successMessage }}</span>
      </div>
      <div v-if="errorMessage.length > 0" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span class="font-medium">{{ errorMessage }}</span>
      </div>
      <button class="button mb-4" type="button" @click="loginSubmit">Войти</button>
      <h2>Если у вас нет аккаунта <NuxtLink class="underline" to="/auth/register">зарегистрируйтесь</NuxtLink></h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { AuthCredentials } from "@core/domain/auth/types";
import { getErrorMessage } from '@core/domain/auth/errorHandler'

const loginField = ref("");
const passField = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const { $authUC } = useNuxtApp();

const loginSubmit = async () => {
  try {
    errorMessage.value = '';
    const credentials: AuthCredentials = {
      username: loginField.value,
      password: passField.value
    }

    const result = await $authUC.loginUser.exec(credentials);
    successMessage.value = result.message || 'Успешный вход'

  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error)
  }
}
</script>
