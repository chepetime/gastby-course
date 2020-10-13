import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    padding: 5px;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // Return pizzas?
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      const excistingTopping = acc[topping.id];
      if (excistingTopping) {
        acc[topping.id].count += 1;
      } else {
        acc[topping.id] = {
          ...topping,
          count: 1,
        };
      }

      return acc;
    }, {});

  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
}

export default function ToppingsFilter() {
  console.clear();
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

  // All a list of all the toppings
  // All a list of all the pizzas
  // Count how many pizzas are in each topping
  // Loop over the list of toppings and display the topping and the count of pizzas in that topping
  // Link it up etc
  return (
    <div>
      <p>Toppings</p>
      <ToppingsStyles>
        {toppingsWithCounts.map((topping) => (
          <Link to={`/topping/${topping.name}`} key={topping.id}>
            <span>{topping.name}</span>
            <span className="count">{topping.count}</span>
          </Link>
        ))}
      </ToppingsStyles>
    </div>
  );
}
