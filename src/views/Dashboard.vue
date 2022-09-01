<template>
  <div class="about">
    <h1>Welcome, "{{ this.$store.getters.username }}" to Dashboard</h1>
    <p>This is the Dashboard</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      polling: null,
    };
  },
  methods: {
    pollData() {
      // console.log("polling");
      if (this.$store.getters["isAuth"]) {
        console.log("polling");
        this.polling = setInterval(() => {
          this.$store.dispatch("refreshToken");
        }, 900000);
      } else {
        clearInterval(this.polling);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  created() {
    this.pollData();
  },
};
</script>
