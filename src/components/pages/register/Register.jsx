//Компонент авторизации в приложение

import { useState } from "react";

import { setUserData } from "../../../services/actions/user";

import { saveTokens, sendUserRegister } from "../../../utils/burger-api";

import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../../utils/constants";

import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
    const { auth } = useSelector((store) => ({
        auth: store.user.isAuthenticated,
    }));

    //Состояния полей
    const [userNameValue, setUserNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //При клике отправляем запрос на сервер
    const onButtonClick = async () => {
        try {
            const res = await sendUserRegister({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                    name: userNameValue,
                }),
            });
            //Если пользоваетель новый, тогда сохраняем его токены и добавляем данные о пользоваетеле в хранилище
            saveTokens(res.refreshToken, res.accessToken);
            dispatch(setUserData(res.user.email, res.user.name));
            navigate("/", { replace: true });
        } catch (e) {
            //Показываем пользователю ошибку
            window.alert(e.message);
        }
    };

    //Если залогинены пользователя перебрасывает на главную страницу
    if (auth) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className={styles.registerContainer}>
            <div className={`${styles.registerHeader} ${TEXT_MEDIUM}`}>
                Регистрация
            </div>

            <Input
                value={userNameValue}
                onChange={(e) => setUserNameValue(e.target.value)}
                type={"text"}
                placeholder={"Имя"}
                extraClass="mt-6"
            />
            <EmailInput
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                extraClass="mt-6"
            />
            <PasswordInput
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                extraClass="mt-6"
            />
            <div className={styles.buttonContainer}>
                <Button
                    onClick={onButtonClick}
                    htmlType="button"
                    type="primary"
                    size="large"
                >
                    Регистрация
                </Button>
            </div>

            <div className={styles.registerFooter}>
                <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                    Уже зарегестрированы?{" "}
                    <Link className={styles.navigate} to="/login">
                        Войти
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
