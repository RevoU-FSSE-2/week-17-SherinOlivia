import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import { ColumnsType } from 'antd/es/table';
import { CategoryInfo } from '../../types';
import CategoryList from '.';

const columns: ColumnsType<CategoryInfo> = [
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

describe('Test List of Category Component', () => {

    // it('ID Column Title Renders Correctly',async () => {
    //     render(<CategoryList columns={columns} data={[]} />)
    //     const title = screen.getByText('ID')
    //     expect(title).toBeDefined()     
    // })

    // it('Name Column Title Renders Correctly',async () => {
    //     render(<CategoryList columns={columns} data={[]} />)
    //     const title = screen.getByText('Name')
    //     expect(title).toBeDefined()     
    // })

    // it('Status Column Title Renders Correctly',async () => {
    //     render(<CategoryList columns={columns} data={[]} />)
    //     const title = screen.getByText('Status')
    //     expect(title).toBeDefined()     
    // })

    it('Testing Header Column', () => {
        render(<CategoryList columns={columns} data={[]} />)

        columns.map((column) => {
            if(column.title) {
                const title = screen.getByText(column.title.toString())
                expect(title).toBeDefined()
            }
        });
    });
})

// pnpm run test 'src/components/CategoryList/CategoryList.test.tsx'