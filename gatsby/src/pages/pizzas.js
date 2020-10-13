import React from 'react';
import { graphql } from 'gatsby';

import ToppingsFilter from '../components/ToppingsFilter';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
  return (
    <>
      {data && <ToppingsFilter />}
      {data && <PizzaList pizzas={data.pizzas.nodes} />}
      <p>Hey, there are {data.pizzas.nodes.length} pizas page</p>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
          vegetarian
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
