import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../../queries";

const getStyles = () => ({
  showPageContainer: {
    padding: "15px",
    margin: "50px",
    border: "4px solid black",
  },
  textContainer: {
    textAlign: "center",
  },
});

const ShowPage = () => {
  const styles = getStyles();
  const { id } = useParams();

  const { loading, error, data, refetch } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId: id.toString() },
  });

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { person, cars } = data.GetPersonWithCars;

  if (!person) {
    return <div>Person not found.</div>;
  }

  return (
    <div style={styles.showPageContainer}>
      <div style={styles.textContainer}>
        <h2>{`${person.firstName} ${person.lastName}'s Cars`}</h2>
        {cars.map((car) => (
          <div key={car.id}>
            <p>Year: {car.year}</p>
            <p>Make: {car.make}</p>
            <p>Model: {car.model}</p>
            <p>
              Price:{" "}
              {car.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <hr />
          </div>
        ))}
      </div>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default ShowPage;
