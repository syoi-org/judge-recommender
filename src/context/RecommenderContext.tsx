import * as React from 'react';
import { SortOrder, Problem, Tag, FilterOption } from '../util/types';

const defaultRecommenderContext = {
  fetched: false,

  setting: {
    filters: [] as string[],
    sortOrder: 'default' as SortOrder,
  },

  data: {
    problems: [] as Problem[],
    tags: [] as Tag[],
    options: {
      difficulty: [] as FilterOption[],
      level: [] as FilterOption[],
      judge: [] as FilterOption[],
    },
    groupedTags: {} as { [group: string]: Tag[] },
    tagGroups: new Map<string, string>(),
    tagDescription: new Map<string, string>(),
    sortOrders: [] as FilterOption[],
    keywords: [] as FilterOption[],
  },
};

export type SetState<T> = T | ((t: T) => T);

export type RecommenderContextProps = typeof defaultRecommenderContext;
export type RecommenderContextState = RecommenderContextProps & {
  setState: (recommenderContext: SetState<RecommenderContextProps>) => void;
}

export const RecommenderContext = React.createContext<RecommenderContextState>({
  ...defaultRecommenderContext,
  setState: (recommenderContext: SetState<RecommenderContextProps>) => { },
});

export function RecommenderContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<RecommenderContextProps>(defaultRecommenderContext);

  return (
    <RecommenderContext.Provider value={{
      ...state, setState
    }}>
      {children}
    </RecommenderContext.Provider>
  );
}