<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/core/Input.vue'
import { getPropertyValueByPath } from '@/utils/utils';

let sampleObj: Object = {
    "name": "Megaport",
    "address": {
        "office": {
            "unit": "Level 3",
            "street": "825 Ann Street",
            "suburb": "Fortitude Valley",
            "city": "Brisbane",
            "state": "Queensland",
            "postcode": 4006
        }
    },
    "industry": {
        "type": "Internet and telecommunications",
        "asxListed": true
    }
};

const propertyValue = ref(null);
const path = ref('');
const objectModel = ref(null);
const errorMessage = ref('');
const requiredErrorMessage = ref('');

const clickHandler = () => {
    if (!path.value) {
        requiredErrorMessage.value = 'This field is required!';
        propertyValue.value = null;
        return;
    }
    if (objectModel.value) {
        try {
            sampleObj = JSON.parse(objectModel.value);
        } catch (error) {
            errorMessage.value = 'Invalid Object Format';
            propertyValue.value = null;
            return;
        }
    }
    errorMessage.value = "";
    requiredErrorMessage.value = "";
    propertyValue.value = getPropertyValueByPath(path.value, sampleObj);
};

</script>

<template>
    <div class="container">
        <Input id="path" type="text" placeholder="Type path here e.g. address.office.state" required v-model="path"
            label="Enter path:" :error-message="requiredErrorMessage" />

        <div>
            <label class="text-area-label" for="targetObject">Enter object (optional):</label>
            <textarea class="text-area-box" id="targetObject" :placeholder="JSON.stringify(sampleObj)" name="targetObject"
                rows="10" cols="50" v-model="objectModel"></textarea>
        </div>
        <button @click="clickHandler">Get value</button>

        <div class="result-title">
            Result: <span class="result">{{ propertyValue }}</span>
            <div class="error">{{ errorMessage }}</div>
        </div>
    </div>
</template>

<style scoped>
.container {

    .text-area-label,
    .result-title {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .text-area-box {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        width: 100%;

    }

    .result {
        color: green;
        font-weight: bold;
    }

    .error {
        color: red;
    }

    button {
        padding: 10px;
        background-color: #6E7BD9;
        border: none;
        border-radius: 4px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        margin: 10px 0;
    }

    button:hover {
        background-color: #9e82de;
    }
}
</style>
