<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { BakedItemModel } from './formModels';
import Input from '@/components/core/Input.vue';

const name = ref<string>('');
const type = ref<string>('');
const topping = ref<string>('');
const nameErrorMessage = ref<string>('');
const typeErrorMessage = ref<string>('');
const toppingErrorMessage = ref<string>('');

const emit = defineEmits(['newItemAdded']);

const reset = () => {
    name.value = '';
    type.value = '';
    topping.value = '';
    nameErrorMessage.value = typeErrorMessage.value = toppingErrorMessage.value = '';
}

const handleSubmit = () => {
    const newBakedItem: BakedItemModel = {
        id: '',
        name: name.value,
        type: type.value,
        topping: topping.value,
    };

    const errors: { [key: string]: Ref<string> } = {
        name: nameErrorMessage,
        type: typeErrorMessage,
        topping: toppingErrorMessage,
    };

    let isValid = true;
    for (const field in errors) {
        if (!newBakedItem[field as keyof BakedItemModel]) {
            errors[field].value = 'This field is required!';
            isValid = false;
        } else {
            errors[field].value = '';
        }
    }

    if (isValid) {
        emit('newItemAdded', newBakedItem);
        reset();
    }
};
</script>

<template>
    <form class="form-container" @submit.prevent="handleSubmit">
        <h2 class="form-title">Bake your way! </h2>
        <div class="input-group">
            <Input id="name" type="text" placeholder="Add a new name here..." v-model="name" required label="Name:"
                :error-message=nameErrorMessage />
        </div>

        <div class="input-group">
            <Input id="type" type="text" placeholder="Add a new type here..." v-model="type" required label="Type:"
                :error-message=typeErrorMessage />
        </div>

        <div class="input-group">
            <Input class="test" id="topping" type="text" placeholder="Add toppings here..." v-model="topping" required
                label="Topping:" :error-message=toppingErrorMessage />
        </div>

        <button type="submit">Submit</button>
    </form>
</template>

<style scoped>
.form-container {
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.form-title {
    margin-bottom: 20px;
    font-weight: bold;
    color: #2C3E50;
}

.input-group {
    margin-bottom: 15px;

    .input-container {
        input {
            width: 100%
        }
    }
}

button {
    padding: 10px;
    background-color: #6E7BD9;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #9e82de;
}
</style>
