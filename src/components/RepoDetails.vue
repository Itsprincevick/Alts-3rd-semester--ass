<template>
    <main>
      <div id="repodetail">
        <div class="repodetail-card">
          <h2 class="repo-name">{{ details.name }}</h2>
          <router-link to="/repository"><button class="close">&times;</button></router-link>
          <div class="repo-mini-details">
            <p>
              <font-awesome-icon :icon="['fas', 'star']" />&nbsp; Stars:&nbsp; {{ details.stargazers_count }}
            </p>
            <p>
              <font-awesome-icon :icon="['fas', 'eye']" />&nbsp; Watch:&nbsp; {{ details.watchers }}
            </p>
            <p>
              <font-awesome-icon :icon="['fas', 'code-fork']" />&nbsp; Forks:&nbsp; {{ details.forks }}
            </p>
            <p>
              <font-awesome-icon icon="code-branch" />&nbsp; Branches:&nbsp; {{ branch.length }}
            </p>
          </div>
          <p>
           <font-awesome-icon icon="code" />&nbsp;  Language:&nbsp; {{ details.language === null ? "none" : details.language }}
          </p>
          <p>
            <font-awesome-icon icon="globe" />&nbsp;
            Live site: &nbsp;
            <span v-if="deployment.length === 0">none</span>
            <a v-else :href="`https://Itsprincevick.github.io/${details.name}`">
              Itsprincevick.github.io/{{ details.name }}
            </a>
          </p>
          <button class="repo-btn">
            <a :href="`https://github.com/${details.full_name}`">View on Github</a>
          </button>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faStar, faCodeFork, faCodeBranch, faCode, faGlobe, faEye } from '@fortawesome/free-solid-svg-icons';
  
  library.add(faStar, faCodeFork, faCodeBranch, faCode, faGlobe, faEye);

  export default {
    name: 'RepoDetails',
    components: {
      FontAwesomeIcon
    },
    setup() {
      const route = useRoute();
      const { id } = route.params;
  
      const details = ref({});
      const branch = ref([]);
      const deployment = ref([]);
  
      const fetchRepoDetails = async () => {
        const response = await fetch(`https://api.github.com/repos/Itsprincevick/${id}`);
        details.value = await response.json();
      };
  
      const fetchRepoBranches = async () => {
        const response = await fetch(`https://api.github.com/repos/Itsprincevick/${id}/branches`);
        branch.value = await response.json();
      };
  
      const fetchRepoDeployments = async () => {
        const response = await fetch(`https://api.github.com/repos/Itsprincevick/${id}/deployments`);
        deployment.value = await response.json();
      };
  
      onMounted(() => {
        fetchRepoDetails();
        fetchRepoBranches();
        fetchRepoDeployments();
      });
  
      return {
        details,
        branch,
        deployment
      };
    }
  };
  </script>
  
  <style scoped>
 
 main {
  padding: 0 15px;
  transform: translateY(10%);
 }

  #repodetail {
  position: relative;  
  margin: auto;
  width: 696px;
  height: 385px;
  padding: 25px 40px;
  gap: 56px;
  border-radius: 16px;
  border: 1px solid #fff;
  background: radial-gradient(79.31% 83.99% at 70.19% 34.42%, #336366 0%, #224244 100%);
  transform: translateY(0); 
  animation: fadeInUp 1.5s ease forwards;
}


#repodetail p {
  padding: 15px 0;
  word-break: break-all;
}
.close {
  position: absolute;
  right: 50px;
  top: 42px;
  border: none;
  background: none;
  font-size: 2rem;
  font-weight: 300;
  color: #fff;
  cursor: pointer;
}
.close:hover {
  transform: scale(1.1);

}

.repo-mini-details {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.repo-mini-details p {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.repo-name {
  color: #ffffff;
  font-size: 1.9rem;
  word-break: break-word;
  margin: 20px 0 10px 0;
}
a {
  color:#99CACC;
  text-decoration: none;

}


.repo-btn {
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
  transform: translateY(100%);
}

.repo-btn:hover {
  opacity: 0.9;
}
.repo-btn a {
  text-decoration: none;
  color: #182e2f;

font-size: 1rem;
font-weight: 500;
line-height: 25.6px;

}

@keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(50%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  

  @media screen and (max-width: 768px) {
    #repodetail {
      width: 100%;
      height: 100%;
      padding: 25px 15px;
    }
    .repo-name {
      font-size: 1.5rem;
      margin: 5px 0 0;
    }
    .close {
      right: 20px;
      top: 25px
    }
    .repo-mini-details {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
    }
    #repodetail p {
      font-size: large;
    }
    
    a {
      display: block;
      font-size: 16px;
      font-weight: 400;
      line-height: 25.6px;
    }

    .repo-btn {
      transform: translateY(0);
    }
  }
  </style>
  