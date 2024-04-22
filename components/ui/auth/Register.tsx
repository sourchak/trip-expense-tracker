"use client";

import { useState } from "react";

import NumberInput from "../lib/form/inputs/NumberInput";
import PasswordInput from "../lib/form/inputs/PasswordInput";
import TextInput from "../lib/form/inputs/TextInput";

import styles from "@/components/ui/auth/register.module.css";
import SubmitButton from "../lib/form/SubmitButton";
import Link from "next/link";

export default function Register() {
  const [mobileNumber, setMobileNumber] =
    useState<number>(NaN);
  const [name, setName] = useState<string>("");
  const [password, setPassword] =
    useState<string>("");
  const [confirmPassword, setConfirmPassword] =
    useState<string>("");

  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <section className={styles.header}>
          <h2 className={styles.heading}>
            heading
          </h2>
          <h3 className={styles.subHeading}>
            sub heading
          </h3>
        </section>
        <section className={styles.inputs}>
          <TextInput
            label="name"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={setName}
            isRequired
          />
          <NumberInput
            label="mobile number"
            name="mobileNumber"
            placeholder="0123456789"
            value={mobileNumber}
            onChange={setMobileNumber}
            isRequired
          />
          <PasswordInput
            label="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={setPassword}
            isRequired
          />
          <PasswordInput
            label="re-enter password"
            name="confirmPassword"
            placeholder="********"
            value={confirmPassword}
            onChange={setConfirmPassword}
            isRequired
          />
        </section>
        <section className={styles.login}>
          <span>already registered?</span>
          <Link
            className={styles.link}
            href={"/login"}
          >
            login
          </Link>
        </section>
        <SubmitButton
          label="register"
          status=""
          showIcon
        />
      </form>
    </main>
  );
}
