import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson.js";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import Cars from "../lists/Cars.js";
import { Link } from "react-router-dom";

const getStyles = () => ({
  card: {
    width: "85vw",
    borderColor: "darkgray",
  },
  subCard: {
    border: "none",
  },
});

const Person = (props) => {
  const { id, firstName, lastName } = props;
  const styles = getStyles();
  const [editMode, setEditMode] = useState(false);
  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          title={`${firstName} ${lastName}`}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} firstName={firstName} lastName={lastName} />,
          ]}
        >
          <Card style={styles.subCard}>
            <Cars personId={id} />
          </Card>
          <Link to={`/people/${id}`}>Learn More</Link>
        </Card>
      )}
    </div>
  );
};

export default Person;
