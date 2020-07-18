import * as React from 'react';
import { OptionButton } from './OptionButton';
import { Table } from 'semantic-ui-react';

interface Props {
  type: string;
  options: any[];
}

export function OptionDisplay({ type, options }: Props) {
  return (
    <Table.Row>
      <Table.Cell>
        {type}
      </Table.Cell>
      <Table.Cell>
        {options.map((option: any) => (
          <OptionButton
            key={option.source}
            text={option.source}
            source={option.source}
            value={option.value} />
        ))}
      </Table.Cell>
    </Table.Row>
  );
}
