import React, { useContext } from "react";

import { HouseContext } from "./HouseContext";

import House from "./House";

import { Link } from "react-router-dom";

import { ImSpinner2 } from "react-icons/im";

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);
  console.log(houses);

  return (
    <section className="mb-20 border-2 border-red-600">
      <div className="container border-2 border-green-500 mx-auto">
        <div>
          {houses.map((house, index) => {
            return (
              <Link to={`/property/${house.id}`} key={index}>
                <House house={house} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
