import { useId } from 'react';
import { useContacts } from '../../hooks/useContacts';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsOps';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import css from './ContactForm.module.css';

const initialValues = {
  name: '',
  number: '',
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]{1}/, 'First symbol must be letter')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(
      /[0-9]{3}-[0-9]{3}-[0-9]{4}/,
      'Number must be in format <123-456-7890>'
    )
    .max(12, 'Too Long!')
    .required('Required'),
});

const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const { contacts } = useContacts();
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    try {
      const [name, number] = Object.values(values);
      contacts.some(contact => {
        if (contact.name.toLowerCase() === name.toLowerCase()) {
          throw new Error(`Name "${name}" is already used in contacts`);
        }
        if (contact.number === number) {
          throw new Error(`Number ${number} is already saved in contacts`);
        }
      });

      dispatch(addContact(values));
      iziToast.success({
        title: 'Congratulations!',
        message: `${values.name} was added to your contacts`,
      });

      resetForm();
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: error.message,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.formItem}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage
            className={css.errorSpan}
            name="name"
            component="span"
          />
        </div>

        <div className={css.formItem}>
          <label className={css.label} htmlFor={numberFieldId}>
            Number
          </label>
          <Field
            className={css.input}
            type="tel"
            name="number"
            id={numberFieldId}
          />
          <ErrorMessage
            className={css.errorSpan}
            name="number"
            component="span"
          />
        </div>

        <button className={css.submitButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
