<script setup lang="ts">

import { ref, defineProps } from 'vue';
import SortIcon from '@/components/icons/SortIcon.vue';
import AscendingSortIcon from '@/components/icons/AscendingSortIcon.vue';
import DescendingSortIcon from '@/components/icons/DescendingSortIcon.vue';

const emit = defineEmits(['sort']);
const isAscending = ref(true);

const { isSelected } = defineProps<{
    isSelected: boolean
}>();

const handleClick = () => {

    emit('sort', isAscending.value);
    isAscending.value = !isAscending.value;

}
</script>

<template>
    <button title="Sort column" class="sort-button" @click="handleClick">
        <SortIcon v-if="!isSelected" class="sort-icon" />
        <AscendingSortIcon v-if="isSelected && isAscending" class="sort-icon" />
        <DescendingSortIcon v-if="isSelected && !isAscending" class="sort-icon" />
    </button>
</template>

<style scoped>
.sort-button {
    border: none;
    cursor: pointer;
    background-color: #6E7BD9;
}
</style>