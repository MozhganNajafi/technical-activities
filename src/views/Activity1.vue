<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from '@/components/core/table/Table.vue';
import type { BakedItemModel } from '@/components/core/form/formModels';
import AddBakeryItemForm from '@/components/core/form/AddBakeryItemForm.vue';
import { fetchData } from '@/utils/utils';
import type { TableHeaderModel } from '@/components/core/table/tableModels';

const items = ref<Array<BakedItemModel>>([]);
const headers: Array<TableHeaderModel> = [{ title: 'id', sortable: true }, { title: 'name', sortable: false }, { title: 'type', sortable: true }, { title: 'topping', sortable: true }];

const getItems = async () => {
    const response = await fetchData('/cakes-db.json');
    if (response) {
        items.value = response;
    }
};

const generateId = () => {
    return items.value.reduce((maxId, item) => {
        return Math.max(maxId, parseInt(item.id, 10) + 1);
    }, 0).toString().padStart(4, '0');
};

const addItemHandler = (newItem: BakedItemModel) => {
    const existingItem = items.value.find(item => item.name.toLowerCase().trim() == newItem.name.toLowerCase().trim());
    if (existingItem) {
        newItem.id = existingItem.id;
        newItem.name = existingItem.name;
    }
    else {
        newItem.id = generateId();
    }
    items.value.push(newItem);
}

onMounted(getItems);
</script>

<template>
    <div class="container">
        <AddBakeryItemForm @newItemAdded="addItemHandler" />
        <br />
        <div class="table" v-if="items.length > 0">
            <Table :items="items" :headers="headers"></Table>
        </div>
        <div v-else><span>No item to show</span></div>
    </div>
</template>

<style scoped>
.container {
    .table {
        flex-grow: 2;
    }
}
</style>
