<template>
    <div class="about-page">
      <div class="about-info">
        <div class="about">
          <img :src="Dp" alt="Profile Picture" />
          <span>
            <h1 class="my-name">VICTOR ONIPE</h1>
            <p>A Software and A Web Developer. I love coding and learning</p>
          </span>
          <p>
            The GitHub Repositories Portfolio Web App is a showcase of my personal
            GitHub repositories. It provides an organized and user-friendly
            interface for visitors to explore my coding projects, view repository
            details, and understand my technical expertise.
          </p>
        </div>
        <div class="wrapper">
          <div class="parent-tab">
            <input type="radio" name="tab" id="tab-1" checked />
            <label for="tab-1">
              <span>Key Features:</span>
              <div class="icon">
                <!-- Add icon here if needed -->
              </div>
            </label>
            <div class="content">
              <ul>
                <li>
                  Repository List: Display a paginated list of all my GitHub
                  repositories.
                </li>
                <li>
                  Search and Filter: Implement search functionality to find
                  specific repositories by name or other criteria.
                </li>
                <li>
                  Single Repo Page: Create separate pages for detailed
                  information about each repository.
                </li>
                <li>
                  Error Handling: Gracefully handle errors and display
                  friendly messages.
                </li>
                <li>
                  Responsive Design: Ensure the app works seamlessly across
                  different devices.
                </li>
              </ul>
            </div>
          </div>
  
          <div class="parent-tab">
            <input type="radio" name="tab" id="tab-2" />
            <label for="tab-2">
              <span>Why This Project?</span>
              <div class="icon">
                <!-- Add icon here if needed -->
              </div>
            </label>
            <div class="content">
              <ul>
                <li>
                  As a developer, I want to showcase my work and skills to
                  potential employers, collaborators, and the tech community.
                </li>
                <li>
                  Visitors can explore my projects, understand my coding
                  style, and assess my contributions.
                </li>
              </ul>
            </div>
          </div>
  
          <div class="parent-tab">
            <input type="radio" name="tab" id="tab-3" />
            <label for="tab-3">
              <span>Technologies Used:</span>
              <div class="icon">
                <!-- Add icon here if needed -->
              </div>
            </label>
            <div class="content">
              <ul>
                <li>React (for building the frontend)</li>
                <li>GitHub API (for fetching repository data)</li>
                <li>React Router (for navigation)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p class="footer">&#169; 2024 my portfolio</p>
    </div>
  </template>
  
  <script>
  import Dp from "../assets/images/Dp.png";
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'About',
    data() {
      return {
        Dp
      };
    }
  };
  </script>
  
  <style scoped src="../styles/about.css"></style>
  