<script setup lang="ts">

import { ref, watch } from 'vue';
import Input from '@/components/core/Input.vue';
import { debounce } from '@/utils/utils';

const emit = defineEmits(['search']);
const searchTerm = ref('');

const debouncedSearch = debounce((value: string) => {
    emit('search', value);
}, 500);

watch(searchTerm, (newValue) => {
    debouncedSearch(newValue);
});

</script>

<template>
    <div class="container">
        <Input id="search-input" type="text" placeholder="Search here ..." v-model="searchTerm" />
    </div>
</template>

<style scoped>
::v-deep .input-element {
    width: 35%;
}
</style>