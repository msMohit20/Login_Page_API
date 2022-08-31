<template>
  <div class="header">
    <router-link to="/" class="menu">Login Page</router-link>
    <div class="header-nav">
      <router-link to="/dashboard" class="menu" v-if="isLogIn"
        >Dashboard</router-link
      >
      <p class="menu" v-if="isLogIn" @click="logout">LogOut</p>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  computed: {
    isLogIn() {
      console.log(this.$store.getters["isLoggedIn"]);
      if (this.$store.getters["isLoggedIn"]) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    logout() {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("user");
      this.$router.push("/");
      location.reload();
    },
  },
};
</script>

<style scoped>
.header {
  color: #2c3e50;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  background: #f1f1f1;
  padding: 8px;
  top: 0;
}

.header-nav {
  display: flex;
  justify-content: space-between;
}
.menu {
  text-decoration: none;
  margin: 0px 5px 0px 5px;
  color: #2c3e50;
}
</style>
