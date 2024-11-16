import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import ContactForm from './ContactForm/ContactForm';
import SearchBox from './SearchBox/SearchBox';
import ContactList from './ContactList/ContactList';
import { useContacts } from '../hooks';
import { contactsOps } from '../redux';
import css from './App.module.css';
import Loader from './Loader/Loader';

const App = () => {
  const { contacts, loading, error } = useContacts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOps.fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        {loading && <Loader />}
        <ContactForm />
        {contacts.length > 1 && <SearchBox />}
        {contacts.length > 0 && <h2 className={css.subtitle}>Contacts</h2>}
        {contacts.length === 0 && !loading && (
          <p className={css.alterText}>
            There are no contacts in your contact list
          </p>
        )}
        <ContactList />
        {error && toast.error(error)}
        <Toaster
          gutter={8}
          toastOptions={{
            duration: 4000,
            position: 'bottom-center',
            style: {
              background: '#444444',
              color: 'orange',
            },
          }}
        />
      </div>
    </>
  );
};

export default App;
