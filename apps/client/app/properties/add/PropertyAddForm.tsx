'use client';
import { PropertyType } from '@/components/types';
import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  UploadProps,
  Radio,
} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const PropertyAddForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<File[]>([]);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const props: UploadProps = {
    listType: 'picture',
    maxCount: 4,
    accept: 'image/*',
    beforeUpload(file: File) {
      setFileList([...fileList, file]);
      return false;
    },
  };

  const handleCheckboxGroupChange = (checkedValues: any) => {
    setCheckedValues(checkedValues);
  };

  const handleFormSubmit: FormProps<PropertyType>['onFinish'] =
    async values => {
      const formData = new FormData();

      fileList.forEach(file => {
        formData.append('photos', file);
      });

      checkedValues.forEach(value => {
        formData.append('amenities', value);
      });

      (Object.keys(values) as Array<keyof PropertyType>).forEach(key => {
        if (
          key in values &&
          values[key] &&
          key !== 'photos' &&
          key !== 'amenities'
        ) {
          formData.append(key, String(values[key]));
        }
      });

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8000/v1';
        await axios.post(`${apiUrl}/apartment`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        form.resetFields();
        toast.success('Property Added');
      } catch (err: any) {
        console.error('🚀🚀 ~ PropertyAddForm ~ err:', err);
        toast.error(`Failed to delete property + ${err.message}`);
      }
    };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Form
        form={form}
        autoComplete="off"
        initialValues={{
          type: '',
          title: '',
          description: '',
          furnishingStatus: '',
          rooms: 1,
          baths: 1,
          area: 1,
          amenities: [],
          price: 1,
          photos: [],
        }}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        onFinish={handleFormSubmit}
      >
        <h2 className="text-3xl text-center font-semibold mb-6">
          Add Property
        </h2>

        <FormItem
          className="mb-4"
          name="type"
          colon={false}
          rules={[
            { required: true, message: 'Please input your property type!' },
          ]}
        >
          <Space direction="vertical" className="w-full">
            <span className="block text-gray-700 text-sm font-bold mb-2">
              Select Property
            </span>
            <Select
              onChange={(value: string) => {
                form.setFieldValue('type', value);
              }}
              defaultValue="Select Property"
              options={[
                {
                  value: 'Select Property',
                  label: <span>Select Property</span>,
                  disabled: true,
                },
                { value: 'Apartment', label: <span>Apartment</span> },
                { value: 'Condo', label: <span>Condo</span> },
                { value: 'House', label: <span>House</span> },
                { value: 'Cabin', label: <span>Cabin</span> },
                { value: 'Room', label: <span>Room</span> },
                { value: 'Studio', label: <span>Studio</span> },
                { value: 'Other', label: <span>Other</span> },
              ]}
            />
          </Space>
        </FormItem>

        <FormItem
          name="title"
          className="mb-4"
          rules={[
            { required: true, message: 'Please input your property title!' },
          ]}
        >
          <Space direction="vertical" className="w-full">
            <span className="block text-gray-700 font-bold mb-2">
              Property Title
            </span>
            <Input placeholder='eg. Beautiful Apartment In Miami"' />
          </Space>
        </FormItem>

        <FormItem
          name="description"
          className="mb-4"
          rules={[
            {
              required: true,
              message: 'Please input your property description!',
            },
          ]}
        >
          <Space direction="vertical" className="w-full">
            <span className="block text-gray-700 font-bold mb-2">
              Description
            </span>
            <TextArea />
          </Space>
        </FormItem>

        <Flex gap="middle">
          <FormItem
            name="rooms"
            className="mb-4"
            rules={[
              {
                required: true,
                message: 'Please input your property description!',
              },
            ]}
          >
            <Space>
              <span className="block text-gray-700 font-bold mb-2">rooms</span>
              <InputNumber
                min={1}
                max={100}
                value={form.getFieldValue('rooms')}
              />
            </Space>
          </FormItem>
          <FormItem
            name="baths"
            className="mb-4"
            required
            rules={[
              {
                required: true,
                message: 'Please input your property description!',
              },
            ]}
          >
            <Space>
              <span className="block text-gray-700 font-bold mb-2">baths</span>
              <InputNumber
                min={1}
                max={100}
                value={form.getFieldValue('baths')}
              />
            </Space>
          </FormItem>
          <FormItem
            name="area"
            className="mb-4"
            required
            rules={[
              {
                required: true,
                message: 'Please input your property description!',
              },
            ]}
          >
            <Space>
              <span className="block text-gray-700 font-bold mb-2">area</span>
              <InputNumber
                min={1}
                max={100}
                value={form.getFieldValue('area')}
              />
            </Space>
          </FormItem>
        </Flex>

        <FormItem
          name="amenities"
          className="mb-4"
          rules={[
            {
              required: true,
              message: 'Please input your property amenities!',
            },
          ]}
        >
          <Space className="w-full">
            <span className="block text-gray-700 font-bold mb-2">
              Amenities
            </span>
            <Checkbox.Group onChange={handleCheckboxGroupChange}>
              <Checkbox value="Air Conditioning">Air Conditioning</Checkbox>
              <Checkbox value="Balcony">Balcony</Checkbox>
              <Checkbox value="Fireplace">Fireplace</Checkbox>
              <Checkbox value="Garden">Garden</Checkbox>
              <Checkbox value="Patio">Patio</Checkbox>
              <Checkbox value="Swimming Pool">Swimming Pool</Checkbox>
              <Checkbox value="Terrace">Terrace</Checkbox>
              <Checkbox value="Tub & Shower">Tub & Shower</Checkbox>
              <Checkbox value="Utilities Included">Utilities Included</Checkbox>
              <Checkbox value="Cable TV">Cable TV</Checkbox>
              <Checkbox value="Dishwasher">Dishwasher</Checkbox>
              <Checkbox value="Dishwasher and Dryer">
                Dishwasher and Dryer
              </Checkbox>
            </Checkbox.Group>
          </Space>
        </FormItem>

        <Form.Item
          name="furnishingStatus"
          className="mb-4"
          rules={[
            {
              required: true,
              message: 'Please input your property furnishing status!',
            },
          ]}
        >
          <Space className="w-full">
            <span className="block text-gray-700 font-bold mb-2">
              Furnishing Status
            </span>
            <Radio.Group>
              <Radio value="Fully Furnished">Fully Furnished</Radio>
              <Radio value="Partially Furnished">Partially Furnished</Radio>
              <Radio value="Unfurnished">Unfurnished</Radio>
            </Radio.Group>
          </Space>
        </Form.Item>

        <FormItem
          name="price"
          className="mb-4"
          rules={[
            { required: true, message: 'Please input your property price!' },
          ]}
        >
          <Space className="w-full">
            <span className="block text-gray-700 font-bold mb-2">Price</span>
            <InputNumber min={1} value={form.getFieldValue('price')} />
          </Space>
        </FormItem>

        <Form.Item
          name="photos"
          valuePropName="photos"
          className="mb-4"
          rules={[
            { required: true, message: 'Please input your property photos!' },
          ]}
        >
          <Space className="w-full">
            <span className="block text-gray-700 font-bold mb-2">Upload</span>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Space>
        </Form.Item>

        <Button
          type="primary"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          htmlType="submit"
        >
          Add Property
        </Button>
      </Form>
    )
  );
};
export default PropertyAddForm;
