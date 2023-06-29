import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const getStyles = () => ({
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
  formContainer: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    margin: "20px",
  },
});

const AddPerson = () => {
  const styles = getStyles();
  const [addPerson] = useMutation(ADD_PERSON);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    const id = uuidv4();

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  return (
    <div>
      <h2 style={styles.heading}>
        <span style={styles.separator}></span>
        Add Person
        <span style={styles.separator}></span>
      </h2>
      <div style={styles.formContainer}>
        <Form
          form={form}
          name="add-person-form"
          layout="inline"
          onFinish={onFinish}
          size="large"
          style={styles.form}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="i.e. John" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="i.e. Smith" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Add Person
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddPerson;
