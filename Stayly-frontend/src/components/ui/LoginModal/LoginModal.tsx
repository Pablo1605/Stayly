import { useState, type FC } from "react";


import styles from "./LoginModal.module.css";
import { useLogin } from "../../../hooks/user/useUserMutations";
import type { LoginRequest } from "../../../types/LoginRequest";
import { userStore } from "../../../store/userStore";

interface LoginModalProps {
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({
    onClose,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);
    const { login: saveUser } = userStore();

    const {
        mutateAsync: login,
        isPending,
        isError,
        error,
    } = useLogin();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const loginData: LoginRequest = {
            username,
            password,
        };

        try {
            const authUser = await login(loginData);
            saveUser(authUser);

            onClose();

        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className={styles.principalContainer}>
            <div className={styles.secondaryContainer}>
                <button
                    className={styles.buttonExitModal}
                    onClick={onClose}
                    type="button"
                >
                    X
                </button>
                <h1>Login</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">
                            Password
                        </label>

                        <div className={styles.passwordInputGroup}>
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className={
                                    styles.passwordToggleButton
                                }
                                onClick={
                                    togglePasswordVisibility
                                }
                            >
                                {showPassword ? (
                                    <span className="material-symbols-outlined">
                                        visibility_off
                                    </span>
                                ) : (
                                    <span className="material-symbols-outlined">
                                        visibility
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className={styles.buttonMessage}>
                            {isError && (
                                <p className="error-text">
                                    {error.message}
                                </p>
                            )}

                            <button
                                className={styles.buttonIs}
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending
                                    ? "Entering..."
                                    : "Login"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};