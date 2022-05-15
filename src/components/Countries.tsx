import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { ICountry } from "pages";

interface ICountryData {
  countries: ICountry[];
}

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

const Countries = () => {
  const { data, loading, error } = useQuery<ICountryData>(GET_COUNTRIES);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {data &&
          data.countries.map((country, idx) => (
            <li key={idx}>
              {country.emoji}
              <strong>{country.code}</strong>: {country.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Countries;
