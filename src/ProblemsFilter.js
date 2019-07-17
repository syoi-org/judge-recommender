import React from 'react';
import { Button, Dropdown, Form, Icon } from 'semantic-ui-react';

function ProblemsFilter({ onUpdate, options }) {
  const onChange = (event, { value }) => {
    onUpdate(value);
  };

  return (
    <>
      <Dropdown
        placeholder="Filter"
        search
        clearable
        options={options}
        fluid
        multiple
        selection
        onChange={onChange}
      />
    </>
  )
}

export default ProblemsFilter;