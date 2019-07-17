import React from 'react';
import { List, Image, Label, Table } from 'semantic-ui-react';
import JudgeIcon from './JudgeIcon';

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
          <JudgeIcon judge={problem.Judge} />
          &nbsp;
          {problem.Judge} - {problem.ID ? problem.ID + ' - ' : ''} {problem.Problem}
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