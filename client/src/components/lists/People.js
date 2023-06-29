import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import { List } from "antd";
import Person from "../listItems/Person";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    display: "flex",
    alignItems: "center",
  },
  separator: {
    flex: 1,
    borderBottom: "1px solid #ccc",
    marginLeft: "10px",
    marginRight: "10px",
  },
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div>
        <h2 style={styles.heading}>
          <span style={styles.separator}></span>
          Records
          <span style={styles.separator}></span>
        </h2>
      </div>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.people.map(({ id, firstName, lastName }) => (
          <List.Item key={id}>
            <Person id={id} firstName={firstName} lastName={lastName} />
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default People;
