<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
    <main class="main-repo">
      <div class="searchBar">
        <button class="repo-btn" @click="showCreateRepo = true">
          <font-awesome-icon :icon="['fas', 'plus-circle']" class="add" />
          Create Repository
        </button>
  
        <span>
          <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
          <input
            type="text"
            placeholder="Search repository"
            v-model="searchTerm"
          />
        </span>
        <span>
          <font-awesome-icon :icon="['fas', 'sliders-h']" class="slider" />
          <select v-model="filterLanguage" class="filter" @change="handleFilterLanguage">
            <option value="">Filter by language</option>
            <option value="JavaScript">JavaScript</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
          </select>
          <font-awesome-icon :icon="['fas', 'caret-down']" class="dropdown" />
        </span>
      </div>
      <section class="repo-container">
        <div v-for="repo in filteredUser" :key="repo.id" class="repo-card">
          <router-link :to="'/details/' + repo.name" @click.native="showRepoDetails = true">
            <h2 class="repo-name">{{ repo.name }}</h2>
          </router-link>
          <p class="language">
            &lt;/&gt; &nbsp;
            {{ repo.language === null ? "none" : repo.language }}
          </p>
          <p class="date">
            <img class="cal" :src="calendarIcon" alt="Calendar Icon" />
            &nbsp;&nbsp; {{ repo.created_at }}
          </p>
          <p class="visibility">
            <font-awesome-icon :icon="['fas', 'eye']" class="eye-icon" />
            &nbsp;&nbsp; {{ repo.visibility }}
          </p>
          <button @click="openModal(repo)">Manage</button>
        </div>
      </section>
      <div v-if="modal" class="modal">
        <div class="modal-content">
          <span class="span">
            <h2>Delete Project</h2>
            <p>This action can't be undone</p>
          </span>
          <span class="btns">
            <button class="button" @click="deleteRepo">Delete</button>
            <button class="button" @click="closeModal">Cancel</button>
          </span>
        </div>
      </div>
      <RepoDetails
        v-if="showRepoDetails"
        :repo="selectedRepo"
        @closeRepoDetails="showRepoDetails = false"
      />
      <CreateRepo
      v-if="showCreateRepo"
      @closeCreateRepo="handleCloseCreateRepo"
      @submitRepo="createRepository"
    />
    <div class="pagination">
        <button
          class="nav-btn"
          role="button"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" class="chevron" />
          <span class="text">Previous</span>
        </button>
        <button
          class="nav-btn"
          role="button"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          <span class="text">
            {{ currentPage === totalPages ? "End of Repos" : "Next" }}
          </span>
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="chevron" />
        </button>
      </div>
    </main>
    <p class="footer">&#169; 2024 my portfolio</p>
  </template>
  
  <script>
  import axios from 'axios';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import {
    faPlusCircle,
    faSlidersH,
    faCaretDown,
    faSearch,
    faEye,
    faChevronLeft,
    faChevronRight
  } from '@fortawesome/free-solid-svg-icons';
  import calendarIcon from '../assets/CalendarIcon.svg';
  import CreateRepo from './CreateRepo.vue';
  import RepoDetails from './RepoDetails.vue';
  
  library.add(faPlusCircle, faSlidersH, faCaretDown, faSearch, faEye, faChevronLeft, faChevronRight);
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Repository',
    components: {
      FontAwesomeIcon,
      CreateRepo,
      RepoDetails,
    },
    data() {
      return {
        user: [],
        currentPage: 1,
        searchTerm: '',
        filterLanguage: '',
        totalPages: 1,
        modal: false,
        selectedRepo: null,
        showCreateRepo: false,
        showRepoDetails: false,
        calendarIcon,
      };
    },
    computed: {
      filteredUser() {
        return this.user.filter(repo => {
          return (
            repo.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
            (this.filterLanguage === '' || repo.language === this.filterLanguage)
          );
        });
      }
    },
    watch: {
      currentPage() {
        this.fetchRepos();
      },
      searchTerm() {
        this.fetchRepos();
      },
      filterLanguage() {
        this.fetchRepos();
      }
    },
    mounted() {
      this.fetchRepos();
    },
    methods: {
      fetchRepos() {
        const apiToken = import.meta.env.VITE_APP_API_TOKEN;
        axios
          .get('https://api.github.com/search/repositories', {
            params: {
              q: `user:Itsprincevick ${this.searchTerm}`,
              per_page: 4,
              page: this.currentPage
            },
            headers: {
              Authorization: `${apiToken}`
            }
          })
          .then(response => {
            this.user = response.data.items;
            const totalItems = response.data.total_count;
            this.totalPages = Math.ceil(totalItems / 3);
          });
      },
      nextPage() {
        this.currentPage += 1;
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage -= 1;
        }
      },
      handleFilterLanguage(event) {
        this.filterLanguage = event.target.value;
        this.currentPage = 1;
      },
      openModal(repo) {
        document.body.classList.add('openModal');
        this.selectedRepo = repo;
        this.modal = true;
      },
      closeModal() {
        document.body.classList.remove('openModal');
        this.modal = false;
      },
      deleteRepo() {
        const apiToken = '';
;
        axios
          .delete(`https://api.github.com/repos/Itsprincevick/${this.selectedRepo.name}`, {
            headers: {
              Authorization: `token ${apiToken}`
            }
          })
          .then(() => {
            this.modal = false;
            this.fetchRepos();
          })
          .catch(error => {
            console.error('Error deleting repo:', error);
          });
      },
    }
  };
  </script>
  
  <style scoped>
  .main-repo {
    padding-bottom: 20px;
  }
  .searchBar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  animation: slideFromRight 2s ease forwards;
}
.searchBar input {
  width: 609px;
  height: 50px;
  padding: 10px 24px 10px 80px;
  gap: 16px;
  border: none;
  outline: none;
  border-radius: 50px;
  font-weight: 400;
  color: #fff;
  font-size: 1rem;
  background-color: #244547;
  padding: 0.5rem 4.3rem;
  font-size: 1rem;
}
.searchBar input::placeholder {
  font-weight: 400;
  font-size: 1rem;
  color: #fff;
  opacity: 1;
}
.search-icon {
  position: absolute;
  font-size: 20px;
  top: 15px;
  left: 35px;
}

