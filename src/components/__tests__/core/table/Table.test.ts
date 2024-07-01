import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Table from '@/components/core/table/Table.vue';
import Filter from '@/components/core/Filter.vue';
import Sort from '@/components/core/Sort.vue';

describe('Table', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Table, {
            props: {
                items: [
                    { id: '1', name: 'Cake', type: 'Chocolate', topping: 'Sprinkles' },
                    { id: '2', name: 'Pie', type: 'Apple', topping: 'None' },
                ],
                headers: [
                    { title: 'id', sortable: true },
                    { title: 'name', sortable: false },
                    { title: 'type', sortable: true },
                    { title: 'topping', sortable: true },
                ],
            },
        });
    });

    it('renders the correct number of items', () => {
        const rows = wrapper.findAll('tbody tr');
        expect(rows.length).toBe(2);
    });

    it('filters items based on search term', async () => {
        const filter = wrapper.findComponent(Filter);
        await filter.vm.$emit('search', 'Cake');
        await wrapper.vm.$nextTick();

        const rows = wrapper.findAll('tbody tr');
        expect(rows.length).toBe(1);
        expect(rows[0].text()).toContain('Cake');
    });

    it('sorts items correctly', async () => {
        const sort = wrapper.findComponent(Sort);
        await sort.trigger('click');

        await sort.vm.$emit('sort', { title: 'type', sortable: true });
        await wrapper.vm.$nextTick();

        const rows = wrapper.findAll('tbody tr');
        expect(rows[0].text()).toContain('Pie');
        expect(rows[1].text()).toContain('Cake');

        await sort.vm.$emit('sort', { title: 'type', sortable: true });
        await wrapper.vm.$nextTick();

        expect(rows[0].text()).toContain('Cake');
        expect(rows[1].text()).toContain('Pie');
    });
});
