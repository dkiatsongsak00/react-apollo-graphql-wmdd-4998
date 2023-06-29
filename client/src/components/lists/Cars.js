import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import { List } from "antd";
import Car from "../listItems/Car";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Cars = ({ personId }) => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const filteredCars = data.cars.filter((car) => car.personId === personId);

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {filteredCars.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
          <Car
            id={id}
            year={year}
            make={make}
            model={model}
            price={price}
            personId={personId}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default Cars;
