<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();

const store = useStore();

let data = reactive({
  email: "marklyan@gmail.com",
  password: "simple_password",
});

let loader = ref(false);

const Login = async () => {
  loader.value = true;
  try {
    let res = await axios.post("https://api.storerestapi.com/auth/login", data);
    if (res.data) {
      store.commit("SET_USER", JSON.stringify(data));
      store.commit("SET_TOKEN", res.data.data.access_token);
      localStorage.setItem("token", res.data.data.access_token);
      localStorage.setItem("user", JSON.stringify(data));
      router.push({ name: "Dashboard" });
    }
  } catch (err) {
    console.log(err);
  }
  loader.value = false;
};
</script>

<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
        <div class="row flex-grow">
          <div
            class="col-lg-6 d-flex align-items-center justify-content-center"
          >
            <div class="auth-form-transparent text-left p-3">
              <div class="brand-logo">
                <img src="/admin/images/logo.svg" alt="logo" />
              </div>
              <h4>New here?</h4>
              <h6 class="font-weight-light">
                Join us today! It takes only few steps
              </h6>
              <form class="pt-3" @submit.prevent="Login()">
                <div class="form-group">
                  <label>Email</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span
                        class="input-group-text bg-transparent border-right-0"
                      >
                        <i class="fa fa-user text-primary"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      class="form-control form-control-lg border-left-0"
                      placeholder="Email"
                      v-model="data.email"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span
                        class="input-group-text bg-transparent border-right-0"
                      >
                        <i class="fa fa-lock text-primary"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      class="form-control form-control-lg border-left-0"
                      id="exampleInputPassword"
                      placeholder="Password"
                      v-model="data.password"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    :disabled="!data.password"
                    class="btn btn-primary"
                    value="Login"
                  />
                </div>
                <span v-if="loader">Loading Please Wait</span>
              </form>
              <div class="text-center mt-4 font-weight-light">
                New To App!
                <router-link :to="{ name: 'Register' }" class="text-primary"
                  >Signup</router-link
                >
              </div>
            </div>
          </div>
          <div class="col-lg-6 register-half-bg d-flex flex-row">
            <p
              class="text-white font-weight-medium text-center flex-grow align-self-end"
            >
              Copyright &copy; 2018 All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
</template>
