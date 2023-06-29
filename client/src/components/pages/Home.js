import React from "react";
import Title from "../layout/Title";
import AddPerson from "../forms/AddPerson";
import People from "../lists/People";
import AddCar from "../forms/AddCar";

const getStyles = () => ({
  home: {
    padding: "15px",
    margin: "50px",
    border: "4px solid black",
  },
});

const Home = () => {
  const styles = getStyles();
  return (
    <div style={styles.home}>
      <Title />
      <AddPerson />
      <AddCar />
      <People />
    </div>
  );
};

export default Home;
