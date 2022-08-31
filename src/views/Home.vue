<template>
  <div class="home">
    <div class="form">
      <h2>Login Form</h2>
      <form @submit.prevent="gotologin">
        <div class="form-group">
          <label class="label">Email address</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Enter email"
            important
          />
        </div>
        <div class="form-group">
          <label class="label">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
            important
          />
        </div>
        <div class="register">
          You don't have an account ?
          <router-link to="/register" class="link_register"
            >Register</router-link
          ><br />
          <button type="submit" class="button">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    gotologin() {
      if (
        this.email == "" ||
        this.password == "" ||
        !this.email.includes("@") ||
        !this.email.includes(".com") ||
        this.password.length > 5 ||
        this.password.length < 11
      ) {
        alert("Please fill all the fields properly");
      } else {
        axios({
          method: "post",
          url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgctRRmWxeGm9SBIw2o4DKiH498CW-PYw",
          data: {
            email: this.email,
            password: this.password,
            returnSecureToken: true,
          },
        })
          .then((response) => {
            console.log(response.data);
            Cookies.set("token", response.data.idToken);
            console.log(response.data.refreshToken);
            Cookies.set("refreshToken", response.data.refreshToken);
            Cookies.set("user", response.data.email);
            console.log(response.data.email);
            this.$store.commit("setauth", {
              token: response.data.idToken,
              refreshToken: response.data.refreshToken,
              user: response.data.email,
            });
            this.$router.push("/dashboard");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.home {
  padding: 0;
  margin: 0;
  color: #2c3e50;
}
.form {
  text-align: left;
  width: 400px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #d3d3d3;
  background: #fefefe;
  border-radius: 5px;
  padding: 4rem 4rem;
}
.label {
  font-size: 18px;
}

.form-control {
  width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.register {
  color: #2c3e50;
  margin-top: 10px;
  text-align: center;
}

.button {
  margin-top: 18px;
  background-color: green;
  color: white;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  width: 100px;
  border-radius: 20px;
  font-size: 15px;
}

.link_register {
  color: #92c7fd;
  text-decoration: none;
}
</style>
