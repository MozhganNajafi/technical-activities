import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Filter from '@/components/core/Filter.vue';
import Input from '@/components/core/Input.vue';
import { debounce } from '@/utils/utils';

vi.mock('@/utils/utils', () => ({
    debounce: vi.fn((fn, delay) => fn),
}));

describe('Filter', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Filter, {
            global: {
                components: { Input },
            },
        });
    });

    it('renders the input field', () => {
        const input = wrapper.find('#search-input');
        expect(input.exists()).toBe(true);
    });

    it('emits search event when input changes', async () => {
        const input = wrapper.find('#search-input');
        const inputValue = 'Test Search';
        await input.get('input').setValue(inputValue);

        expect(wrapper.emitted('search')).toBeTruthy();
        expect(wrapper.emitted('search')[0]).toEqual(['Test Search']);
    });

    it('debounces the input handler', async () => {
        const input = wrapper.find('#search-input');
        const inputValue = 'Test Search';
        await input.get('input').setValue(inputValue);

        await new Promise(resolve => setTimeout(resolve, 600));

        expect(wrapper.emitted('search')).toHaveLength(1);
        expect(wrapper.emitted('search')[0]).toEqual(['Test Search']);
    });
});
