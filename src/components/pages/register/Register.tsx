//Компонент авторизации в приложение

//Импорты
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { setUserDataAction } from "../../../services/actions/user";

import { saveTokens, sendUserRegister } from "../../../utils/burgerApi";

import { AppStateType } from "../../../services/reducers/rootReducer";

import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../../utils/constants";

import styles from "./Register.module.css";

const Register = () => {
    const { auth } = useSelector((state: AppStateType) => ({
        auth: state.user.isAuthenticated,
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
            dispatch(setUserDataAction(res.user.email, res.user.name));
            navigate("/", { replace: true });
        } catch (e: unknown) {
            //Показываем пользователю ошибку
            if (e instanceof Error) {
                window.alert(e.message);
            }
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
