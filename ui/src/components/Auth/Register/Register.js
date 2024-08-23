import React, { useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

//component
// import Loader from '../../Loader/Loader'

import { AuthContext } from "../../../context/AuthContext";

//styles
import styles from "./Register.module.css";
import { toast } from "react-toastify";

export default function Register({ setCurrentView }) {
  const { registerUser } = useContext(AuthContext);
  const methods = useForm();
  const [loading, setLoading] = useState(false);

  //to check form errors
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;

  const password = React.useRef({});
  password.current = watch("password", "");

  // to check submit handler
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await registerUser(data);
      if (response.success) {
        toast.success(response.message);
        setCurrentView("login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className={errors.name ? styles.error : ""}
              placeholder={errors.name ? errors.name.message : ""}
              {...register("name", { required: "Invalid Name" })}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={errors.email ? styles.error : ""}
              placeholder={errors.email ? errors.email.message : ""}
              {...register("email", {
                required: "Email required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
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
              {...register("password", { required: "Password required" })}
            />
          </div>

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
