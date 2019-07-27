import * as React from 'react';
import OptionButton from './OptionButton';
import { Table } from 'semantic-ui-react';

function OptionDisplay({ type, options }) {
  return (
    <Table.Row>
      <Table.Cell>
        {type}
      </Table.Cell>
      <Table.Cell>
        {options.map((option) => (
          <OptionButton
            key={option.source}
            text={option.source}
            value={option.value} />
        ))}
      </Table.Cell>
    </Table.Row>
  );
}

export default OptionDisplay;