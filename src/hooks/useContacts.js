import { useSelector } from 'react-redux';
import { contactsSelectors } from '../redux';

export const useContacts = () => {
  const contacts = useSelector(contactsSelectors.selectContacts);
  const loading = useSelector(contactsSelectors.selectLoading);
  const error = useSelector(contactsSelectors.selectError);
  const filters = useSelector(contactsSelectors.selectFilters);
  const filteredContacts = useSelector(
    contactsSelectors.selectFilteredContacts
  );

  return {
    contacts,
    loading,
    error,
    filters,
    filteredContacts,
  };
};
