import React, {useState} from 'react';
import ProblemsFilter from './ProblemsFilter';
import ProblemsDisplay from './ProblemsDisplay';
import useFetchGoogleSheet from './hook/fetch-google-sheet';

/**
 * Handle data fetching and the communication between display elements.
 */

function parseProblemList(sheet) {
  const cols = sheet.table.cols.map((col) => ({
    label: col.label,
    type: col.type,
  }));

  const sanitizeCell = (cell, cellType) => {
    if (cell && cell.v) {
      if (cellType === "number")
        return cell.v;
      return cell.v.trim();
    } else {
      if (cellType === "number")
        return 0;
      return "";
    }
  }

  const problems = sheet.table.rows.map((row) => {
    const problem = row.c.map((cell, id) => [cols[id].label, sanitizeCell(cell, cols[id].type)])
      .reduce((o, [k, v]) => ({ ...o, [k]: v }), {});

    problem.Tags = problem.Tags.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length != 0);

    problem.FilterTags = [
      {key: `judge:${problem.Judge}`,
      value: `judge:${problem.Judge}`,
      text: `Judge: ${problem.Judge}`},
      {key: `difficulty:${problem.Difficulty}`,
      value: `difficulty:${problem.Difficulty}`,
      text: `Difficulty: ${problem.Difficulty}`},
      {key: `level:${problem.Level}`,
      value: `level:${problem.Level}`,
      text: `Level: ${problem.Level}`},
      ...problem.Tags.map((tag) => ({
        key: `tag:${tag}`,
        value: `tag:${tag}`,
        text: `Tag: ${tag}`
      }))
    ];

    return problem;
  });

  const unique = (x) => [...new Set(x)];

  const tags = 
    [...new Set(problems
      .map((problem) => problem.FilterTags.map((tag) => JSON.stringify(tag)))
      .reduce((arr, tags) => arr.concat(tags), []))]
      .sort()
      .map(JSON.parse);

  return {problems, tags};
}

function Recommender() {
  const {problems: problemList, tags} = useFetchGoogleSheet(
    "https://docs.google.com/a/google.com/spreadsheets/d/1audY4nLboFPrjYCdvo1ncORs5TUsZQjV3-0w_lKp_wY/gviz/tq?gid=1535630412&tq=select%20*",
    {
      problems: [],
      tags: []
    },
    parseProblemList
  );

  const [filters, setFilters] = useState([]);
  const onFilterUpdate = (newFilters) => {setFilters(newFilters);};

  const problems = problemList.filter((problem) => 
    filters.every((filter) => problem.FilterTags.map((tag) => tag.value).includes(filter)));

  return (
    <>
    {/* <pre>{JSON.stringify(tags,null,4)}</pre> */}
      <ProblemsFilter 
        onUpdate={onFilterUpdate} 
        options={tags}
        />
      <ProblemsDisplay problems={problems} />
    </>
  );
}

export default Recommender;