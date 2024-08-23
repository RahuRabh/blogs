import React, { useState, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//styles
import styles from "./Login.module.css";

//useContext
import { AuthContext } from "../../../context/AuthContext";

// import Loader from "../../Loader/Loader";

export default function Login({ onClose }) {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const methods = useForm();
  // const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  // Destructure methods for easier access
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  //to check submit functionality
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await loginUser(data);
      if (result.success) {
        toast.success(result.message);
        onClose()
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={errors.email ? styles.error : ""}
              placeholder={errors.email ? errors.email.message : ""}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={errors.password ? styles.error : ""}
              placeholder={errors.password ? errors.password.message : ""}
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>

          {/* <p className={styles.errorMessage}>{errorMessage}</p> */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
