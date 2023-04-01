//Компонент cброса пароля

//Импорты
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { sendEmail } from "../../../utils/burgerApi";

import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../../utils/constants";

import styles from "./ForgotPassword.module.css";
import { AppStateType } from "../../../services/reducers/rootReducer";

const ForgotPassword = () => {
    const { auth } = useSelector((state: AppStateType) => ({
        auth: state.user.isAuthenticated,
    }));

    const location = useLocation();

    const [emailValue, setEmailValue] = useState("");

    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    };

    //При клике на кнопку отправляем запрос и если он успешный переадресуем пользователя на reset-password
    const onButtonClick = async () => {
        try {
            await sendEmail({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ email: emailValue }),
            });
            navigate("/reset-password", { state: location });
        } catch (e: unknown) {
            if (e instanceof Error) {
                //Показываем ошибку
                window.alert(e.message);
            }
        }
    };

    if (auth) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className={styles.forgotPasswordContainer}>
            <div className={`${styles.forgotPasswordHeader} ${TEXT_MEDIUM}`}>
                Восстановление пароля
            </div>
            <EmailInput
                value={emailValue}
                onChange={onChange}
                placeholder="Укажите e-mail"
                extraClass="mt-6"
            />
            <div className={styles.buttonContainer}>
                {emailValue && (
                    <Button
                        onClick={onButtonClick}
                        htmlType="button"
                        type="primary"
                        size="large"
                    >
                        Восстановить
                    </Button>
                )}
            </div>

            <div className={styles.forgotPasswordFooter}>
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

export default ForgotPassword;
