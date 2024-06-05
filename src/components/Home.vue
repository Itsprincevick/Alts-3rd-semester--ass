<template>
    <div class="home">
      <div class="intro-section">
        <div class="intro">
          <img class="arrow" :src="Arrow" alt="Arrow" />
          <p class="welcome">Welcome to my space <img :src="Desktop" alt="Desktop" /></p>
          <h1 class="my-name">VICTOR ONIPE</h1>
          <p>A Software and a Web Developer. I love coding and learning</p>
        </div>
        <div>
          <img class="dp" :src="Dp" alt="Dp" />
        </div>
      </div>
      <footer>
        <img :src="Location" alt="Location" />
        <div class="socials">
          <a href="mailto:victoronipe565@gmail.com"><img :src="Email" alt="Email" /></a>
          <a href="https://www.linkedin.com/in/victor-onipe-a34661288/" target="_blank"><img :src="LinkedIn" alt="LinkedIn" /></a>
          <a href="https://x.com/itsprincevick" target="-blank"><img :src="Twitter" alt="Twitter" /></a>
          <a href="https://github.com/itsprincevick" target="-blank"><img :src="Github" alt="Github" /></a>
        </div>
        <p>&#169; 2024 my portfolio</p>
      </footer>
    </div>
  </template>
  
  <script>
  import Arrow from "../assets/Arrow.svg";
  import Desktop from "../assets/Desktop.svg";
  import Dp from "../assets/images/Dp.png";
  import Location from "../assets/Location.svg";
  import Email from "../assets/Email.svg";
  import Twitter from "../assets/fa6-brands_square-x-twitter.svg";
  import LinkedIn from "../assets/LinkedIn.svg";
  import Github from "../assets/LilGithub.svg";
  import "../styles/home.css";
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data() {
      return {
        Arrow,
        Desktop,
        Dp,
        Location,
        Email,
        Twitter,
        LinkedIn,
        Github,
      };
    }

  };
  </script>
  
  <style scoped src="../styles/home.css"></style>
  