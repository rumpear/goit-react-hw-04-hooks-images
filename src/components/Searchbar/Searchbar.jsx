import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { RiSearch2Line } from 'react-icons/ri';

import { Wrapper, Form, Button, Label, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit, isSearch, searchQuery }) => {
  const [input, setInput] = useState('');

  const handleInput = e => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!input) return toast.warn('Search field must not be empty');
    if (input === searchQuery)
      return toast.warn('Photos for your current query are already shown');

    onSubmit(input.trim());
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" disabled={isSearch}>
          <RiSearch2Line size={25} />
          <Label>Search</Label>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          value={input}
          onInput={handleInput}
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Wrapper>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSearch: PropTypes.bool.isRequired,
};
