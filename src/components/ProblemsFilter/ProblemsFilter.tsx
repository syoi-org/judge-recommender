import React from 'react';
import { Accordion, Dropdown, Icon, Table, DropdownProps } from 'semantic-ui-react';
import { RecommenderContext, RecommenderContextProps } from '../../context/RecommenderContext';

import { OptionDisplay } from './OptionDisplay';
import { TagDisplay } from './TagDisplay';

export function ProblemsFilter() {
  // Local state
  const [active, setActive] = React.useState(false);
  const context = React.useContext(RecommenderContext);

  const { filters } = context.setting;
  const { tags, groupedTags, options, keywords } = context.data;

  const dropdownOptions = [
    ...options.difficulty,
    ...options.judge,
    ...options.level,
    ...tags,
    ...keywords
  ];

  // All values of filters for checking.
  const filterValues = dropdownOptions.map((option) => option.value);

  // Function called when the filter list needs to be updated.
  const onFilterChange = (event: React.SyntheticEvent<HTMLElement, Event>, { value: filters }: DropdownProps) => {
    const currentFilters = (filters as any[]).filter((filter) => filterValues.includes(filter));

    context.setState((context: RecommenderContextProps) => ({
      ...context,
      setting: {
        ...context.setting,
        filters,
      },
      data: {
        ...context.data,
        keywords: context.data.keywords.filter((keyword) => currentFilters.includes(keyword.value)),
      }
    } as RecommenderContextProps));
  };

  const onSortOrderChange = (event: React.SyntheticEvent<HTMLElement, Event>, { value: sortOrder }: DropdownProps) => {
    context.setState((context) => ({
      ...context,
      setting: {
        ...context.setting,
        sortOrder
      }
    } as RecommenderContextProps));
  };

  const onFilterAddition = (event: React.KeyboardEvent<HTMLElement>, props: DropdownProps) => {
    const value = props.value as string;
    context.setState((context) => ({
      ...context,
      setting: {
        ...context.setting,
        filters: filters.concat([`keyword:${value}`]),
      },
      data: {
        ...context.data,
        keywords: keywords.concat(({
          key: `keyword:${value}`,
          value: `keyword:${value}`,
          text: `Keyword: ${value}`,
          source: value,
          type: 'keyword',
        })),
      },
    }));
  };

  return (
    <>
      <Dropdown
        placeholder="Filter"
        search
        clearable
        options={dropdownOptions}
        fluid
        multiple
        selection
        value={filters}
        allowAdditions
        additionLabel="Keyword: "
        onAddItem={onFilterAddition}
        onChange={onFilterChange}
      />

      <Accordion styled fluid style={{
        marginTop: "1em"
      }}>
        <Accordion.Title active={active} onClick={() => setActive(!active)}>
          <Icon name="dropdown" />
          Filter / Sort
        </Accordion.Title>
        <Accordion.Content active={active}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  Filter
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <OptionDisplay type="Difficulty" options={options.difficulty} />
              <OptionDisplay type="Judge" options={options.judge} />
              <OptionDisplay type="Level" options={options.level} />
              <TagDisplay />
            </Table.Body>
          </Table>

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Sort Order
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Dropdown
                    options={context.data.sortOrders}
                    value={context.setting.sortOrder}
                    onChange={onSortOrderChange}
                    selection
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    </>
  )
}
