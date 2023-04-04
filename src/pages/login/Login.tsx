//Компонент авторизации в приложение

//Импорты
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { DispatchType } from "../../services/reducers/rootReducer";

const Login = () => {
    const dispatch = useDispatch<DispatchType>();
    const navigate = useNavigate();
    const location = useLocation();
    const { values, handleChange } = useForm({ email: "", password: "" });

    //Отправка формы на сервер
    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await dispatch(
            sendLoginData(values.email, values.password)
        );
        if (success) {
            navigate(location.state.from.pathname, { replace: true });
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
