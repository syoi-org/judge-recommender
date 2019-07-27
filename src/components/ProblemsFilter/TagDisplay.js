import * as React from 'react';
import {Table, Icon, Popup} from 'semantic-ui-react';
import {RecommenderContext} from '../../context/RecommenderContext';
import OptionButton from './OptionButton';

function TagDisplay() {
  const [currentGroup, setGroup] = React.useState('');
  const context = React.useContext(RecommenderContext);
  const groupedTags = Object.entries(context.data.groupedTags)
    .sort(([u], [v]) => u > v);
  const tagSet = new Set(context.data.tags.map((tag) => tag.source));

  const addTag = (tag) => {
    if (!context.setting.filters.includes(tag)) {
      context.setState((context) => ({
        ...context,
        setting: {
          ...context.setting,
          filters: context.setting.filters.concat(tag),
        },
      }));
    }
  }

  return (
    <Table.Row>
      <Table.Cell>
        Tags
        <Popup
          position="right center"
          trigger={
            <Icon name="question circle" />
          }>
          The blue buttons are the group of tags.
          <ul style={{
            margin: '0',
            paddingLeft: '15px'
          }}>
            <li><b>Add a tag:</b> select the group to expand it, then select the tag.</li>
            <li><b>Add a group:</b> select the group, then click the green group button.</li>
          </ul>
        </Popup>
      </Table.Cell>
      <Table.Cell>
        {
          groupedTags.map(([group, tags], id) => (
            <>
              {currentGroup === group && id !== 0 && <br />}
              <OptionButton
                key={group}
                text={group}
                source={group}
                color={currentGroup === group && tagSet.has(group) ? 'green' : 'blue'}
                onClick={() => {
                  if (currentGroup !== group)
                    setGroup(group);
                  else if (tagSet.has(group))
                    addTag(tagSet.has(group) && `tag:${group}`);
                }} />
              {
                currentGroup === group && <>
                  <Icon
                    name="hand point right outline" />
                  {tags && tags
                    .sort((a, b) => a.source > b.source ? 1 : -1)
                    .map((tag) => (
                      <OptionButton
                        key={tag.source}
                        source={tag.source}
                        text={tag.source}
                        value={tag.value} />
                    ))}
                  {id !== groupedTags.length - 1 && <br />}
                </>
              }
            </>
          ))
        }
      </Table.Cell>
    </Table.Row>
  );
}


export default TagDisplay;