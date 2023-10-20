import { Table } from "antd"
import { ColumnsType } from "antd/es/table";

interface OrderInfo {
    id: string;
    product: string;
    qty: number;
    status: string;
  }

interface Props {
    data: OrderInfo[];
    columns: ColumnsType<OrderInfo>;
  }

const OrderList = ({ data, columns} : Props) => {
  const pagination = {
    pageSize: 5,
  }

    return (
      <>
      
        <Table columns={columns} dataSource={data} pagination={pagination} />

      </>

    )
}

export default OrderList
