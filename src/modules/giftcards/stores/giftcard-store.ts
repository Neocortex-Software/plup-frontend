import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { GiftCard } from 'src/modules/giftcards/models/giftcard.model';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { CreateGiftCard } from '../models/create-giftcard.model';

export const useGiftCardStore = defineStore('giftcard', {
  state: () => ({
    loading: false as boolean,
    giftCards: [] as GiftCard[],
  }),

  getters: {},

  actions: {
    async getGiftCards() {
      this.loading = true;
      try {
        const response = await api.get('/giftcard');

        this.giftCards = response.data.payload;
      } catch (error) {
        console.error('Error fetching gift cards:', error);
      } finally {
        this.loading = false;
      }
    },
    async createGiftCard(giftCard: CreateGiftCard) {
      this.loading = true;
      try {
        const { data } = await api.post('/giftcard', giftCard);
        notifySuccess('Gift Card created succesfully');
        return data;
      } catch (error) {
        console.error('Error creating gift card:', error);
        notifyError('Error creating gift card');
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
