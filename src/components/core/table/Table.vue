<script setup lang="ts">
import { ref, computed } from 'vue';
import Filter from '@/components/core/Filter.vue';
import Sort from '@/components/core/Sort.vue';
import { filterObjects } from '@/utils/utils';
import type { TableHeaderModel } from './tableModels';

const { items, headers } = defineProps({
    items: {
        type: Array<any>,
        required: true
    },
    headers: {
        type: Array<TableHeaderModel>,
        required: true
    }
});

const searchTerm = ref();

const isAscending = ref<boolean>(true);
const searchHandler = (search: string) => {
    searchTerm.value = search;
};

const filteredItems = computed(() => {
    let filteredItems = items.slice();

    if (searchTerm.value) {
        filteredItems = filterObjects(filteredItems, searchTerm.value);
    }

    if (sortedColumn.value) {
        filteredItems.sort((a, b) => {
            const columnIndex = headers.findIndex(header => header.title === sortedColumn.value);

            if (columnIndex !== -1 && headers[columnIndex].sortable) {
                const prop = headers[columnIndex].title as keyof typeof a;
                const valueA = String(a[prop]);
                const valueB = String(b[prop]);
                return isAscending.value ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }

            return 0;
        });
    }

    return filteredItems;
});

const sortedColumn = ref<string>('');

const sortHandler = (header: TableHeaderModel) => {
    if (sortedColumn.value === header.title) {
        isAscending.value = !isAscending.value;
    } else {
        sortedColumn.value = header.title;
        isAscending.value = true;
    }
}

</script>

<template>
    <div class="container">
        <Filter @search="searchHandler" />

        <table class="table">
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">
                        <div class="sort">
                            <Sort v-if="header.sortable" :isAscending="isAscending"
                                :isSelected="sortedColumn == header.title" @sort="sortHandler(header)" />
                            <span class="header">{{ header.title }}</span>
                        </div>
                    </th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(item, index) in filteredItems" :key="index" class="row">
                    <td v-for="(value, key) in item" :key="key">
                        {{ value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;

}

.table {
    width: 100%;
    font-size: 12px;
    color: gray;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-spacing: 0;
    border: 1px solid #dddddd;
    border-radius: 10px;
    overflow: hidden;
}

th {
    padding: 12px 16px;
    background-color: #6E7BD9;

    .sort {
        display: flex;
        justify-content: center;
    }

    .header {
        color: #fff;
        font-weight: 700;
        text-transform: capitalize;
    }
}

.row {
    td {
        padding: 12px 16px;
        font-weight: 500;
        text-align: center;
    }

    &:nth-child(even) {
        background-color: #F8F7FF;
    }
}
</style>
