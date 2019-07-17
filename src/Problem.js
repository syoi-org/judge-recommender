import React from 'react';
import { List, Label, Table } from 'semantic-ui-react';

function Problem({ problem }) {
  const ref = React.createRef();

  return (
    <Table.Row>
      <Table.Cell
        onClick={() => ref.current.click()}
        style={{
          cursor: "pointer"
        }}>
        <a href={problem.Link} ref={ref}>
          {problem.Judge} {problem.ID} - {problem.Problem}
          <div>
            {problem.Tags.map((tag) => (
              <>
                <Label size="mini">{tag}</Label>
              </>
            ))}
          </div>
        </a>
      </Table.Cell>
    </Table.Row >
  )
}

export default Problem;