import rootSelector from './root';
import { createSelector } from 'reselect';

export const localeSelector = createSelector(
  rootSelector,
  ({ localization }) => localization.current,
);

export const messagesSelector = createSelector(
  rootSelector,
  ({ localization }) => localization.messages,
);
