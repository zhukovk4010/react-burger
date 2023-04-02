//Компонент профиля

//Импорты
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    deleteUserDataAction,
    setUserDataAction,
} from "../../services/actions/user";

import OrdersPage from "../orders-page/OredersPage";

import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../utils/constants";
import { setCookie } from "../../utils/cookie";

import styles from "./Profile.module.css";
import { AppStateType } from "../../services/reducers/rootReducer";
import { useForm } from "../../hooks/useForm";
import { exitUser, saveNewUserData } from "../../services/thunk/userThunk";

const Profile = () => {
    const location = useLocation();
    const activeLink = location.pathname;

    //Получаем email и пароль пользователя из стора
    const { userEmail, userName } = useSelector((state: AppStateType) => ({
        userEmail: state.user.email,
        userName: state.user.name,
    }));

    const { values, handleChange, setValues } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Заполняем состояние форм данными из стора
    useEffect(() => {
        setValues({ name: userName, email: userEmail, password: "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName, userEmail]);

    let buttonsPanel;

    //При клике на кнопку отменить возвращаем исходные данные
    const onButtonСancellationClick = () => {
        setValues({ name: userName, email: userEmail, password: "" });
    };

    //Изменение данных
    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await saveNewUserData(
            values.name,
            values.email,
            values.password
        );
        if (data.success === true) {
            dispatch(setUserDataAction(data.user.email, data.user.name));
            setValues({ name: userName, email: userEmail, password: "" });
        }
    };

    //Выход из системы
    const onButtonExitClick = async () => {
        const res = await exitUser();
        if (res.success === true) {
            dispatch(deleteUserDataAction());
            setCookie("accessToken", null, { expires: -1 });
            localStorage.setItem("refreshToken", "");
            navigate("/", { replace: true });
        }
    };

    //Если что-то изменилось в формах, тогда отображаем кнопки сохранить и отменить
    if (
        userName !== values.name ||
        userEmail !== values.email ||
        values.password !== ""
    ) {
        buttonsPanel = (
            <div className={styles.buttonsPanel}>
                <Button
                    htmlType="button"
                    type="primary"
                    size="small"
                    extraClass="mt-6"
                    onClick={() => onButtonСancellationClick()}
                >
                    <p className={TEXT_DEFAULT}>Отмена</p>
                </Button>
                <Button
                    htmlType="submit"
                    type="primary"
                    size="small"
                    extraClass="mt-6"
                >
                    <p className={TEXT_DEFAULT}>Сохранить</p>
                </Button>
            </div>
        );
    }

    //Отображаем контент на странице
    let content;
    if (activeLink === "/profile") {
        content = (
            <form onSubmit={onSubmitForm}>
                <div>
                    <Input
                        name="name"
                        placeholder={"Имя"}
                        extraClass="mb-6"
                        icon={"EditIcon"}
                        value={values.name!}
                        onChange={handleChange}
                    />
                    <EmailInput
                        name="email"
                        placeholder={"Логин"}
                        extraClass="mb-6"
                        isIcon={true}
                        value={values.email!}
                        onChange={handleChange}
                    />
                    <PasswordInput
                        name="password"
                        value={values.password!}
                        onChange={handleChange}
                        icon={"EditIcon"}
                    />
                    {buttonsPanel}
                </div>
            </form>
        );
    } else if (activeLink === "/profile/orders") {
        content = <OrdersPage />;
    }

    return (
        <section className={styles.profileContainer}>
            <div>
                <div className={`${styles.linksContainer} ${TEXT_MEDIUM}`}>
                    <div className={styles.linkContainer}>
                        <NavLink
                            to="/profile"
                            className={
                                activeLink === "/profile"
                                    ? styles.activeLink
                                    : styles.link
                            }
                        >
                            Профиль
                        </NavLink>
                    </div>
                    <div className={styles.linkContainer}>
                        <NavLink
                            to="/profile/orders"
                            className={
                                activeLink === "/profile/orders"
                                    ? styles.activeLink
                                    : styles.link
                            }
                        >
                            История заказов
                        </NavLink>
                    </div>
                    <div className={styles.linkContainer}>
                        <NavLink
                            onClick={onButtonExitClick}
                            className={styles.link}
                            to="/"
                        >
                            Выход
                        </NavLink>
                    </div>
                </div>

                <div className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </div>
            {content}
        </section>
    );
};

export default Profile;
