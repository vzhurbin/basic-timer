import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getPausesRemaning = state => state[NAME].pausesRemaning;
export const getPageData = state => state[NAME].pageData;
export const getError = state => state[NAME].error;
export const getLoader = state => state[NAME].isLoad;

export const selectLoader = createSelector(getLoader, isLoad => {
  return isLoad;
});

export const selectPageData = createSelector(getPageData, pageData => {
  if (pageData) {
    return pageData;
  }
  return null;
});

export const selectError = createSelector(getError, error => {
  return error;
});
