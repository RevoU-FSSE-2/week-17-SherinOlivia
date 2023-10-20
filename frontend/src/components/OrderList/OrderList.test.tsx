import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import { ColumnsType } from 'antd/es/table';
import { OrderInfo } from '../../types';
import OrderList from '.';

const columns: ColumnsType<OrderInfo> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (_, record) => (record.is_active ? 'Active' : 'Deactive')
    },
  ];

describe('Test List of Order Component', () => {

    // it('ID Column Title Renders Correctly',async () => {
    //     render(<OrderList columns={columns} data={[]} />)
    //     const title = screen.getByText('ID')
    //     expect(title).toBeDefined()     
    // })

    // it('Name Column Title Renders Correctly',async () => {
    //     render(<OrderList columns={columns} data={[]} />)
    //     const title = screen.getByText('Name')
    //     expect(title).toBeDefined()     
    // })

    // it('Status Column Title Renders Correctly',async () => {
    //     render(<OrderList columns={columns} data={[]} />)
    //     const title = screen.getByText('Status')
    //     expect(title).toBeDefined()     
    // })

    it('Testing Header Column', () => {
        render(<OrderList columns={columns} data={[]} />)

        columns.map((column) => {
            if(column.title) {
                const title = screen.getByText(column.title.toString())
                expect(title).toBeDefined()
            }
        });
    });
})

// pnpm run test 'src/components/OrderList/OrderList.test.tsx'