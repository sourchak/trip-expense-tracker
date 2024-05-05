"use client";

import { useState } from "react";
import axios from "axios";

import Image from "next/image";
import Link from "next/link";

import NumberInput from "@/components/lib/form/inputs/NumberInput";
import PasswordInput from "@/components/lib/form/inputs/PasswordInput";

import styles from "@/components/ui/auth/login.module.css";

export default function Login() {
  const [mobileNo, setMobileNo] =
    useState<number>(NaN);
  const [password, setPassword] =
    useState<string>("");

  const handleSubmit = () => {
    axios
      .post("/api/auth/login", {
        mobileNo,
        password
      })
      .then(() => {
        alert("Logged in");
      })
      .catch(() => {
        alert("Invalid credentials");
      });
  };

  return (
    <main className={styles.container}>
      <section className={styles.login}>
        <h1 className={styles.heading}>
          {"Welcome Back !"}
        </h1>
        <Image
          className={styles.icon}
          src={"/icons/login.svg"}
          alt="login icon"
          width={200}
          height={200}
          draggable={false}
        />
        <section className={styles.form}>
          <section className={styles.inputs}>
            <NumberInput
              showInputOnly
              placeholder="mobile number"
              isRequired
              minLength={10}
              maxLength={10}
              value={mobileNo}
              onChange={setMobileNo}
            />
            <PasswordInput
              showInputOnly
              placeholder="password"
              isRequired
              value={password}
              onChange={setPassword}
            />
          </section>
          <Link
            className={styles.toForgotPassword}
            href={"/auth/reset-password"}
          >
            Forgot Password?
          </Link>
        </section>
        <section className={styles.actions}>
          <span
            className={
              styles.toRegistrationContainer
            }
          >
            <span
              className={
                styles.toRegistrationPrefix
              }
            >
              {"Don't have an account?"}
            </span>
            <Link
              className={styles.toRegistration}
              href={"/auth/registration"}
            >
              Register
            </Link>
          </span>
          <button
            className={styles.btn}
            onClick={handleSubmit}
          >
            <span className={styles.btnLabel}>
              {"Login"}
            </span>
          </button>
        </section>
      </section>
    </main>
  );
}
