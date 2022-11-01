<script setup>
import store from '../store';

</script>

<template>
          <!-- partial:partials/_sidebar.html -->
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item nav-profile">
            <div class="nav-link">
              <div class="profile-image">
                <img src="/admin/images/faces/face5.jpg" alt="image"/>
              </div>
              <div class="profile-name">
                <p class="name">
                  Welcome Jane
                </p>
                <p class="designation">
                  {{$store.state.user.email}}
                </p>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Dashboard'}">
              <i class="fa fa-home menu-icon"></i>
              <span class="menu-title">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Categories'}">
              <i class="far fa-file-alt menu-icon"></i>
              <span class="menu-title">Categories</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Products'}">
              <i class="far fa-file-alt menu-icon"></i>
              <span class="menu-title">Products</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- partial -->
</template>