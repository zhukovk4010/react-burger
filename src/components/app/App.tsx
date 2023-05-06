//Импорты
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { HashRouter } from "react-router-dom";

import { closeIngredientModalAction } from "../../services/actions/modal";
import { deleteSelectedIngredientToModal } from "../../services/actions/selectedIngredient";
import { getIngredients } from "../../services/thunk/getIngredientsThunk";
import { getUser } from "../../services/thunk/userThunk";

import AppHeader from "../app-header/AppHeader";
import IngredientDetails from "../main/burger-ingredients/ingredients-list/ingredient-details/IngredientDetails";
import Main from "../main/Main";
import Modal from "../modals/Modal";
import ForgotPassword from "../../pages/forgot-password/ForgotPassword";
import Login from "../../pages/login/Login";
import NotFound404 from "../../pages/not-found-404/NotFound404";
import Profile from "../../pages/profile/Profile";
import Register from "../../pages/register/Register";
import ResetPassword from "../../pages/reset-password/ResetPassword";
import ProtectedRouteElement from "../protected-route-component/ProtectedRouteElement";
import Feed from "../../pages/feed/Feed";
import SelectedOrder from "../order/selected-order/SelectedOrder";
import { useAppDispatch } from "../../hooks/hooks";

const App = () => {
    const dispatch = useAppDispatch();

    //Запрос ингредиентов и пользователя из API
    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUser());
    }, [dispatch]);

    const ModalSwitch = () => {
        const dispatch = useDispatch();
        const location = useLocation();
        const navigate = useNavigate();
        //Подложка для модального окна
        let background = location.state && location.state.background;

        const closeModal = () => {
            dispatch(closeIngredientModalAction());
            dispatch(deleteSelectedIngredientToModal());
            navigate(-1);
        };

        //Пути на страницы записаны в константы

        //Главная страница
        const mainRoute = <Route path="/" element={<Main />} />;

        //Лента заказов
        const feedRoute = <Route path="/feed" element={<Feed />} />;

        //Страница логина
        const loginRoute = (
            <Route
                path="/login"
                element={
                    <ProtectedRouteElement anonymous element={<Login />} />
                }
            />
        );

        //Страница регистрации
        const registerRoute = (
            <Route
                path="/register"
                element={
                    <ProtectedRouteElement anonymous element={<Register />} />
                }
            />
        );

        //Дополнительная информация об ингредиенте
        const ingredientDetailsRoute = (
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
        );

        //Восстановить пароль
        const forgotPasswordRoute = (
            <Route
                path="/forgot-password"
                element={
                    <ProtectedRouteElement
                        anonymous
                        element={<ForgotPassword />}
                    />
                }
            />
        );

        //Изменить пароль
        const resetPasswordRoute = (
            <Route
                path="/reset-password"
                element={
                    <ProtectedRouteElement
                        anonymous
                        element={<ResetPassword />}
                    />
                }
            />
        );

        //Профиль
        const profileRoute = (
            <Route
                path="/profile"
                element={<ProtectedRouteElement element={<Profile />} />}
            />
        );

        //Страница с заказами пользователя
        const ordersRoute = (
            <Route
                path="/profile/orders"
                element={
                    <ProtectedRouteElement
                        background={background}
                        element={<Profile />}
                    />
                }
            />
        );

        //Страница информации заказа без модального окна
        const orderRoute = (
            <Route path="/feed/:number" element={<SelectedOrder />} />
        );

        //Страница информации заказа пользователя без модального окна
        const userOrderRoute = (
            <Route
                path="/profile/orders/:number"
                element={<ProtectedRouteElement element={<SelectedOrder />} />}
            />
        );

        //404
        const notFound404Route = <Route path="*" element={<NotFound404 />} />;

        //Модальное окно с дополнительной информацией об ингредиенте
        const ingredientDetailsModalRoute = (
            <Route
                path="/ingredients/:id"
                element={
                    <Modal title="Детали ингредиента" onClose={closeModal}>
                        <IngredientDetails />
                    </Modal>
                }
            />
        );

        const orderDetailsModalRoute = (
            <Route
                path="/feed/:number"
                element={
                    <Modal orderElement={true} onClose={closeModal}>
                        <SelectedOrder />
                    </Modal>
                }
            />
        );

        const userOrderModalRoute = (
            <Route
                path="/profile/orders/:number"
                element={
                    <ProtectedRouteElement
                        background={background}
                        element={
                            <Modal orderElement={true} onClose={closeModal}>
                                <SelectedOrder />
                            </Modal>
                        }
                    />
                }
            />
        );

        return (
            <>
                <AppHeader />
                <Routes location={background || location}>
                    {mainRoute}
                    {feedRoute}
                    {ingredientDetailsRoute}
                    {loginRoute}
                    {registerRoute}
                    {forgotPasswordRoute}
                    {resetPasswordRoute}
                    {profileRoute}
                    {ordersRoute}
                    {notFound404Route}
                    {orderRoute}
                    {userOrderRoute}
                </Routes>

                {background && (
                    <>
                        <Routes>
                            {ingredientDetailsModalRoute}
                            {orderDetailsModalRoute}
                            {userOrderModalRoute}
                        </Routes>
                    </>
                )}
            </>
        );
    };

    return (
        <HashRouter>
            <ModalSwitch />
        </HashRouter>
    );
};

export default App;
