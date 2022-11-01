<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";

const router = useRouter(); /// access the router properties
const route = useRoute();

let data = reactive({
  title: "",
  price: null,
  description: "",
  category: "",
}); //// data product reactive property
let categories = ref([]); /// categories array filled with the category data comes from API
let error = reactive({
  title: "",
  price: "",
  description: "",
  category: "",
}); /// set the error reactive property for validation

//// Add Product To The Server //////
const updateProduct = async () => {
  if (data.title.length === 0) {
    error.title = "Title Field is Required";
  } else if (data.price.length === 0) {
    error.price = "Price Field is Required";
  } else if (data.description.length === 0) {
    error.description = "Description Field is Required";
  } else if (data.category.length === 0) {
    error.category = "Category Field is Required";
  } else {
    try {
      let res = await axios.put(
        `https://api.storerestapi.com/products/${route.params.id}`,
        data
      );
      if (res.data) {
        router.push({ name: "Products" });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

//// keyup validation for product /////
const validationCheckTitle = () => {
  if (data.title.length > 0) {
    error.title = "";
  } else {
    error.title = "Title Field is Required";
  }
};

const validationCheckPrice = () => {
  if (data.price.length > 0) {
    error.price = "";
  } else {
    error.price = "Price Field is Required";
  }
};

const validationCheckDescription = () => {
  if (data.description.length > 0) {
    error.description = "";
  } else {
    error.description = "Description Field is Required";
  }
};

// list all categories from server /////
const listCategories = async () => {
  try {
    let res = await axios.get("https://api.storerestapi.com/categories");
    categories.value = res.data.data;
  } catch (err) {
    console.log(err);
  }
};

//// Get single record of product according to its id /////
const getProduct = async () => {
  try {
    let res = await axios.get(
      `https://api.storerestapi.com/products/${route.params.id}`
    );
    data.title = res.data.data.title;
    data.price = res.data.data.price;
    data.description = res.data.data.description;
    data.category = res.data.data.category.name;
  } catch (err) {
    console.log(err);
  }
};

/// lifecycle hook where all the list listed from server /////
onMounted(() => {
  listCategories();
  getProduct();
});
</script>

<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Update Product</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Products</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Add Product</h4>
              <form class="forms-sample" @submit.prevent="updateProduct()">
                <div class="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Title"
                    v-model.trim="data.title"
                    @keyup="validationCheckTitle()"
                    name="title"
                  />
                  <span class="text-danger pt-2">{{ error.title }}</span>
                </div>

                <div class="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Price"
                    v-model.trim="data.price"
                    @keyup="validationPrice()"
                    name="price"
                  />
                  <span class="text-danger pt-2">{{ error.price }}</span>
                </div>

                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    class="form-control"
                    placeholder="Description"
                    v-model.trim="data.description"
                    @keyup="validationCheckDescription()"
                    name="descripton"
                  ></textarea>
                  <span class="text-danger pt-2">{{ error.description }}</span>
                </div>

                <div class="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    class="form-control"
                    v-model.trim="data.category"
                  >
                    <option value="-1" disabled>Please Select Category</option>
                    <option
                      :value="category._id"
                      v-for="category in categories"
                      :key="category._id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                  <span class="text-danger pt-2">{{ error.category }}</span>
                </div>

                <button
                  type="submit"
                  :disabled="!data.category"
                  class="btn btn-primary mr-2"
                >
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
