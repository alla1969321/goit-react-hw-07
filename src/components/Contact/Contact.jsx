import { useDispatch } from 'react-redux';
import { useContacts } from '../../hooks';
import { deleteContact } from '../../redux/contactsOps';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import css from './Contact.module.css';

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const { contacts } = useContacts();

  const deleteContactHandler = id => {
    try {
      dispatch(deleteContact(id));
      contacts.find(
        contact =>
          contact.id === id &&
          iziToast.info({
            title: 'Done',
            message: `${contact.name} was deleted from your contacts`,
          })
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <li className={css.listItem}>
      <p>
        {name}: {number}
      </p>
      <button
        className={css.deleteButton}
        type="button"
        onClick={() => deleteContactHandler(id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
