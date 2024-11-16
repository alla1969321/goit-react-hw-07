import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { useContacts } from '../../hooks';
import { changeFilter } from '../../redux/filtersSlice';
import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const { filters } = useContacts();
  const searchFieldId = useId();

  const changeFilterHandler = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div>
      <label className={css.label} htmlFor={searchFieldId}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          id={searchFieldId}
          value={filters}
          onChange={changeFilterHandler}
        />
      </label>
    </div>
  );
};

export default SearchBox;
