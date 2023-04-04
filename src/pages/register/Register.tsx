//Компонент авторизации в приложение

//Импорты
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
} from "../../utils/constants";

import styles from "./Register.module.css";
import { useForm } from "../../hooks/useForm";
import { registerUser } from "../../services/thunk/userThunk";
import { DispatchType } from "../../services/reducers/rootReducer";

const Register = () => {
    //Состояние полей в форме
    const { values, handleChange } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch<DispatchType>();
    const navigate = useNavigate();

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await dispatch(
            registerUser(values.name, values.email, values.password)
        );
        if (success) {
            navigate("/", { replace: true });
        }
    };

    return (
        <section className={styles.registerContainer}>
            <form onSubmit={onSubmitForm}>
                <div className={`${styles.registerHeader} ${TEXT_MEDIUM}`}>
                    Регистрация
                </div>

                <Input
                    name="name"
                    value={values.name!}
                    onChange={handleChange}
                    type={"text"}
                    placeholder={"Имя"}
                    extraClass="mt-6"
                />
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
                        Регистрация
                    </Button>
                </div>
            </form>

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
