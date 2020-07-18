import * as React from 'react';
import { RecommenderContext } from '../../context/RecommenderContext';
import { Button } from 'semantic-ui-react';

interface Props {
  text: string;
  value: any;
  source: any;
  [key: string]: any;
}

/**
 * The button used in the list of options.
 */
export function OptionButton({ text, value, source, ...props }: Props) {
  const context = React.useContext(RecommenderContext);
  const { filters } = context.setting;
  const { tagDescription } = context.data;

  const onClick = () => {
    console.log(filters);
    if (value && !filters.includes(value)) {
      context.setState((context) => ({
        ...context,
        setting: {
          ...context.setting,
          filters: filters.concat([value]),
        },
      }));
    }
  }

  return (
    <Button
      title={tagDescription.has(source) ? tagDescription.get(source) : ''}
      size="mini"
      style={{ marginBottom: "2px", marginTop: "2px" }}
      onClick={onClick}
      {...props}>
      {text || '\u00A0'}
    </Button>
  )
};
