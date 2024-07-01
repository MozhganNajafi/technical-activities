<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchData } from '@/utils/utils';
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue';

const locations = ref(null);
const error = ref(null);
const isLoading = ref(false);

const getEnabledLocations = async () => {
    isLoading.value = true
    try {
        const response = await fetchData('https://api.megaport.com/v2/locations');
        if (response) {
            locations.value = response;
            return response;
        }
    } catch (err: any) {
        error.value = err.message || 'An error occurred';
        return { error: error.value };
    } finally {
        isLoading.value = false;
    }
};

onMounted(getEnabledLocations);

</script>

<template>
    <div class="container">
        <div class="status">

            <p class="status-label">
                {{ isLoading ? 'Loading...' : 'Megaport Enabled Locations' }}
            </p>
            <SpinnerIcon class="spinner-icon" v-if="isLoading" />

        </div>
        <pre>{{ locations }}</pre>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: left;
    flex-direction: column;
    margin-top: 20px;
}

.status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px 0;
    align-items: center;
}

.status-label {
    margin-bottom: 10px;
    font-weight: bold;
}

.spinner-icon {
    margin-left: 5px;
    padding-top: 5px;
}

pre {
    background-color: #f8f8f8;
    padding: 1em;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 90%;
    overflow-x: auto;
    white-space: pre-wrap;
    min-width: 80vw;
    min-height: 100vh;
}
</style>
