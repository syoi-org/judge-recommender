import React from 'react';
import { List, Table } from 'semantic-ui-react';
import Problem from './Problem';

function ProblemsDisplay({ problems }) {
  const content = problems.map((problem, id) => (
    <Problem problem={problem} key={id} />
  ))

  return (
    <Table celled selectable>
      <Table.Body>
        {content}
      </Table.Body>
    </Table>
  );
}

export default ProblemsDisplay;
