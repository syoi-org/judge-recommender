import React from 'react';
import { List, Image, Icon, Label, Table } from 'semantic-ui-react';
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
            <Label.Group color="black" size="mini" style={{ display: 'inline-block' }}>
              <Label>
                <Icon name="signal" size="small"></Icon>
                {problem.Level}
              </Label>
              <Label>
                <Icon name="star" size="small"></Icon>
                {problem.Difficulty}
              </Label>
            </Label.Group>
            <Label.Group size="mini" style={{ display: 'inline-block' }}>
              {problem.Tags.map((tag) => (
                <Label size="mini" color="brown" tag>{tag}</Label>
              ))}
            </Label.Group>
          </div>
        </a>
      </Table.Cell>
    </Table.Row >
  )
}

export default Problem;