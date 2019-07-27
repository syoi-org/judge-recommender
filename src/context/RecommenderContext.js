import * as React from 'react';

export const RecommenderContext = React.createContext();

export function RecommenderContextProvider({ children }) {
  const initialState = {
    fetched: false,

    setting: {
      filters: [],
      sortOrder: 'default',
    },

    data: {
      problems: [],
      tags: [],
      options: {
        difficulty: [],
        level: [],
        judge: [],
      },
      groupedTags: {},
      tagGroups: new Map(),
      tagDescription: new Map(),
      sortOrders: [],
      keywords: [],
    },
  };

  const [state, setState] = React.useState(initialState);

  return (
    <RecommenderContext.Provider value={{
      ...state, setState
    }}>
      {children}
    </RecommenderContext.Provider>
  );
}