//Компонент изменения пароля

import { useState } from "react";

import { sendChangedPassword } from "../../../utils/burger-api";
import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../../utils/constants";

import {
    Button,
    PasswordInput,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import styles from "./ResetPassword.module.css";
import { useSelector } from "react-redux";

const ResetPassword = () => {
    const { auth } = useSelector((store) => ({
        auth: store.user.isAuthenticated,
    }));

    const [passwordValue, setPasswordValue] = useState("");
    const [codeValue, setCodeValue] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    //Отправка данных на сервер
    const onButtonClick = async () => {
        try {
            await sendChangedPassword({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    password: passwordValue,
                    token: codeValue,
                }),
            });
            navigate("/", { replace: true });
            window.alert(
                "Пароль успешно изменен, войдите в аккаунт с помощью нового пароля"
            );
        } catch (e) {
            window.alert(e.message);
        }
    };

    //Если залогинены тогда пользователя перебрасывает на главную
    if (auth) {
        return <Navigate to="/" replace />;
    }

    //Если пользователь пришел не со страницы forgot-password, тогда перебрасывает на главную
    if (location.state === null) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className={styles.ResetPasswordContainer}>
            <div className={`${styles.ResetPasswordHeader} ${TEXT_MEDIUM}`}>
                Восстановление пароля
            </div>
            <PasswordInput
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                placeholder={"Введите новый пароль"}
                extraClass="mt-6"
            />
            <Input
                type="text"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
                placeholder={"Введите код из письма"}
                extraClass="mt-6"
            />
            <div className={styles.buttonContainer}>
                <Button
                    onClick={onButtonClick}
                    htmlType="button"
                    type="primary"
                    size="large"
                >
                    Сохранить
                </Button>
            </div>

            <div className={styles.ResetPasswordFooter}>
                <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR} mb-4`}>
                    Вспомнили пароль?{" "}
                    <Link className={styles.navigate} to="/login">
                        Войти
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default ResetPassword;
