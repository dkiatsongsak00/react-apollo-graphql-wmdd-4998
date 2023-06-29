import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_CAR, GET_PEOPLE } from "../../queries";

const { Option } = Select;

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [updateCar] = useMutation(UPDATE_CAR);
  const { loading, error, data } = useQuery(GET_PEOPLE);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    updateCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId: personId.toString(),
      },
    });
    props.onButtonClick();
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

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year,
        make,
        model,
        price,
        personId,
      }}
      size="large"
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input the year!" }]}
      >
        <Input placeholder="Year" type="number" />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input the make!" }]}
      >
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input the model!" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <Input placeholder="Price" type="number" step="0.01" />
      </Form.Item>
      <Form.Item
        name="personId"
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
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
