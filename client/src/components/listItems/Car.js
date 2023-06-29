import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar.js";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";

const getStyles = () => ({
  card: {
    width: "80vw",
    backgroundColor: "#f5f5f5",
  },
});

const Car = (props) => {
  const { id, year, make, model, price, personId } = props;
  const styles = getStyles();
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
            />,
          ]}
        >
          {year} {make} {model} -&gt;{" "}
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Card>
      )}
    </div>
  );
};

export default Car;
