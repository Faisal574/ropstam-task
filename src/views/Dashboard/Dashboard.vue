<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const productCount = ref(0);

const productCounts = async () => {
  try {
    let res = await axios.get("https://api.storerestapi.com/products");
    productCount.value = res.data.data.length;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  productCounts();
});

</script>

<template>
  <!-- partial -->
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Dashboard</h3>
      </div>
      <div class="row grid-margin">
        <div class="col-12">
          <div class="card card-statistics">
            <div class="card-body">
              <div
                class="d-flex flex-column flex-md-row align-items-center justify-content-between"
              >
                <div class="statistics-item">
                  <p>
                    <i class="icon-sm fa fa-user mr-2"></i>
                    Products
                  </p>
                  <h2>{{ productCount }}</h2>
                  <label class="badge badge-outline-success badge-pill"
                    >2.7% increase</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- content-wrapper ends -->
    <!-- partial:partials/_footer.html -->
    <footer class="footer">
      <div class="d-sm-flex justify-content-center justify-content-sm-between">
        <span
          class="text-muted text-center text-sm-left d-block d-sm-inline-block"
          >Copyright © 2018. All rights reserved.</span
        >
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"
          >Hand-crafted & made with <i class="far fa-heart text-danger"></i
        ></span>
      </div>
    </footer>
    <!-- partial -->
  </div>
  <!-- main-panel ends -->
</template>
