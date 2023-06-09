/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useReducer, useState } from 'react';

import { filtersInitializer, filtersReducer } from './business-filters-reducer';
import { businessTypesOptions, nichesOptions } from '../util/parameters';
import { DUMMY_BUSINESSES, DUMMY_OFFERS } from '../util/data';

const BusinessContext = React.createContext({
  // business parameters
  businessTypesOptions: [],
  nichesOptions: [],

  // business data
  allBusinesses: [],
  businessesList: [],
  addNewBusiness: () => {},
  updateBusiness: () => {},
});

export function BusinessContextProvider(props) {
  const allBusinesses = DUMMY_BUSINESSES;
  const offersList = DUMMY_OFFERS;

  const [filters, dispatch] = useReducer(filtersReducer, filtersInitializer);

  const [homePageBusinessesList, setHomePageBusinessesList] =
    useState(allBusinesses);

  // Filters Logic
  useEffect(() => {
    let businesses = [];

    setHomePageBusinessesList(() => {
      // business type filter logic
      if (filters.typeFilter.length === 0) {
        businesses = allBusinesses;
      }
      if (filters.typeFilter.length > 0) {
        businesses = allBusinesses.filter((business) =>
          filters.typeFilter.includes(business.type)
        );
      }
      // business search filter logic
      if (filters.searchFilter !== '') {
        businesses = businesses.filter(
          (business) =>
            business.title
              .trim()
              .toLowerCase()
              .includes(filters.searchFilter) ||
            business.description
              .trim()
              .toLowerCase()
              .includes(filters.searchFilter) ||
            business.type.trim().toLowerCase().includes(filters.searchFilter)
        );
      }
      // business price filter logic
      if (filters.priceFilter.min > 0 || filters.priceFilter.max < Infinity) {
        businesses = businesses.filter(
          (business) =>
            business.askingPrice >= filters.priceFilter.min &&
            business.askingPrice <= filters.priceFilter.max
        );
      }
      // business profit filter logic
      if (filters.profitFilter.min > 0 || filters.profitFilter.max < Infinity) {
        businesses = businesses.filter(
          (business) =>
            business.monthlyProfit >= filters.profitFilter.min &&
            business.monthlyProfit <= filters.profitFilter.max
        );
      }
      // user filter logic
      if (filters.userFilter.id) {
        businesses = businesses.filter(
          (business) => business.ownerId !== filters.userFilter.id
        );
      }
      return businesses;
    });
  }, [filters]);

  const addNewBusiness = () => {
    return console.log('New Business Created!');
  };
  const updateBusiness = () => {
    return console.log('Business Info Updated!');
  };

  return (
    <BusinessContext.Provider
      value={{
        // business parameters
        businessTypesOptions,
        nichesOptions,

        // business data
        allBusinesses,
        businessesList: homePageBusinessesList,
        addNewBusiness,
        updateBusiness,
        filterHandler: dispatch,
      }}
    >
      {props.children}
    </BusinessContext.Provider>
  );
}

export default BusinessContext;
