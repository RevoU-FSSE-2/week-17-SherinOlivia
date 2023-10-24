export interface RegisterInfo {
    username: string;
    email: string;
    password: string;
}

export type ProfileInfo = Omit<RegisterInfo, 'password'>
export interface LoginInfo {
    email: string;
    password: string;
}
export interface OrderInfo {
    id: string;
    product_name: string;
    order_qty: number;
    status: string;
}

export type OrderFormInfo = Omit<OrderInfo, 'id'>

export type CreateInfo = Omit<OrderInfo, 'id'>

export interface GetOrderResponse {
    categories: OrderInfo[];
    total: number;
    skip: number;
    limit: number;
}