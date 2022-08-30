<template>
  <div class="header">
    <router-link to="/" class="menu">Login Page</router-link>
    <div class="header-nav">
      <router-link to="/dashboard" class="menu" v-if="!isLoggedIn"
        >Dashboard</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      if (this.$store.getters.isLoggedIn === null) {
        return true;
      } else {
        return false;
      }
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
.menu {
  text-decoration: none;
  margin: 0px 5px 0px 5px;
}
</style>
