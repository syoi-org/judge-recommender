import React, { useState } from 'react';
import { Accordion, Button, Dropdown, Form, Icon, Table, Popup } from 'semantic-ui-react';
import useFetchGoogleSheet from './hook/fetch-google-sheet';

function ProblemsFilter({ onUpdate, options }) {
  const [active, setActive] = useState(false);
  const [filters, setFilters] = useState([]);

  function addTag(tag) {
    if (tag && !filters.includes(tag)) {
      setFilters(filters.concat([tag]));
      onUpdate(filters.concat([tag]));
    }
  }

  /**
   * The button used in the list of options.
   */
  function OptionButton({ text, value, ...props }) {
    return (
      <Button
        size="mini"
        style={{ marginBottom: "2px", marginTop: "2px" }}
        onClick={() => {
          addTag(value);
        }}
        {...props}>
        {text || '\u00A0'}
      </Button>
    );
  };

  // Function called when the filter list needs to be updated.
  const onChange = (event, { value }) => {
    setFilters(value);
    onUpdate(value);
  };

  // This list is manually propagated to ensure the order of rendering.
  const optionTypes = ['difficulty', 'judge', 'level', 'tag'];

  const optionByType = Object.fromEntries(optionTypes.map((type) => [
    type,
    options.filter((option) => option.type === type)]));

  const tagGroups = useFetchGoogleSheet(
    "https://docs.google.com/a/google.com/spreadsheets/d/1mYZSziPP8-2a9lQeSjXm7FwRqilwgsL8MIHeER0BmGo/gviz/tq?gid=1856672631&tq=select%20*",
    new Map(),
    ({ cols, data }) => {
      return new Map(data.map(({ Tag, Group }) => [Tag, Group]));
    }
  );

  const tagSet = new Set(optionByType['tag'].map((tag) => tag.source));

  const MISC = 'Miscellaneous';
  const tagByGroups = optionByType['tag'] && optionByType['tag'].reduce((groups, tag) => {
    const group = tagGroups.has(tag.source) ? tagGroups.get(tag.source) : MISC;
    if (!groups[group]) groups[group] = [];
    groups[group].push(tag);
    return groups;
  }, {});

  // Remove all group names from MISC list.
  tagByGroups[MISC] = tagByGroups[MISC] &&
    tagByGroups[MISC].filter((tag) => !(tag.source in tagByGroups));

  const groupOfTags = Object
    .entries(tagByGroups)
    .sort(([a], [b]) => {
      // Guarantee MISC to be last in display
      if (a == MISC) return 1;
      if (b == MISC) return -1;
      return a > b ? 1 : -1;
    });

  const [currentGroup, setGroup] = useState('');
  const tagsDisplay = (
    <Table.Row>
      <Table.Cell>
        Tags
        <Popup
          position='right center'
          trigger={
            <Icon name="question circle" />
          }>
          The blue buttons are the group of tags.
          <ul style={{
            margin: '0',
            paddingLeft: '15px'
          }}>
            <li><b>Add a tag:</b> select the group to expand it, then select the tag.</li>
            <li><b>Add a group:</b> select the group,  then click the green group button.</li>
          </ul>
        </Popup>
      </Table.Cell>
      <Table.Cell >
        {/* <Table compact style={{ border: 'none' }}>
          <Table.Body> */}
        {
          groupOfTags.map(([group, tags], id) => (
            <>
              {/* <Table.Row>
                   <Table.Cell> */}
              {currentGroup === group && <br />}
              <OptionButton
                text={group}
                color={currentGroup === group && tagSet.has(group) ? 'green' : 'blue'}
                onClick={() => {
                  if (currentGroup !== group)
                    setGroup(group);
                  else if (tagSet.has(group))
                    addTag(tagSet.has(group) && `tag:${group}`);
                }} />
              {
                currentGroup === group && <>
                  {/* <br /> */}
                  <Icon
                    name="hand point right outline" />
                  {tags && tags
                    .sort((a, b) => a.source > b.source ? 1 : -1)
                    .map((tag) => (
                      <OptionButton
                        text={tag.source}
                        value={tag.value} />
                    ))}
                  {id !== groupOfTags.length - 1 && <br />}
                </>
              }
              {/* </Table.Cell>
                </Table.Row> */}
            </>
          ))}
        {/* </Table.Body>
        </Table> */}
      </Table.Cell>
    </Table.Row>
  );

  const optionsDisplay = Object.entries(optionByType)
    .filter(([type, tags]) => type !== 'tag')
    .map(([type, tags]) => (
      <>
        <Table.Row>
          <Table.Cell>
            {type[0].toUpperCase() + type.slice(1)}
          </Table.Cell>
          <Table.Cell>
            {tags.map((tag) => (
              <OptionButton
                text={tag.source}
                value={tag.value} />
            ))}
          </Table.Cell>
        </Table.Row>
      </>
    ));

  return (
    <>
      <Dropdown
        placeholder="Filter"
        search
        clearable
        options={options}
        fluid
        multiple
        selection
        onChange={onChange}
        value={filters}
      />

      <Accordion styled fluid style={{
        marginTop: "1em"
      }}>
        <Accordion.Title active={active} onClick={() => setActive(!active)}>
          <Icon name="dropdown" />
          Filter List
        </Accordion.Title>
        <Accordion.Content active={active}>
          <Table celled>
            <Table.Body>
              {optionsDisplay}
              {tagsDisplay}
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default ProblemsFilter;