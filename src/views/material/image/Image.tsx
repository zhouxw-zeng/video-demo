import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table } from 'antd';
import  { useApp } from '../../../hooks/useApp';
import { materialImageList } from '../../../apis/modules/material';
interface DataType {
  id: number;
  imageName: string;
  imageUrl: string;
  isDisabled: boolean;
  createTime: string;
  updateTime: string;
  createById?: number;
}
const Image: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useApp();

  const [tableData, setTableData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const columns = [
    {
      title: '图片名称',
      dataIndex: 'imageName',
      key: 'imageName',
    },
    {
      title: '图片地址',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
    },
    {
      title: '是否禁用',
      dataIndex: 'isDisabled',
      key: 'isDisabled',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => {
        console.log(record, 'recode')
        return (
          <div>
            <Button type='text' onClick={() => onEdit(record.id)}>{t('edit')}</Button>
            <Button type='text' danger onClick={() => onDelete(record.id)}>{t('delete')}</Button>
          </div>
        )
      }
    }
  ]

  const onEdit = (e) => {
    console.log(e, 'edit====')
  }

  const onDelete = (e) => {
    console.log(e, 'delete====')
  }

  const onSearch = () => {
    const formValues = form.getFieldsValue();
    console.log('搜索参数:', formValues);
    getList(formValues);
  };
  useEffect(() => {
    getList();
    //  卸载时清空表格数据
    return () => {
      setTableData([]);
    }
  }, [])

  const onReset = () => {
    form.resetFields();
    // 重置后重新获取数据（不传参数）
    getList({});
  }

  const getList = async (params?: any) => {
    try {
      setLoading(true);
      const res = await materialImageList(params)
      if (res.code === 200) {
        setTableData(res.data?.dataList || []);
      }
    } finally {
      setLoading(false);
    }
  }

  return <div className="p-6">
    <Form
      layout="inline"
      form={form}
      size='middle'
    >
      <Form.Item label={t('imageName')} name="imageName">
        <Input placeholder={t('placeholderImageName')} />
      </Form.Item>
      
      <Form.Item>
        <div className='flex justify-center items-center gap-4'>
          <Button size='middle' onClick={onSearch}>{t('search')}</Button>
          <Button size='middle' onClick={onReset}>{t('reset')}</Button>
        </div>
      </Form.Item>
    </Form>
    <br />
    <Table<DataType> loading={loading} columns={columns} dataSource={tableData} rowKey="id" />
  </div>;
}

export default Image;