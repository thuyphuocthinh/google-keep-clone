<template>
  <div class="form">
    <div class="form-container">
      <h4 class="text-center mb-4">Login</h4>
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        :layout="formState.layout"
      >
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Please input your email!' },
            {
              pattern: new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
              message: 'Invalid email',
            },
          ]"
        >
          <a-input v-model:value="formState.email">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
            :loading="loading"
          >
            Log in
          </a-button>

          <div class="register-link">
            <span>Or</span>
            <a-button type="default">
              <router-link to="/auth/register">Register now</router-link>
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
import type { Ref } from "vue";
import { authService } from "../../services/authService";
import Cookies from "js-cookie";
import {
  LoadingOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import { TOKEN } from "../../constants/index";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
interface FormState {
  layout: "horizontal" | "vertical" | "inline";
  email: string;
  password: string;
}
const loading: Ref<Boolean> = ref(false);
const router = useRouter();
const store = useStore();
const formState = reactive<FormState>({
  email: "",
  password: "",
  layout: "vertical",
});

const onFinish = (values: any) => {
  try {
    const user: {
      email: string;
      password: string;
    } = {
      email: values.email,
      password: values.password,
    };
    loading.value = true;
    setTimeout(async () => {
      const result = await authService.loginService(user);
      if (result.status === 200 && result.data.success) {
        const data = result.data.data;
        const token = data.token;
        const user = {
          id: data.id,
          roleId: data.roleId,
          email: data.email,
          avatar: data.avatar,
          username: data.username,
        };
        // store token to cookies
        Cookies.set(TOKEN, token);
        // dispatch user to reducer
        store.dispatch("user/setUserLoginAction", user);
        // push to homepage
        router.push("/");
        setTimeout(() => {
          // toast
          toast.success(result.data.message);
        }, 100);
      } else {
        toast.error(result.data.message);
      }
      loading.value = false;
    }, 1000);
  } catch (error) {
    console.log("Login error");
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.email && formState.password);
});
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.form-container {
  max-width: 400px;
  width: 95%;
  margin: 0 auto;
}

.login-form {
  margin: 0 auto;
}

.login-form .login-form-button {
  width: 100%;
}

.register-link {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
