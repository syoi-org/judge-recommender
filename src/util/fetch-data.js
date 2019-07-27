import * as axios from 'axios';
import sheetToEntry from './sheet-to-entry';

const PROBLEMS_URL = 'https://docs.google.com/a/google.com/spreadsheets/d/1mYZSziPP8-2a9lQeSjXm7FwRqilwgsL8MIHeER0BmGo/gviz/tq?tq=select%20*';
const TAGS_URL = 'https://docs.google.com/a/google.com/spreadsheets/d/1mYZSziPP8-2a9lQeSjXm7FwRqilwgsL8MIHeER0BmGo/gviz/tq?gid=1856672631&tq=select%20*';

async function fetchGoogleSheet(url) {
  // A variable used to store the data returned by Google API.
  let source = null;

  // An object that is used by the JSONP response by Google API.
  // eslint-disable-next-line
  const google = {
    visualization: {
      Query: {
        setResponse: (response) => {
          source = response;
        }
      }
    }
  };

  const result = await axios(url);
  // eslint-disable-next-line
  eval(result.data);
  const entries = sheetToEntry(source);
  return entries;
}

function parseProblemList({ cols, data }) {
  const options = {
    'judge': {},
    'difficulty': {},
    'level': {},
  };

  let tags = {};

  const problems = data.map((problem) => {
    problem.Tags = problem.Tags.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length !== 0);

    problem.FilterOptions = [
      options.judge[problem.Judge] = {
        type: 'judge',
        source: problem.Judge,
        key: `judge:${problem.Judge}`,
        value: `judge:${problem.Judge}`,
        text: `Judge: ${problem.Judge}`
      },
      options.difficulty[problem.Difficulty] = {
        type: 'difficulty',
        source: problem.Difficulty,
        key: `difficulty:${problem.Difficulty}`,
        value: `difficulty:${problem.Difficulty}`,
        text: `Difficulty: ${problem.Difficulty}`
      },
      options.level[problem.Level] = {
        type: 'level',
        source: problem.Level,
        key: `level:${problem.Level}`,
        value: `level:${problem.Level}`,
        text: `Level: ${problem.Level}`
      },
      ...problem.Tags.map((tag) => (tags[tag] = {
        type: 'tag',
        source: tag,
        key: `tag:${tag}`,
        value: `tag:${tag}`,
        text: `Tag: ${tag}`,
      }))
    ];

    return problem;
  });

  // Change the option / tag list from key-value form to sorted array.
  const clean = (o) => {
    return Object.entries(o)
    .sort(([u], [v]) => u > v)
    .map(([key, value]) => value);
  }

  tags = clean(tags);
  for (const type in options) {
    options[type] = clean(options[type]);
  }

  return { problems, tags, options };
}

async function fetchData(context) {
  const { problems, tags, options } = await fetchGoogleSheet(PROBLEMS_URL)
    .then(parseProblemList);

  const { data: tagsSheet } = await fetchGoogleSheet(TAGS_URL);
  const tagGroups = new Map(tagsSheet.map(({ Tag, Group }) => [Tag, Group]));
  const tagDescription = new Map(tagsSheet.map(({ Tag, Description }) => [Tag, Description]));

  // Handle the tag group relationships
  const MISC = 'Miscellaneous';
  const tagByGroups = tags.reduce((groups, tag) => {
    const group = tagGroups.has(tag.source) ? tagGroups.get(tag.source) : MISC;
    tagGroups.set(group, '');
    tagGroups.set(tag.source, groups);

    if (!group) return groups;
    if (!groups[group]) groups[group] = [];
    groups[group].push(tag);
    return groups;
  }, {});

  const sortOrders = [
    {key: 'default', value: 'default', text: 'Default'},
    {key: 'level-difficulty', value: 'level-difficulty', text: 'Level / Difficulty'},
  ];

  // Remove all group names from MISC list.
  tagByGroups[MISC] = tagByGroups[MISC] &&
    tagByGroups[MISC].filter((tag) => !(tag.source in tagByGroups));

  // Set the group back to the tags (* miscellaneous)
  for (const [group, tags] of Object.entries(tagByGroups)) {
    for (const tag of tags) {
      tagGroups.set(tag.source, group);
    }
  }

  // Update tag list
  for (const tag of tags) {
    tag.group = tagGroups.get(tag.source);
  }

  context.setState((context) => ({
    ...context,
    data: {
      ...context.data,
      problems,
      tags,
      groupedTags: tagByGroups,
      options,
      tagGroups,
      tagDescription,
      sortOrders,
    },
  }));
}

export default fetchData;