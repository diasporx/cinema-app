<template>
  <div class="form">
    <div class="input-field mb-4" :class="errorMessages?.login ? 'error' : ''">
      <label for="username">Логин</label>
      <input id="username" v-model="login" type="text" placeholder="username" >
      <span v-if="errorMessages?.login" class="hint">{{
        errorMessages?.login
      }}</span>
    </div>
    <div
      class="input-field mb-4"
      :class="errorMessages?.password ? 'error' : ''"
    >
      <label for="password">Пароль</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="password"
      >
      <span v-if="errorMessages?.password" class="hint">{{
        errorMessages?.password
      }}</span>
    </div>
    <div
      v-if="!isLogin"
      class="input-field mb-4"
      :class="errorMessages?.repeatPassword ? 'error' : ''"
    >
      <label for="repeatPassword">Пароль</label>
      <input
        id="repeatPassword"
        v-model="repeatPassword"
        type="password"
        placeholder="password"
      >
      <span v-if="errorMessages?.repeatPassword" class="hint">{{
        errorMessages?.repeatPassword
      }}</span>
    </div>

    <button class="button mb-4" type="button" @click="submit">
      {{ isLogin ? 'Войти' : 'Зарегестрироваться' }}
    </button>

    <template v-if="isLogin">
      <h2>
        Если у вас нет аккаунта
        <NuxtLink class="underline" to="/auth/register"
          >зарегистрируйтесь</NuxtLink
        >
      </h2>
    </template>
    <template v-else>
      <h2>
        Если вы уже зарегистрированы, то
        <NuxtLink class="underline" to="/auth/login">войдите</NuxtLink>
      </h2>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { AuthCredentials } from '@core/domain/auth/types';
import { getErrorMessage } from '@core/domain/shared/ErrorMessageHandler';
import { AuthValidator } from '@core/domain/auth/AuthValidator';
import { SUCCESS_MESSAGES } from '@core/domain/auth/SuccessMessages';
import { useAlert } from '@/composables/useAlert';
import { useAuthToken } from '@/composables/useAuthToken';

const { setToken } = useAuthToken();
const props = defineProps<{ mode: 'login' | 'register' }>();
const isLogin = props.mode === 'login';

const login = ref('');
const password = ref('');
const repeatPassword = ref('');
const errorMessages = ref<Record<string, string>>({});

const { $authUC } = useNuxtApp();
const { addAlert } = useAlert();

const submit = async () => {
  errorMessages.value = {};

  const loginError = AuthValidator.validateUsernameReturn(login.value);
  if (loginError) {
    errorMessages.value.login = loginError;
  }

  const passwordError = AuthValidator.validatePasswordReturn(password.value);
  if (passwordError) {
    errorMessages.value.password = passwordError;
  }

  if (!isLogin) {
    const passwordMatchError = AuthValidator.validatePasswordMatch(
      password.value,
      repeatPassword.value,
    );
    if (passwordMatchError) {
      errorMessages.value.repeatPassword = passwordMatchError;
    }
  }

  if (Object.keys(errorMessages.value).length > 0) {
    return;
  }

  try {
    const credentials: AuthCredentials = {
      username: login.value,
      password: password.value,
    };

    const result = isLogin
      ? await $authUC.loginUser.login(credentials)
      : await $authUC.registerUser.register(credentials);

    addAlert({
      type: 'success',
      message:
        result?.message ||
        ((isLogin
          ? SUCCESS_MESSAGES.LOGIN_SUCCESS
          : SUCCESS_MESSAGES.REGISTER_SUCCESS) as string),
      duration: 3000,
    });

    if (isLogin) {
      setToken(result?.token);
      await navigateTo('/');
    } else {
      await navigateTo('/movies');
    }
  } catch (error: unknown) {
    addAlert({
      type: 'error',
      message: getErrorMessage(error),
      duration: 5000,
    });
  }
};
</script>
