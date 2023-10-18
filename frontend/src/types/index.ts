export interface RegisterInfo {
    name: string;
    email: string;
    password: string;
}

export type ProfileInfo = Omit<RegisterInfo, 'password'>
export interface LoginInfo {
    email: string;
    password: string;
}
export interface CategoryInfo {
    id: string;
    name: string;
    is_active: boolean;
}

export type CategoryFormInfo = Omit<CategoryInfo, 'id'>

export interface GetCategoryResponse {
    categories: CategoryInfo[];
    total: number;
    skip: number;
    limit: number;
}