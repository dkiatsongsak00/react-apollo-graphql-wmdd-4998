import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";

const { Option } = Select;

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

const AddCar = () => {
  const styles = getStyles();
  const [addCar] = useMutation(ADD_CAR);
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    const id = uuidv4();

    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId: personId.toString(),
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  const getPersonOptions = () => {
    if (loading) {
      return <Option value="">Loading...</Option>;
    }

    if (error) {
      return <Option value="">Error loading people</Option>;
    }

    return data.people.map((person) => (
      <Option key={person.id} value={person.id.toString()}>
        {person.firstName} {person.lastName}
      </Option>
    ));
  };

  if (!data || !data.people || data.people.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 style={styles.heading}>
        <span style={styles.separator}></span>
        Add Car
        <span style={styles.separator}></span>
      </h2>
      <div style={styles.formContainer}>
        <Form
          form={form}
          name="add-car-form"
          layout="inline"
          onFinish={onFinish}
          size="large"
          style={styles.form}
        >
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: "Please input the year!" }]}
          >
            <Input placeholder="i.e. 2020" type="number" />
          </Form.Item>
          <Form.Item
            name="make"
            label="Make"
            rules={[{ required: true, message: "Please input the make!" }]}
          >
            <Input placeholder="i.e. Tesla" />
          </Form.Item>
          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: "Please input the model!" }]}
          >
            <Input placeholder="i.e. Y" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input
              placeholder="i.e. 70000"
              type="number"
              step="0.01"
              addonBefore="$"
            />
          </Form.Item>
          <Form.Item
            name="personId"
            label="Person"
            rules={[{ required: true, message: "Please select a person!" }]}
          >
            <Select placeholder="Select person">{getPersonOptions()}</Select>
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
                Add Car
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCar;
