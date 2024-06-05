
<template>
  <div class="nav">
    <ul v-show="!mobile" class="navigation">
      <li>
        <router-link to="/" active-class="active">Home</router-link>
      </li>
      <li>
        <router-link to="/about" active-class="active">About</router-link>
      </li>
      <li>
        <router-link to="/repository" active-class="active">Repository</router-link>
      </li>
    </ul>
    <label for="checkbox" class="toggle" @click="toggleMobileNav" v-show="mobile" :class="{'toggle-active': mobileNav}">
      <div class="bars" id="bar1"></div>
      <div class="bars" id="bar2"></div>
      <div class="bars" id="bar3"></div>
    </label>
      <transition class="mobileNav">
        <ul :class="['dropdown-nav', mobileNav ? 'slide-in' : 'slide-out']" v-show="mobile">
          <li>
            <router-link to="/" active-class="active" @click="toggleMobileNav">Home</router-link>
          </li>
          <li>
            <router-link to="/about" active-class="active" @click="toggleMobileNav">About</router-link>
          </li>
          <li>
            <router-link to="/repository" active-class="active" @click="toggleMobileNav">Repository</router-link>
          </li>
        </ul>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'ToggleMenu',
  data() {
    return {
      mobile: true, 
      mobileNav: false,
    };
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    handleResize() {
      this.mobile = window.innerWidth <= 768;
      if (!this.mobile) {
        this.mobileNav = false;
      }
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
.nav ul {
  display: flex;
  list-style: none;
  gap: 40px;
}

.nav ul li a {
  position: relative;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #448588;
  cursor: pointer;
  text-decoration: none;
  padding: 5px 0;
}

.nav ul li a::before {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform-origin: left;
  transform: translateX(-50%) scaleX(0);
  transition: transform 0.3s ease-in-out;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
}

.nav ul li a.active::before {
  transform: translateX(-50%) scaleX(1);
}

.nav ul li a.active {
  font-weight: 500;
  color: #ffffff;
}

.toggle {
  position: relative;
  width: 30px;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition-duration: 0.5s;
}

.bars {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 4px;
}

#bar2 {
  transition-duration: 0.8s;
}

.toggle.toggle-active .bars {
  position: absolute;
  transition-duration: 0.5s;
}

.toggle.toggle-active #bar2 {
  transform: scaleX(0);
  transition-duration: 0.5s;
}

.toggle.toggle-active #bar1 {
  width: 100%;
  transform: rotate(45deg);
  transition-duration: 0.5s;
}

.toggle.toggle-active #bar3 {
  width: 100%;
  transform: rotate(-45deg);
  transition-duration: 0.5s;
}

.toggle.toggle-active {
  transition-duration: 0.5s;
  transform: rotate(180deg);
}

.dropdown-nav {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 250px;
  height: 100vh;
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  padding: 30px 0 0 20px;
  align-items: center;
  z-index: 9;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}
.slide-in {
  animation-name: slideIn;
}

.slide-out {
  animation-name: slideOut;
}
.dropdown-nav li {
  width: 100%;
  text-align: left;
}
.nav .dropdown-nav li a {
  width: 100%;
  font-weight: 700;
  color: #448588;
  cursor: pointer;
  font-size: 1.5rem;
  transition: .5 ease-in;
}
.nav .dropdown-nav li a:hover {
  color: #ffffff;
  opacity: 0.7;
}


@keyframes slideIn {
  from {
    transform: translateX(-250px);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-250px);
  }
}

@media screen and (max-width: 768px) {
  .toggle {
    display: flex;
  }
}


</style>
