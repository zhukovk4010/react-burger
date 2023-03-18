//Компонент авторизации в приложение

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { setUserData } from "../../../services/actions/user";
import { saveTokens, sendUserLogin } from "../../../utils/burger-api";
import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../../utils/constants";

import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Login.module.css";

const Login = () => {
    const { auth } = useSelector((store) => ({
        auth: store.user.isAuthenticated,
    }));
    //Данные в формах
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //При клике отправляем запрос на логин, если успешный, тогда переводим пользователя на главную страницу
    const onButtonClick = async () => {
        try {
            const res = await sendUserLogin({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                }),
            });
            saveTokens(res.refreshToken, res.accessToken);
            dispatch(setUserData(res.user.email, res.user.name));
            navigate("/", { replace: true });
        } catch (e) {
            //Показываем пользователю ошибку
            window.alert(e.message);
        }
    };

    if (auth) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className={styles.loginContainer}>
            <div className={`${styles.loginHeader} ${TEXT_MEDIUM}`}>Вход</div>
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
                    Вход
                </Button>
            </div>

            <div className={styles.registerFooter}>
                <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR} mb-4`}>
                    Вы - новый пользователь{" "}
                    <Link className={styles.navigate} to="/register">
                        Зарегестрироваться
                    </Link>
                </p>
                <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                    Забыли пароль?{" "}
                    <Link className={styles.navigate} to="/forgot-password">
                        Восстановить пароль
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
