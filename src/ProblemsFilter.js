import React, { useState } from 'react';
import { Accordion, Button, Dropdown, Form, Icon, Table } from 'semantic-ui-react';
import { __values } from 'tslib';

function ProblemsFilter({ onUpdate, options }) {
  const [active, setActive] = useState(false);
  const [filters, setFilters] = useState([]);

  const onChange = (event, { value }) => {
    setFilters(value);
    onUpdate(value);
  };

  // @todo Change to auto-generated or from another source.
  const tagTypes = ['difficulty', 'judge', 'level', 'tag'];

  const tagByTypes = tagTypes.map((type) => [
    type,
    options.filter((option) => option.value.startsWith(type))]);

  const tagDisplay = tagByTypes.map(([type, tags]) => (
    <>
      <Table.Row>
        <Table.Cell>
          {type[0].toUpperCase() + type.slice(1)}
        </Table.Cell>
        <Table.Cell>
          {tags.map((tag) => (
            <Button
              size="mini"
              style={{ marginBottom: "2px", marginTop: "2px" }}
              onClick={() => {
                if (!filters.includes(tag.value)) {
                  setFilters(filters.concat([tag.value]));
                  onUpdate(filters.concat([tag.value]));
                }
              }}>
              {tag.value.replace(`${type}:`, '') || "\u00A0"}
            </Button>
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
              {tagDisplay}
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default ProblemsFilter;