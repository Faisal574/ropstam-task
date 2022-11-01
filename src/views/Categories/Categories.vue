<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { nextTick, onMounted } from "@vue/runtime-core";
import axios from "axios";
import useDatatable from "../../use/useDatatable";

const router = useRouter(); /// access the router properties

const { initDatatable } = useDatatable();

let name = ref(""); //// name category reactive property
let categories = ref([]); /// categories array filled with the category data comes from API
let error = ref(""); /// set the error reactive property for validation

//// Add Category To The Server //////
const addCategory = async () => {
  if (name.value.length === 0) {
    error.value = "Category Field is Required";
  } else {
    try {
      let res = await axios.post("https://api.storerestapi.com/categories", {
        name: name.value,
      });
      categories.value.unshift(res.data.data);
      name.value = "";
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

//// list all categories from server /////
const listCategories = async () => {
  try {
    let res = await axios.get("https://api.storerestapi.com/categories");
    categories.value = res.data.data;
    nextTick(() => {
      initDatatable();
    });
  } catch (err) {
    console.log(err);
  }
};

//// delete specific category through its id from server //////
const deleteCategory = async (id) => {
  try {
    let res = await axios.delete(
      `https://api.storerestapi.com/categories/${id}`
    );
    let find = categories.value.find((item) => item.slug === id);
    categories.value.splice(find, 1);
  } catch (err) {
    console.log(err);
  }
};

/// click goes to the edit page ////
const gotToEditcategory = (id) => {
  router.push({ name: "EditCategory", params: { id: id } });
};

/// lifecycle hook where all the list listed from server /////
onMounted(() => {
  listCategories();
});
</script>

<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Add Category</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Categories
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Add Category</h4>
              <form class="forms-sample" @submit.prevent="addCategory()">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    v-model.trim="name"
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
      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Categories</h4>
              <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                    <table id="order-listing" class="table">
                      <thead>
                        <tr>
                          <th>Sno</th>
                          <th>Name</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="category in categories" :key="category._id">
                          <td>{{ category._id }}</td>
                          <td>{{ category.name }}</td>
                          <td>
                            <button
                              class="btn btn-outline-success"
                              @click="gotToEditcategory(category.slug)"
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              class="btn btn-outline-danger"
                              @click="deleteCategory(category.slug)"
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
