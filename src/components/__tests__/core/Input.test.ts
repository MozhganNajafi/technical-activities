import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Input from '@/components/core/Input.vue';

describe('Input', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Input, {
            props: {
                label: 'Test Label',
                placeholder: 'Test Placeholder',
                errorMessage: 'Test Error Message',
            },
        });
    });

    it('renders the input field with correct placeholder', () => {
        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('placeholder')).toBe('Test Placeholder');
    });

    it('renders the label with correct text', () => {
        const label = wrapper.find('label');
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Test Label');
    });

    it('renders the error message with correct text', () => {
        const error = wrapper.find('.error');
        expect(error.exists()).toBe(true);
        expect(error.text()).toBe('Test Error Message');
    });

    it('updates model value on input', async () => {
        const inputValue = 'Test Input';
        const inputElement = wrapper.find('input');
        await inputElement.setValue(inputValue);

        expect(wrapper.vm.model).toBe('Test Input');
    });
});
