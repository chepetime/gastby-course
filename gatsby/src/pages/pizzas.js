import React from 'react';
import { graphql } from 'gatsby';

import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
  return (
    <>
      <PizzaList pizzas={data.pizzas.nodes} />
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
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
