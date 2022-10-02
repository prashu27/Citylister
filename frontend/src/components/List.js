import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Button,
  Col,
  Input,
  List,
  Row,
  Skeleton,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import axioswrapper from "../apis/index";
import EditModel from "./EditModel";

const { Title } = Typography;

const CityList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isEditClicked, setEditClicked] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [filteredCityList, setFilteredCityList] = useState([]);
  const [options, setOptions] = useState([]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "City Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "City Image",
      dataIndex: "url",
      key: "url",
      render: (_, record) => (
        <img width={"70%"} height={"200"} alt="logo" src={record?.url} />
      ),
      width: "45%",
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <Typography.Link onClick={() => editClickHandler(record)}>
          Edit
        </Typography.Link>
      ),
      width: "10%",
    },
  ];

  const editClickHandler = (item) => {
    console.log("Edit click handler called" + JSON.stringify(item));
    setSelectedCity(item);
    setEditClicked(true);
  };

  const handleClose = () => {
    getUpdatedCity();
    setEditClicked(false);
    setSelectedCity(null);
  };

  const getCityList = async () => {
    setInitLoading(true);
    const response = await axioswrapper().get("");
    setCityList(response.data);

    setFilteredCityList(response.data);
    setSearchValue("");

    setInitLoading(false);
    console.log("api response", response);
  };

  const getUpdatedCity = async () => {
    setInitLoading(true);
    const { id } = selectedCity;
    const response = await axioswrapper().get("/" + id);
    console.log("getbyId response", response);
    if (response.status == 200) {
      const index = cityList.findIndex((city) => {
        return city.id === id;
      });
      const tempList = [...cityList];
      tempList[index] = response.data;
      setCityList(tempList);

      setFilteredCityList(tempList);
      setSearchValue("");

      setInitLoading(false);
    }
  };

  useEffect(() => {
    getCityList();
  }, []);

  const getOptions = (keyword) => {
    const options = [];
    cityList.map((city) => {
      if (city.name.toUpperCase().includes(keyword.toUpperCase())) {
        console.log("city found ", city.name);
        options.push({ value: city.name });
      }
    });

    setOptions(options);
  };
  return (
    <div style={{ mt: 2 }}>
      {isEditClicked && (
        <EditModel selectedCity={selectedCity} handleClose={handleClose} />
      )}

      <Table
        col
        loading={initLoading}
        pagination={{
          defaultPageSize: 5,
          defaultCurrent: 1,
          position: ["bottomRight"],
        }}
        //dataSource={cityList}
        dataSource={filteredCityList}
        columns={columns}
        title={() => (
          <Row>
            <Col span={8}>{/* <Title level={2}>City Lister</Title> */}</Col>
            <Col span={10} offset={6}>
              <AutoComplete
                listHeight={100}
                className="mt-3 mb-3"
                style={{ width: "100%" }}
                placeholder="Search City Name..."
                value={searchValue}
                options={options}
                onChange={(keyword) => {
                  getOptions(keyword);
                  setSearchValue(keyword);
                  setFilteredCityList(
                    cityList.filter((city) =>
                      city.name.toUpperCase().includes(keyword.toUpperCase())
                    )
                  );
                }}
              >
                <Input suffix={<SearchOutlined />} />
              </AutoComplete>
            </Col>
          </Row>
        )}
      />

      {/* <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={cityList}
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item?.id}
            actions={[
              <Tooltip title="edit city name/photo">
                <Button
                  onClick={() => editClickHandler(item)}
                  type="link"
                  shape="default"
                  icon={<EditOutlined />}
                />
              </Tooltip>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta title={item?.name} />
            </Skeleton>
            {<img width={272} alt="logo" src={item?.url} />}
          </List.Item>
        )}
      /> */}
    </div>
  );
};

export default CityList;
