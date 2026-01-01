// User Types
export interface IUser {
  id: string;
  name: string;
  slug?: string;
  email: string;
  phone?: string;
  profileImg?: string;
  role: "user" | "manager" | "admin";
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "user" | "manager" | "admin";
}

// Category Types
export interface ICategory {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryCreate {
  name: string;
  image?: string;
}

// SubCategory Types
export interface ISubCategory {
  id: string;
  name: string;
  slug?: string;
  categoryId: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  category?: ICategory;
}

export interface ISubCategoryCreate {
  name: string;
  categoryId: string;
  image?: string;
}

// Brand Types
export interface IBrand {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrandCreate {
  name: string;
  image?: string;
}

// Product Types
export interface IProduct {
  id: string;
  title: string;
  slug?: string;
  description: string;
  quantity?: number;
  sold?: number;
  price?: number;
  priceAfterDiscount?: number;
  colors?: any[];
  imageCover?: string;
  images?: any[];
  ratingsAverage?: number;
  ratingsQuantity?: number;
  categoryId?: string;
  brandId?: string;
  createdAt: Date;
  updatedAt: Date;
  category?: ICategory;
  brand?: IBrand;
  subCategories?: ISubCategory[];
}

export interface IProductCreate {
  title: string;
  description: string;
  quantity?: number;
  price?: number;
  priceAfterDiscount?: number;
  colors?: any[];
  imageCover?: string;
  images?: any[];
  categoryId?: string;
  brandId?: string;
}

// Order Types
export interface IOrder {
  id: string;
  taxPrice?: number;
  shippingAddress?: object;
  shippingPrice?: number;
  totalOrderPrice?: number;
  paymentMethodType: "card" | "cash";
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
  orderItems?: IOrderItem[];
}

export interface IOrderItem {
  id: string;
  quantity: number;
  color?: string;
  price: number;
  productId: string;
  orderId: string;
  product?: IProduct;
}

// Cart Types
export interface ICart {
  id: string;
  totalCartPrice?: number;
  totalPriceAfterDiscount?: number;
  userId: string;
  cartItems?: ICartItem[];
}

export interface ICartItem {
  id: string;
  quantity: number;
  color?: string;
  price: number;
  productId: string;
  cartId: string;
  product?: IProduct;
}

// Coupon Types
export interface ICoupon {
  id: string;
  name: string;
  expire: Date;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Types
export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ISignupData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone?: string;
}

export interface IAuthResponse {
  status: string;
  token: string;
  data: IUser;
}

// API Response Types
export interface IApiResponse<T> {
  results?: number;
  paginationResult?: IPaginationResult;
  data: T;
  token: string;
  status: string;
}

export interface IPaginationResult {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  next?: number;
  prev?: number;
}

// Error Types
export interface IApiError {
  message: string;
  statusCode?: number;
  status?: string;
}
