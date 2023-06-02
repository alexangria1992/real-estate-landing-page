import React, { createContext, useEffect, useState } from "react";

import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location(any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any) ");
  const [loading, setLoading] = useState(false);

  //Return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    // console.log(allCountries);

    //Remove Duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    // console.log(uniqueCountries);

    // set Countries state
    setCountries(uniqueCountries);
  }, []);

  //Return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    // console.log(allProperties);

    //Remove Duplicates
    const uniqueProperties = ["Location (any)", ...new Set(allProperties)];
    // console.log(allProperties);

    // // set Countries state
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    // console.log(country, property, price);
    // set Loading
    setLoading(true);
    // create a function that checks if the string incliues '(any)
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };
    // console.log(isDefault(country));
    // console.log(price);
    // get first value of price and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);
    // get second value of price which is the
    // maximum price and parse it to number
    const maxPrice = parseInt(price.split(" ")[2]);
    // console.log(maxPrice);

    const newHouses = housesData.filter((house) => {
      // console.log(parseInt(house.price));
      const housePrice = parseInt(house.price);
      //if all values are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      // if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      // if country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      // if property is not default
      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }

      //if price is not default
      if (!isDefault(price) && isDefault(country) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // if country and property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }

      // if country and price is not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      // property and price is not default
      if (!isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });

    // console.log(newHouses);
    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
