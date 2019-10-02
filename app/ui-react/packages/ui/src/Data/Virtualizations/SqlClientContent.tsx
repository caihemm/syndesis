import { Split, SplitItem, Stack, StackItem } from '@patternfly/react-core';
import {
  classNames,
  Table,
  TableBody,
  TableHeader,
  TableVariant,
} from '@patternfly/react-table';
import * as H from '@syndesis/history';
import { EmptyState, Spinner } from 'patternfly-react';
import * as React from 'react';
import { PageSection } from '../../../src/Layout';
import { EmptyViewsState } from '../Virtualizations/Views/EmptyViewsState';
import './SqlClientContent.css';

export interface ISqlClientContentProps {
  /**
   * The SQL selector form content
   */
  formContent: React.ReactNode;
  /**
   * ViewNames for selector
   */
  viewNames: string[];
  /**
   * Array of column info for the query results.  (The column id and display label)
   * Example:
   * [ { id: 'fName', label: 'First Name'},
   *   { id: 'lName', label: 'Last Name'},
   *   { id: 'country', label: 'Country' }
   * ]
   */
  queryResultCols: IColumn[];
  /**
   * Array of query result rows - must match column order
   * Example:
   * [ ['Jean', 'Frissilla', 'Italy'],
   *   ['John', 'Johnson', 'US'],
   *   ['Juan', 'Bautista', 'Brazil'],
   *   ['Jordan', 'Dristol', 'Ontario']
   * ]
   */
  queryResultRows: Array<{}>;
  isQueryRunning: boolean;
  i18nEmptyStateInfo: string;
  i18nEmptyStateTitle: string;
  i18nImportViews: string;
  i18nImportViewsTip: string;
  i18nLoadingQueryResults: string;
  i18nResultsTitle: string;
  i18nResultsRowCountMsg: string;
  linkCreateViewHRef: H.LocationDescriptor;
  linkImportViewsHRef: H.LocationDescriptor;
  i18nCreateViewTip?: string;
  i18nCreateView: string;
  i18nEmptyResultsTitle: string;
  i18nEmptyResultsMsg: string;
}

interface IColumn {
  id: string;
  label: string;
}

const getColumnLabels = (cols: IColumn[]) => {
  return cols.map(col => ({
    columnTransforms: [classNames('pf-m-fit-content')],
    title: col.label,
  }));
};

/**
 * The SQL client content.  This component includes:
 * - SqlClientForm - for selection of the view and query params
 * - Table - for display of the query results
 * - EmptyStates - displayed when no views available or no results available.
 */
export const SqlClientContent: React.FunctionComponent<
  ISqlClientContentProps
> = props => {
  return (
    <PageSection>
      {props.viewNames.length > 0 ? (
        <Split gutter="md">
          <SplitItem isFilled={false}>{props.formContent}</SplitItem>
          <SplitItem
            isFilled={true}
            className={'sql-client-content__resultsSection'}
          >
            {props.isQueryRunning ? (
              <Split>
                <SplitItem isFilled={false}>
                  <Spinner loading={true} inline={false} />
                </SplitItem>
                <SplitItem isFilled={true}>
                  &nbsp;&nbsp;{props.i18nLoadingQueryResults}
                </SplitItem>
              </Split>
            ) : props.queryResultCols.length > 0 ? (
              <Stack>
                <StackItem isFilled={false}>{props.i18nResultsTitle}</StackItem>
                <StackItem isFilled={false}>
                  <small>
                    <i>
                      {props.i18nResultsRowCountMsg}
                      {props.queryResultRows.length}
                    </i>
                  </small>
                </StackItem>
                <StackItem isFilled={true}>
                  <Table
                    variant={TableVariant.compact}
                    cells={getColumnLabels(props.queryResultCols)}
                    rows={props.queryResultRows}
                  >
                    <TableHeader />
                    <TableBody />
                  </Table>
                </StackItem>
              </Stack>
            ) : (
              <EmptyState>
                <EmptyState.Title>
                  {props.i18nEmptyResultsTitle}
                </EmptyState.Title>
                <EmptyState.Info>{props.i18nEmptyResultsMsg}</EmptyState.Info>
              </EmptyState>
            )}
          </SplitItem>
        </Split>
      ) : (
        <EmptyViewsState
          i18nEmptyStateTitle={props.i18nEmptyStateTitle}
          i18nEmptyStateInfo={props.i18nEmptyStateInfo}
          i18nCreateView={props.i18nCreateView}
          i18nCreateViewTip={props.i18nCreateViewTip}
          i18nImportViews={props.i18nImportViews}
          i18nImportViewsTip={props.i18nImportViewsTip}
          linkCreateViewHRef={props.linkCreateViewHRef}
          linkImportViewsHRef={props.linkImportViewsHRef}
        />
      )}
    </PageSection>
  );
};