.searchBar select {
  width: 243px;
  height: 50px;
  padding: 10px 24px 10px 24px;
  gap: 6px;
  border-radius: 50px;
  border: none;
  background-color: #244547;
  color: #fff;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: center;
  cursor: pointer;
}

.searchBar span {
  position: relative;
}
.slider {
  position: absolute;
  font-size: 20px;
  rotate: 180deg;
  top: 16px;
  left: 30px;
}
.dropdown {
  position: absolute;
  font-size: 15px;
  top: 18px;
  right: 30px;
}

.repo-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  appearance: none;
  background-color: #ffffff;
  border-radius: 40em;
  border-style: none;
  height: 50px;
  box-sizing: border-box;
  color: #244547;
  cursor: pointer;
  padding: 0.5rem 1.3rem;
}

.repo-container {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  width: 88.3%;
  height: auto;
  margin: 0 auto;
}
.repo-card {
  width: 385px;
  height: 273px;
  padding: 15px;
  border-radius: 16px;
  border: 0.5px solid #fff;
  opacity: 1;
  transform: translateY(20px);
  animation: fadeInUp 1s ease forwards;
}

.cal {
  width: 18px;
  height: 18px;
  transform: translateY(15%);
}
.eye-icon {
  width: 18px;
  height: 18px;
  transform: translateY(20%);
}
a {
  text-decoration: none;
  color: #fff;
}
p {
    padding: 5px 0;
    font-weight: 500;
    font-size: 1rem;
}

.repo-name {
  color: #ffffff;
  font-size: 1.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 20px 0 10px 0;
}

.repo-card button {
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  color: #182e2f;
  cursor: pointer;
  height: 46px;
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  transform: translateY(60%);
}

.repo-card button:hover {
  opacity: 0.9;
}


.pagination {
  display: flex;
  justify-content: right;
  gap: 10px;
  margin: 40px 80px 20px 0;
}

.nav-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 134px;
  height: 50px;
  padding: 10px 2px;
  gap: 8px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #244547;
  background-color: #fff;
  cursor: pointer;
}
.nav-btn:hover {
  opacity: 0.9;
}

.chevron {
  font-size: 24px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  z-index: 1000;
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 400px;
  height: 200px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #fff;
  background: radial-gradient(79.31% 83.99% at 70.19% 34.42%, #336366 0%, #224244 100%);
}

.btns {
  display: flex;
  gap: 15px;
}
.button {
  width: 100px;
  height: 40px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
}

.footer {
      position: absolute;
     left: 20px;
      font-size: 1rem;
      font-weight: 400;
      transform: translateY(-25px);
  }


/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFromRight {
  from {
    transform: translateX(20%);
  }
  to {
    transform: translateX(0);
  }
}

@media screen and (max-width: 768px) {
  .searchBar {
    flex-wrap: wrap;
    gap: 4px;
    padding: 0 15px;
  }
  .searchBar input {
    width: 210px;
    height: 41px;
    padding: 10px 16px 10px 16px;
    padding: 0.5rem 3.3rem;
  }
  .searchBar input::placeholder {
    font-size: 13px;
  }
  .search-icon {
   font-size: 16px;
   left: 25px;
   top: 13px;
  }
  
  .searchBar select {
    width: 115px;
    height: 41px;
    padding: 10px 42px;
    border-radius: 50px;
  }
  .slider {
    font-size: 14px;
    left: 18px;
    top: 14px;
  }
  .dropdown {
    font-size: 12px;
    right: 22px;
    top: 14px;
  }

  .repo-btn {
    order: 3;
    width: 100%;
    height: 44px;
    padding: 0.5rem auto;
    margin-top: 10px;
    justify-content: center;
  }

  .repo-container {
    width: 100%;
    padding: 0 15px;
  }
  .repo-card {
    padding: 10px 15px;
    height: auto;
  }
  .repo-name {
  font-size: 25px;
  font-weight: 500;
  margin: 10px 0 10px 0;
  }
  .repo-card button {
    height: 40px;
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    transform: translateY(0);
    margin-top: 20px;
  }

  .modal {
    padding: 0 50px;
  }
  .pagination {
    width: 100%;
    margin-top: 20px;
    justify-content: center;
    gap: 40px;
  }
}

  </style>
  