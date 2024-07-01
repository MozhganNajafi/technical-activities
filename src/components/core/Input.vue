<script setup lang="ts">
const model = defineModel({ required: true, default: '' });

const { placeholder, label, errorMessage } = defineProps({
  placeholder: {
    type: String,
    default: 'write something here ...',
    required: false
  },
  label: {
    type: String,
    required: false
  },
  errorMessage: {
    type: String,
    required: false
  }
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  model.value = target.value;
}
</script>


<template>
  <div class="input-container">
    <label :for="'input-element-' + label" class="input-label">{{ label }}</label>
    <input :id="'input-element-' + label" class="input-element" :placeholder="placeholder" v-model="model"
      @input="handleInput" />
    <span class="error">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.input-container {
  margin-bottom: 15px;
}

.input-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.error {
  color: red;
}

.input-element {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>