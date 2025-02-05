import React from 'react';
import { useGetOrdersByEmailQuery } from '../../redux/features/orders/ordersAPI';
import { useAuth } from '../../firebase/AuthContext';

const OrderPage = () => {
    const currentUser = useAuth();
    const { data = {}, isError } = useGetOrdersByEmailQuery(currentUser.currentUser.email);
    const orders = data.data || [];

    if(isError) return <div>An error occurred while fetching your orders</div>

    return (
        <div className='container text-center mx-auto px-12 py-6'>
            <h2 className='text-3xl font-semibold underline underline-offset-4 decoration-purpleButton'>Your Orders</h2>
            {
                orders.length == 0 ? (<div>No orders found</div>) : (
                    <div>
                        {
                            orders.map((order, index) => (
                                <div className='border-b-2 mt-8 border-purpleButton pb-4 grid gap-y-3'>
                                    <h3 key={index}><span className='font-semibold'>Order ID: </span>{order._id}</h3>
                                    <p><span className='font-semibold'>Name: </span>{order.name}</p>
                                    <p><span className='font-semibold'>Email: </span>{order.email}</p>
                                    <p><span className='font-semibold'>Phone: </span>{order.phone}</p>
                                    <p><span className='font-semibold'>Total Price: </span>${order.totalPrice}</p>
                                    <h3 className='font-semibold mt-2'>Shipping Address:</h3>
                                    <p>{order.location.address}, {order.location.city}, {order.location.state}, {order.location.country}, {order.location.zipcode}</p>
                                    <h3 className='font-semibold mt-2'>ID's of the Products:</h3>
                                    <ul className='grid gap-y-3'>
                                        {
                                            order.productIds.map((productId) => (
                                                <li key={productId}>{productId}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
};

export default OrderPage;