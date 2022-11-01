<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";

const router = useRouter();
const route = useRoute();

let name = ref(""); //// name category reactive property
let error = ref(""); /// set the error reactive property for validation

//// Update Category To The Server //////
const updateCategory = async () => {
  if (name.value.length === 0) {
    error.value = "Category Field is Required";
  } else {
    try {
      let res = await axios.put(
        `https://api.storerestapi.com/categories/${route.params.id}`,
        {
          name: name.value,
        }
      );
      if (res.data) {
        router.push({ name: "Categories" });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

//// keyup validation for category /////
const validationCheck = () => {
  if (name.value.length > 0) {
    error.value = "";
  } else {
    error.value = "Category Field is Required";
  }
};

//// Get single record of category according to its id /////
const getCategory = async () => {
  try {
    let res = await axios.get(
      `https://api.storerestapi.com/categories/${route.params.id}`
    );
    name.value = res.data.data.name;
  } catch (err) {
    console.log(err);
  }
};

/// lifecycle hook where the single record retrieve from server /////
onMounted(() => {
  getCategory();
});
</script>

<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Update Category</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'Categories' }">Categories</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Edit Category
            </li>
          </ol>
        </nav>
      </div>

      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Update Category</h4>
              <form class="forms-sample" @submit.prevent="updateCategory()">
                <div class="form-group">
                  <label for="exampleInputName1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputName1"
                    placeholder="Name"
                    v-model="name"
                    @keyup="validationCheck()"
                  />
                  <span class="text-danger pt-2">{{ error }}</span>
                </div>
                <button type="submit" class="btn btn-primary mr-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
