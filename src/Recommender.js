import React, { useState } from 'react';
import ProblemsFilter from './ProblemsFilter';
import ProblemsDisplay from './ProblemsDisplay';
import useFetchGoogleSheet from './hook/fetch-google-sheet';
import { Table } from 'semantic-ui-react';

/**
 * Handle data fetching and the communication between display elements.
 */

function parseProblemList({ cols, data }) {
  const problems = data.map((problem) => {
    problem.Tags = problem.Tags.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length != 0);

    problem.FilterTags = [
      {
        type: 'judge',
        source: problem.Judge,
        key: `judge:${problem.Judge}`,
        value: `judge:${problem.Judge}`,
        text: `Judge: ${problem.Judge}`
      },
      {
        type: 'difficulty',
        source: problem.Difficulty,
        key: `difficulty:${problem.Difficulty}`,
        value: `difficulty:${problem.Difficulty}`,
        text: `Difficulty: ${problem.Difficulty}`
      },
      {
        type: 'level',
        source: problem.Level,
        key: `level:${problem.Level}`,
        value: `level:${problem.Level}`,
        text: `Level: ${problem.Level}`
      },
      ...problem.Tags.map((tag) => ({
        type: 'tag',
        source: tag,
        key: `tag:${tag}`,
        value: `tag:${tag}`,
        text: `Tag: ${tag}`,
      }))
    ];

    return problem;
  });

  const tags =
    [...new Set(problems
      .map((problem) => problem.FilterTags.map((tag) => JSON.stringify(tag)))
      .reduce((arr, tags) => arr.concat(tags), []))]
      .sort()
      .map(JSON.parse);

  return { problems, tags };
}

function Recommender() {
  const { problems: problemList, tags } = useFetchGoogleSheet(
    "https://docs.google.com/a/google.com/spreadsheets/d/1mYZSziPP8-2a9lQeSjXm7FwRqilwgsL8MIHeER0BmGo/gviz/tq?tq=select%20*",
    {
      problems: [],
      tags: []
    },
    parseProblemList
  );

  const [filters, setFilters] = useState([]);
  const onFilterUpdate = (newFilters) => { setFilters(newFilters); };

  const problems = problemList.filter((problem) =>
    filters.every((filter) => problem.FilterTags.map((tag) => tag.value).includes(filter)));

  return (
    <>
      {/* <pre>{JSON.stringify(tags,null,4)}</pre> */}
      <ProblemsFilter
        onUpdate={onFilterUpdate}
        options={tags}
      />
      <ProblemsDisplay problems={problems} before={
        <Table.Row>
          <Table.Cell>
            Showing {problems.length} problem{problems.length != 1 && 's'} out
            of {problemList.length} problem{problemList.length != 1 && 's'}.
          </Table.Cell>
        </Table.Row>
      } />
    </>
  );
}

export default Recommender;