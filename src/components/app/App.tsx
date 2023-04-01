//Импорты
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { closeIngredientModalAction } from "../../services/actions/modal";
import { deleteSelectedIngredientToModal } from "../../services/actions/selectedIngredient";
import { setUserDataAction } from "../../services/actions/user";
import { getIngredients } from "../../services/thunk/getIngredientsThunk";
import { getUserRequest } from "../../utils/burgerApi";
import { DispatchType } from "../../services/reducers/rootReducer";

import AppHeader from "../app-header/AppHeader";
import IngredientDetails from "../main/burger-ingredients/ingredients-list/ingredient-details/IngredientDetails";
import Main from "../main/Main";
import Modal from "../modals/Modal";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import Login from "../pages/login/Login";
import NotFound404 from "../pages/not-found-404/NotFound404";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import ResetPassword from "../pages/reset-password/ResetPassword";
import ProtectedRouteElement from "../protected-route-component/ProtectedRouteElement";
import { getCookie } from "../../utils/cookie";

const App = () => {
    const dispatch = useDispatch<DispatchType>();

    //Инициализация пользователя, проверяем токен
    const init = useCallback(async () => {
        try {
            const user = await getUserRequest({
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    authorization: "Bearer " + getCookie("accessToken"),
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            dispatch(setUserDataAction(user.user.email, user.user.name));
        } catch (e) {
            return null;
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(getIngredients());
        init();
    }, [init, dispatch]);

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
        const mainRoute = <Route path="/" element={<Main />}></Route>;

        //Страница логина
        const loginRoute = <Route path="/login" element={<Login />} />;

        //Страница регистрации
        const registerRoute = <Route path="/register" element={<Register />} />;

        //Дополнительная информация об ингредиенте
        const ingredientDetailsRoute = (
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
        );

        //Восстановить пароль
        const forgotPasswordRoute = (
            <Route path="/forgot-password" element={<ForgotPassword />} />
        );

        //Изменить пароль
        const resetPasswordRoute = (
            <Route path="/reset-password" element={<ResetPassword />} />
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
                element={<ProtectedRouteElement element={<Profile />} />}
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

        return (
            <>
                <AppHeader />
                <Routes location={background || location}>
                    {mainRoute}
                    {ingredientDetailsRoute}
                    {loginRoute}
                    {registerRoute}
                    {forgotPasswordRoute}
                    {resetPasswordRoute}
                    {profileRoute}
                    {ordersRoute}
                    {notFound404Route}
                </Routes>

                {background && <Routes>{ingredientDetailsModalRoute}</Routes>}
            </>
        );
    };

    return (
        <BrowserRouter>
            <ModalSwitch />
        </BrowserRouter>
    );
};

export default App;
