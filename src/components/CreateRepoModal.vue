<template>
  <div class="create-modal">
    <div class="modal-content">
      <h2>Create New Repository</h2>
      <input
        type="text"
        placeholder="Repository Name"
        v-model="repoName"
      />
      <input
        type="text"
        placeholder="Description"
        v-model="description"
      />
      <input
        type="text"
        placeholder="Language"
        v-model="language"
      />
      <button class="button-7" @click="handleCreateRepo">Create Repository</button>
      <button class="button-7" @click="close">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repoName: '',
      description: '',
      language: '',
    };
  },
  methods: {
    handleCreateRepo() {
      this.$emit('submitRepo', { name: this.repoName, description: this.description, language: this.language });
      this.close();
    },
    close() {
      this.$emit('closeCreateRepo');
      this.repoName = "";
      this.description = "";
      this.language = "";
    }
  },
};
</script>

  
  <style scoped>
  .create-modal {
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
    width: 600px;
    height: 400px;
    padding: 10px;
    border-radius: 16px;
    border: 1px solid #fff;
    background: radial-gradient(79.31% 83.99% at 70.19% 34.42%, #336366 0%, #224244 100%);
  }
  
  input {
    width: 80%;
    height: 40px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #fff;
    background: #f0f0f0;
  }
  input:focus {
    outline: none;
  }
  button {
    width: 80%;
    height: 40px;
    border-radius: 8px;
    border: none;
    background: #336366;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .create-modal {
      padding: 0 20px;
    }
    h2 {
      font-size: 1.2rem;
    }
    input {
      width: 100%;
    }
    button {
      width: 100%;
    }
  }
  </style>
  