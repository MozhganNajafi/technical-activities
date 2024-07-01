import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Sort from '@/components/core/Sort.vue';
import SortIcon from '@/components/icons/SortIcon.vue';
import AscendingSortIcon from '@/components/icons/AscendingSortIcon.vue';
import DescendingSortIcon from '@/components/icons/DescendingSortIcon.vue';

describe('Sort', () => {
    let wrapper: ReturnType<typeof mount>;

    beforeEach(() => {
        wrapper = mount(Sort, {
            props: {
                isSelected: false
            },
            global: {
                components: {
                    SortIcon,
                    AscendingSortIcon,
                    DescendingSortIcon
                }
            }
        });
    });

    it('renders SortIcon when not selected', () => {
        expect(wrapper.findComponent(SortIcon).exists()).toBe(true);
        expect(wrapper.findComponent(AscendingSortIcon).exists()).toBe(false);
        expect(wrapper.findComponent(DescendingSortIcon).exists()).toBe(false);
    });

    it('renders AscendingSortIcon when selected and ascending', async () => {
        await wrapper.setProps({ isSelected: true });

        expect(wrapper.findComponent(SortIcon).exists()).toBe(false);
        expect(wrapper.findComponent(AscendingSortIcon).exists()).toBe(true);
        expect(wrapper.findComponent(DescendingSortIcon).exists()).toBe(false);
    });

    it('renders DescendingSortIcon when selected and descending', async () => {
        await wrapper.setProps({ isSelected: true });

        await wrapper.find('button').trigger('click');

        expect(wrapper.findComponent(SortIcon).exists()).toBe(false);
        expect(wrapper.findComponent(AscendingSortIcon).exists()).toBe(false);
        expect(wrapper.findComponent(DescendingSortIcon).exists()).toBe(true);
    });

    it('emits sort event with correct value', async () => {
        await wrapper.find('button').trigger('click');
        const sortEventAscending = wrapper.emitted('sort');
        expect(sortEventAscending).toBeTruthy();
        expect(sortEventAscending).toHaveLength(1);
        expect(sortEventAscending?.[0]).toEqual([true]);

        await wrapper.find('button').trigger('click');
        const sortEventDescending = wrapper.emitted('sort');
        expect(sortEventDescending?.[1]).toEqual([false]);;
    });
});
