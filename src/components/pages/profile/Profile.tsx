//Компонент профиля

//Импорты
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUserRequest, userLogout } from "../../../utils/burgerApi";
import {
    deleteUserDataAction,
    setUserDataAction,
} from "../../../services/actions/user";

import OrdersPage from "../orders-page/OredersPage";

import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../../utils/constants";
import { getCookie, setCookie } from "../../../utils/cookie";

import styles from "./Profile.module.css";
import { AppStateType } from "../../../services/reducers/rootReducer";

const Profile = () => {
    const location = useLocation();
    const activeLink = location.pathname;

    //Получаем email и пароль пользователя из стора
    const { userEmail, userName } = useSelector((state: AppStateType) => ({
        userEmail: state.user.email,
        userName: state.user.name,
    }));

    //Создаем состояния форм
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Заполняем состояние форм данными из стора
    useEffect(() => {
        setNameValue(userName);
        setEmailValue(userEmail);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName, userEmail]);

    let buttonsPanel;

    //Если что-то изменилось в формах, тогда отображаем кнопки сохранить и отменить
    if (
        userName !== nameValue ||
        userEmail !== emailValue ||
        passwordValue !== ""
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
                    htmlType="button"
                    type="primary"
                    size="small"
                    extraClass="mt-6"
                    onClick={() => onButtonSaveClick()}
                >
                    <p className={TEXT_DEFAULT}>Сохранить</p>
                </Button>
            </div>
        );
    }

    //При клике на кнопку отменить возвращаем исходные данные
    const onButtonСancellationClick = () => {
        setNameValue(userName);
        setEmailValue(userEmail);
        setPasswordValue("");
    };

    //При клике на кнопку сохранить изменяем данные на сервере, обновленные данные заменяем в сторе
    const onButtonSaveClick = async () => {
        const user = await getUserRequest({
            method: "PATCH",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: "Bearer " + getCookie("accessToken"),
            },
            body: JSON.stringify({
                name: nameValue,
                email: emailValue,
                password: passwordValue && passwordValue,
            }),
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        if (user.user) {
            dispatch(setUserDataAction(user.user.email, user.user.name));
            setPasswordValue("");
        }
    };

    //Выход из системы
    const onButtonExitClick = async () => {
        await userLogout({
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        });
        dispatch(deleteUserDataAction());
        setCookie("accessToken", null, { expires: -1 });
        localStorage.setItem("refreshToken", "");
        navigate("/", { replace: true });
    };

    //Отображаем контент на странице
    let content;
    if (activeLink === "/profile") {
        content = (
            <div>
                <Input
                    placeholder={"Имя"}
                    extraClass="mb-6"
                    icon={"EditIcon"}
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                />
                <EmailInput
                    placeholder={"Логин"}
                    extraClass="mb-6"
                    isIcon={true}
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                />
                <PasswordInput
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    icon={"EditIcon"}
                />
                {buttonsPanel}
            </div>
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
