import React from 'react';
import { ProblemsFilter } from './ProblemsFilter/ProblemsFilter';
import { ProblemsDisplay } from './ProblemsDisplay';
import { RecommenderContext } from '../context/RecommenderContext';
import { fetchData } from '../util/fetch-data';

/**
 * Handle data fetching and the communication between display elements.
 */
export function Recommender() {
  const context = React.useContext(RecommenderContext);

  // Ensure that fetchData is called once only.
  if (!context.fetched) {
    context.setState({
      ...context,
      fetched: true,
    });
    fetchData(context);
  }

  return (
    <>
      <ProblemsFilter />
      <ProblemsDisplay />
    </>
  );
}
