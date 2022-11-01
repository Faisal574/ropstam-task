<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";
import useDatatable from "../../use/useDatatable";

const router = useRouter(); /// access the router properties

const { initDatatable } = useDatatable();

let data = reactive({
  title: "",
  price: null,
  description: "",
  category: "",
}); //// data product reactive property
let products = ref([]); /// products array filled with the category data comes from API
let categories = ref([]); /// categories array filled with the category data comes from API
let error = reactive({
  title: "",
  price: "",
  description: "",
  category: "",
}); /// set the error reactive property for validation

//// Add Product To The Server //////
const addProduct = async () => {
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
      let res = await axios.post("https://api.storerestapi.com/products", data);
      products.value.unshift(res.data.data);
      for (const prop of Object.getOwnPropertyNames(data)) {
        delete data[prop];
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

// list all products from server /////
const listProducts = async () => {
  try {
    let res = await axios.get("https://api.storerestapi.com/products");
    products.value = res.data.data;
    nextTick(() => {
      initDatatable();
    });
  } catch (err) {
    console.log(err);
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

//// delete specific product through its id from server //////
const deleteProduct = async (id) => {
  try {
    let res = await axios.delete(`https://api.storerestapi.com/products/${id}`);
    let find = products.value.find((item) => item.slug === id);
    products.value.splice(find, 1);
  } catch (err) {
    console.log(err);
  }
};

/// click goes to the edit page ////
const gotToEditProduct = (id) => {
  router.push({ name: "EditProduct", params: { id: id } });
};

/// lifecycle hook where all the list listed from server /////
onMounted(() => {
  listCategories();
  listProducts();
});
</script>

<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Add Product</h3>
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
              <form class="forms-sample" @submit.prevent="addProduct()">
                <div class="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Title"
                    v-model.trim="data.title"
                    @keyup="validationCheckTitle()"
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
                    @keyup="validationCheckPrice()"
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
                  ></textarea>
                  <span class="text-danger pt-2">{{ error.description }}</span>
                </div>

                <div class="form-group">
                  <label>Category</label>
                  <select class="form-control" v-model.trim="data.category">
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
      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Products</h4>
              <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                    <table id="order-listing" class="table">
                      <thead>
                        <tr>
                          <th>Sno</th>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Category</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="product in products" :key="product._id">
                          <td>{{ product._id }}</td>
                          <td>{{ product.title }}</td>
                          <td>{{ product.price }}</td>
                          <td>{{ product.description }}</td>
                          <td>{{ product.category.name }}</td>
                          <td>
                            <button
                              class="btn btn-outline-success"
                              @click="gotToEditProduct(product.slug)"
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              class="btn btn-outline-danger"
                              @click="deleteProduct(product.slug)"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
