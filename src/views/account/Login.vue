<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    password: Yup.string().required('Password is required')
});

async function onSubmit(values) {
    console.log(values)
    const authStore = useAuthStore();
    const { username, password } = values;
    await authStore.login(username, password);
}
</script>

<template>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">

  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> register an new account</a>
      </p>
    </div>
    
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- <form class="space-y-6"> -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700"> Email address </label>
            <div class="mt-1">
              <Field id="username" name="username" type="email" autocomplete="email"  :class="{ 'is-invalid': errors.username }" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                <div class="invalid-feedback">{{ errors.username }}</div>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <Field id="password" name="password" type="password" autocomplete="current-password" required=""  :class="{ 'is-invalid': errors.password }" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                              <div class="invalid-feedback">{{ errors.password }}</div>

            </div>
          </div>

          <!-- <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Field id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
            </div>
          </div> -->

          <div>
            <button :disabled="isSubmitting" type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span v-show="isSubmitting" class=""></span>
                Sign in</button>
          </div>
        <!-- </form> -->

      </div>
    </div>
  </div>
      </Form>
</template>
