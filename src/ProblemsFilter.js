import React from 'react';
import { Dropdown } from 'semantic-ui-react';

function ProblemsFilter({ onUpdate, options }) {
  const onChange = (event, { value }) => {
    onUpdate(value);
  };

  return (
    <>
      <Dropdown
        placeholder="Filter"
        search
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