import React from 'react';
import { Icon, Label, Table } from 'semantic-ui-react';
import {JudgeIcon} from './JudgeIcon';
import { RecommenderContext } from '../context/RecommenderContext';
import { Problem, Tag } from '../util/types';

export function ProblemDisplay({ problem }: { problem: Problem }) {
  const context = React.useContext(RecommenderContext);
  const ref = React.createRef<HTMLAnchorElement>();
  const tagGroups = context.data.tagGroups;

  const tagSorter = (a: string, b: string) => {
    const first = (tag: string) => tagGroups.get(tag) || tag;
    if (first(a) !== first(b))
      return Number(first(a) > first(b));
    if (!tagGroups.get(a) && !tagGroups.get(b))
      return Number(a > b);
    if (!tagGroups.get(a))
      return -1;
    if (!tagGroups.get(b))
      return 1;
    return Number(a > b);
  }

  return (
    <Table.Row>
      <Table.Cell
        onClick={() => ref.current?.click()}
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
              {
                problem.Tags
                  .sort(tagSorter)
                  .map((tag: string) => (
                    tagGroups.get(tag)
                      ? (
                        <Label image size="mini" color="brown" tag key={tag}>
                          {tagGroups.get(tag)}
                          <Label.Detail style={{
                            marginRight: "-13px"
                          }}>{tag}</Label.Detail>
                        </Label>
                      )
                      : (
                        <Label color="brown" size="mini" tag key={tag}>
                          {tag}
                        </Label>
                      )
                  ))
              }
            </Label.Group>
          </div>
        </a>
      </Table.Cell>
    </Table.Row >
  )
}
