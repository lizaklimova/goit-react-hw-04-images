import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { Form, Header, SearchBtn, Input } from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(value);

    reset();
  };

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const reset = () => {
    setValue('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <IoSearch size={25} />
        </SearchBtn>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

export default Searchbar;
