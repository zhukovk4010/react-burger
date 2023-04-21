//Компонент cброса пароля

//Импорты
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../utils/constants";

import styles from "./ForgotPassword.module.css";
import { useForm } from "../../hooks/useForm";
import { sendPasswordOnEmail } from "../../services/thunk/userThunk";
import { useAppDispatch } from "../../hooks/hooks";

const ForgotPassword = () => {
    const location = useLocation();

    const { values, handleChange } = useForm({ email: "" });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    //При клике на кнопку или нажатия enter отправляем запрос и если он успешный переадресуем пользователя на reset-password
    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await dispatch(sendPasswordOnEmail(values.email!));
        if (success!) {
            navigate("/reset-password", { state: location });
        }
    };

    return (
        <section className={styles.forgotPasswordContainer}>
            <form onSubmit={onSubmitForm}>
                <div
                    className={`${styles.forgotPasswordHeader} ${TEXT_MEDIUM}`}
                >
                    Восстановление пароля
                </div>
                <EmailInput
                    name="email"
                    value={values.email!}
                    onChange={handleChange}
                    placeholder="Укажите e-mail"
                    extraClass="mt-6"
                />
                <div className={styles.buttonContainer}>
                    {values.email && (
                        <Button htmlType="submit" type="primary" size="large">
                            Восстановить
                        </Button>
                    )}
                </div>
            </form>

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
