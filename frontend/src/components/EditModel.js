import { Button, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axioswrapper from "../apis/index";

const EditModel = (props) => {
  const { handleClose, selectedCity } = props;

  const [city, setCity] = useState(selectedCity);
  const [cityName, setCityName] = useState(selectedCity.name);
  const [url, setUrl] = useState(selectedCity.url);
  const [initLoading, setInitLoading] = useState(true);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    console.log("selected City data", selectedCity);
  }, []);

  const handleOk = async () => {
    console.log("city obj" + JSON.stringify(city));
    if (formError?.name || formError?.url) {
      message.error("Both fields are required");
      return;
    }

    await editCity();
    handleClose();
  };

  const showError = (msg) => {
    message.error(msg || "Error while updating City details!!");
  };

  const success = () => {
    message.success("City successfully updated", 2);
  };

  const editCity = async () => {
    try {
      setInitLoading(true);
      console.log("axios called");
      const response = await axioswrapper().put("/" + city.id, city);
      console.log("POST RESPONSE :", response);
      console.log("POST RESPONSE :", JSON.stringify(response.data));
      response.status == 202 && success();
      setInitLoading(false);
    } catch (error) {
      showError(error?.response?.data?.description || error?.message);
    }
    setInitLoading(false);
  };

  const onChangeHandler = (event) => {
    const { target } = event;
    const { name, value } = target;

    if (!value || value.trim() === "") {
      setFormError({
        ...formError,
        [name]: `${name} is required`,
      });
    } else {
      setFormError({
        ...formError,
        [name]: null,
      });
    }

    setCity({
      ...city,
      [name]: value,
    });
  };

  const onchangeHandlerUrl = (event) => {
    const { target } = event;
    setUrl(target.value);
    console.log("updated url", url);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={true}
        onOk={handleOk}
        onCancel={handleClose}
      >
        <Form.Item help={formError?.name}>
          <Input
            name="name"
            value={city.name}
            onChange={onChangeHandler}
            placeholder="enter city name"
            status={formError?.name && "error"}
          />
        </Form.Item>
        <Form.Item help={formError?.url}>
          <Input
            name="url"
            value={city.url}
            onChange={onChangeHandler}
            placeholder=" provi.de updated city url"
            status={formError?.url && "error"}
          />
        </Form.Item>
        <img src={city.url} width="200px" height="200px"></img>
      </Modal>
    </>
  );
};

export default EditModel;
