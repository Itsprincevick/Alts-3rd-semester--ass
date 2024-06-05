<template>
  <div>
    <CreateRepoModal v-if="showCreateRepo" @submitRepo="createRepository" @closeCreateRepo="handleCloseCreateRepo" />
  </div>
</template>

<script>
import axios from 'axios';
import CreateRepoModal from './CreateRepoModal.vue';

export default {
  components: {
    CreateRepoModal,
  },
  data() {
    return {
      showCreateRepo: true, // Ensure this is true to display the modal for testing
    };
  },
  methods: {
    createRepository({ name, description, language }) {
      const apiToken = import.meta.env.VITE_APP_API_TOKEN;
;
      console.log(this.createRepository)
      axios
        .post(
          'https://api.github.com/user/repos',
          {
            name: name,
            description: description,
            language: language,
          },
          {
            headers: {
              Authorization: `${apiToken}`,
            },
          }
        )
        .then(() => {
          this.fetchRepos();
          this.showCreateRepo = false;
        })
        .catch(error => {
          console.error('Error creating repository:', error);
        });
    },
    handleCloseCreateRepo() {
      this.showCreateRepo = false;
    },
    fetchRepos() {
      // Implement fetch logic
    },
  },
};
</script>



  
  <style scoped>
  /* Add any styles here if needed */
  </style>
  