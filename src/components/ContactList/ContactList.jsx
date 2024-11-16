import { useContacts } from '../../hooks';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = () => {
  const { filters, filteredContacts } = useContacts();

  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => (
        <Contact key={contact.id} {...contact} />
      ))}
      {filteredContacts?.length === 0 && filters !== '' && (
        <li className={css.alterText}>No contacts found</li>
      )}
    </ul>
  );
};

export default ContactList;
