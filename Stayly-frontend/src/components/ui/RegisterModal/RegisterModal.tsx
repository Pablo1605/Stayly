import { useState, type FC } from "react";
import styles from "./RegisterModal.module.css"
import { useRegister } from "../../../hooks/user/useUserMutations";
import type { RegisterRequest } from "../../../types/RegisterRequest";

interface RegisterModalProps {
    onClose: () => void;
}

export const RegisterModal: FC<RegisterModalProps> = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {
            mutateAsync: register,
            isPending,
            isError,
            error,
        } = useRegister();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }

    const handleSubmit = async (
            event: React.FormEvent<HTMLFormElement>
        ) => {
            event.preventDefault();
    
            const registerData: RegisterRequest = {
                username,
                email,
                password,
            };
    
            try {
                await register(registerData);
    
                onClose();
    
            } catch (error) {
                console.error("Registration failed", error);
            }
        };

    return (
        <div className={styles.principalContainer}>
            <div className={styles.secondaryContainer}>
                <button className={styles.buttonExitModal} onClick={onClose}>X</button>
                <h1>Register</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" >Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" >Password</label>
                        <div className={styles.passwordInputGroup}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className={styles.passwordToggleButton}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <span className="material-symbols-outlined">
                                    visibility_off
                                </span> : <span className="material-symbols-outlined">
                                    visibility
                                </span>}
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
                                    : "Register"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
