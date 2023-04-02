//Компонент авторизации в приложение

//Импорты
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setUserDataAction } from "../../services/actions/user";
import { saveTokens } from "../../utils/burgerApi";
import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../utils/constants";

import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Login.module.css";
import { useForm } from "../../hooks/useForm";
import { sendLoginData } from "../../services/thunk/userThunk";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { values, handleChange } = useForm({ email: "", password: "" });

    //Отправка формы на сервер
    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await sendLoginData(values.email, values.password);
        if (data.success === true) {
            saveTokens(data.refreshToken, data.accessToken);
            dispatch(setUserDataAction(data.user.email, data.user.name));
            navigate("/", { replace: true });
        }
    };

    return (
        <section className={styles.loginContainer}>
            <form onSubmit={onSubmitForm}>
                <div className={`${styles.loginHeader} ${TEXT_MEDIUM}`}>
                    Вход
                </div>
                <EmailInput
                    name="email"
                    value={values.email!}
                    onChange={handleChange}
                    extraClass="mt-6"
                />
                <PasswordInput
                    name="password"
                    value={values.password!}
                    onChange={handleChange}
                    extraClass="mt-6"
                />
                <div className={styles.buttonContainer}>
                    <Button htmlType="submit" type="primary" size="large">
                        Вход
                    </Button>
                </div>
            </form>

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
