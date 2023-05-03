//Компонент изменения пароля

//Импорты
import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../utils/constants";

import {
    Button,
    PasswordInput,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import styles from "./ResetPassword.module.css";
import { resetPassword } from "../../services/thunk/userThunk";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../hooks/hooks";

const ResetPassword = () => {
    const { values, handleChange } = useForm({ password: "", code: "" });

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    //Отправка формы на сервер
    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await dispatch(
            resetPassword(values.password!, values.code!)
        );
        if (success!) {
            navigate("/login", { replace: true });
        }
    };

    //Если пользователь пришел не со страницы forgot-password, тогда перебрасывает на главную
    if (location.state === null) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className={styles.ResetPasswordContainer}>
            <form onSubmit={onSubmitForm}>
                <div className={`${styles.ResetPasswordHeader} ${TEXT_MEDIUM}`}>
                    Восстановление пароля
                </div>
                <PasswordInput
                    name="password"
                    value={values.password!}
                    onChange={handleChange}
                    placeholder={"Введите новый пароль"}
                    extraClass="mt-6"
                />
                <Input
                    type="text"
                    name="code"
                    value={values.code!}
                    onChange={handleChange}
                    placeholder={"Введите код из письма"}
                    extraClass="mt-6"
                />
                <div className={styles.buttonContainer}>
                    <Button htmlType="submit" type="primary" size="large">
                        Сохранить
                    </Button>
                </div>
            </form>

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
