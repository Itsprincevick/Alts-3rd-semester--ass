<!-- Navbar.vue -->
<template>
  <div class="navbar">
    <div class="git">
      <img :src="github" alt="github" />
      <h1>PrincevickGitHub</h1>
    </div>
    <Menu />
  </div>
</template>

<script>
import github from '../assets/github.svg';
import Menu from './ToggleMenu.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Menu
  },
  data() {
    return {
      github
    };
  }
};
</script>

<style scoped>

.navbar {
  display: flex;
  width: Fixed (1, 440px);
  height: Hug (78px);
  padding: 24px 40px 24px 40px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
}
nav p {
  color: #ffffff;
}

.navbar img {
  width: 24px;
  height: 24px;
}

.navbar h1 {
  width: 176px;
  height: 30px;
  font-family: Roboto, sans-serif;
  font-size: 25px;
  font-weight: 500;
  line-height: 30px;
  text-align: left;
}
.git {
  display: flex;
  align-items: center;
  width: Hug (208px);
  height: Hug (30px);
  gap: 8px;
}


@media screen and (max-width: 768px) {
  .navbar {
    padding: 24px 15px 24px 15px;
    margin: 0;
  }
}

</style>
