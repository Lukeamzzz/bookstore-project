import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import CartPage from '../pages/books/CartPage';
import CheckoutPage from '../pages/books/CheckoutPage';
import SingleBook from '../pages/books/SingleBook';
import PrivateRoute from './PrivateRoute';
import OrderPage from '../pages/books/OrderPage';
import AdminRoute from './AdminRoute';
import AdminLogin from '../components/AdminLogin';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import ManageBooks from '../pages/dashboard/ManageBooks';
import AddBook from '../pages/dashboard/AddBook';
import UpdateBook from '../pages/dashboard/UpdateBook';

const router = createBrowserRouter([
    {
        // Root path
        path: '/',
        element: <App />,
        children: [
            {
                // Home page (default route)
                path: '/',
                element: <Home />,
            },
            {
                // Orders page - Protected route (only accessible if authenticated)
                path: '/orders',
                element:
                    <PrivateRoute>
                        <OrderPage />
                    </PrivateRoute>,
            },
            {
                // About page
                path: '/about',
                element: <div>About</div>,
            },
            {
                // Login page
                path: '/login',
                element: <Login />,
            },
            {
                // Signup page
                path: '/signup',
                element: <SignUp />,
            },
            {
                // Cart page
                path: '/cart',
                element: <CartPage />,
            },
            {
                // Checkout page - Protected route (only accessible if authenticated)
                path: '/checkout',
                element:
                    <PrivateRoute>
                        <CheckoutPage />
                    </PrivateRoute>,
            },
            {
                // Dynamic route for single book details ('/books/:id')
                path: '/books/:id',
                element: <SingleBook />,
            }
        ],
    },
    {
        // Admin login page (separate route, does not use App layout)
        path: '/admin',
        element: <AdminLogin />,
    },
    {
        // Admin dashboard - Protected route (only accessible if admin) (separate route, does not use App layout)
        path: '/dashboard',
        element:
            <AdminRoute>
                <DashboardLayout />
            </AdminRoute>,
        children: [
            {
                // Default child route ('/dashboard')
                path: '',
                element:
                    <AdminRoute>
                        <Dashboard/>
                    </AdminRoute>,
            },
            {
                // Route to add a new book ('/dashboard/add-new-book')
                path: 'add-new-book',
                element:
                    <AdminRoute>
                        <AddBook/>
                    </AdminRoute>,
            },
            {
                // Route to update(edit) a book by its ID ('/dashboard/update-book/:id')
                path: 'update-book/:id',
                element:
                    <AdminRoute>
                        <UpdateBook/>
                    </AdminRoute>,
            },
            {
                // Route to manage books ('/dashboard/manage-books')
                path: 'manage-books',
                element:
                    <AdminRoute>
                        <ManageBooks/>
                    </AdminRoute>,
            }
        ],
    }
]);

export default router;
