import React from 'react';
import { Table } from 'semantic-ui-react';
import Problem from './Problem';
import {RecommenderContext} from '../context/RecommenderContext';

const level = ['Beginner', 'Intermediate', 'Advanced', ''];
const difficulty = [1, 2, 3, 4, 5, 0];

const problemSorter = {
  'default': (a, b) => {
    if (a.Judge !== b.Judge)
      return a.Judge > b.Judge;
    else
      return a.ID > b.ID;
  },
  'level-difficulty': (a, b) => {
    if (level.indexOf(a.Level) !== level.indexOf(b.Level))
      return level.indexOf(a.Level) > level.indexOf(b.Level);
    else if (difficulty.indexOf(a.Difficulty) !== difficulty.indexOf(b.Difficulty))
      return difficulty.indexOf(a.Difficulty) > difficulty.indexOf(b.Difficulty);
    else
      return problemSorter.default(a, b);
  }
}

function ProblemsDisplay() {
  const context = React.useContext(RecommenderContext);
  const {filters} = context.setting;

  const problems = context.data.problems
    .filter((problem) => {
      const options = problem.FilterOptions.map((option) => option.value);
      return filters.every((filter) => (
        filter.startsWith('keyword:')
          ? problem.Problem.toLowerCase().indexOf(filter.replace('keyword:', '').toLowerCase()) !== -1
          : options.includes(filter)
      ));
    })
    .sort(problemSorter[context.setting.sortOrder]);

  const content = problems.map((problem, id) => (
    <Problem problem={problem} key={id} />
  ))

  return (
    <Table celled selectable>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            Showing {problems.length} problem{problems.length !== 1 && 's'} out
            of {context.data.problems.length} problem{context.data.problems.length !== 1 && 's'}.
          </Table.Cell>
        </Table.Row>
        {content}
      </Table.Body>
    </Table>
  );
}

export default ProblemsDisplay;
