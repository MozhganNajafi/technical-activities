import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import AddBakeryItemForm from '@/components/core/form/AddBakeryItemForm.vue';

describe('AddBakeryItemForm', () => {
    it('form submission with valid data emits newItemAdded event', async () => {
        const wrapper = mount(AddBakeryItemForm);

        const nameValue = 'Cake';
        const nameInput = wrapper.get('#name');

        const typeValue = 'Chocolate';
        const typeInput = wrapper.get('#type');

        const toppingValue = 'Sprinkles';
        const toppingInput = wrapper.get('#topping');

        await nameInput.get('input').setValue(nameValue);
        await typeInput.get('input').setValue(typeValue);
        await toppingInput.get('input').setValue(toppingValue);

        await wrapper.find('form').trigger('submit');

        await wrapper.vm.$nextTick();

        expect(wrapper.emitted().newItemAdded).toHaveLength(1);
        expect(wrapper.emitted().newItemAdded[0][0]).toEqual({
            id: '',
            name: 'Cake',
            type: 'Chocolate',
            topping: 'Sprinkles',
        });
    });

    it('form submission with missing data does not emit newItemAdded event', async () => {
        const wrapper = mount(AddBakeryItemForm);

        const nameValue = 'Cake';
        const nameInput = wrapper.get('#name');
        await nameInput.get('input').setValue(nameValue);

        await wrapper.find('form').trigger('submit');

        await flushPromises();

        expect(wrapper.emitted().newItemAdded).toBeUndefined();
    });
});
