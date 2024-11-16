import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectFilters = state => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, filter) => {
    const normalizeSearch = filter?.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizeSearch);
    });
  }
);
