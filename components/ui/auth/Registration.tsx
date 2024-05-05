"use client";

import { useState } from "react";
import axios from "axios";

import Link from "next/link";

import NumberInput from "@/components/lib/form/inputs/NumberInput";
import PasswordInput from "@/components/lib/form/inputs/PasswordInput";
import TextInput from "@/components/lib/form/inputs/TextInput";

import styles from "@/components/ui/auth/registration.module.css";

export default function Login() {
  const [isVerified, setIsVerified] =
    useState<boolean>(false);
  const [invitationCode, setInvitationCode] =
    useState<string>("");

  const [mobileNo, setMobileNo] =
    useState<number>(NaN);
  const [name, setName] = useState<string>("");
  const [password, setPassword] =
    useState<string>("");
  const [confirmPassword, setConfirmPassword] =
    useState<string>("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("/api/auth/registration", {
        mobileNo,
        name,
        password
      })
      .then(() => {
        alert("Registered");
      })
      .catch(() => {
        alert("Invalid credentials");
      });
  };

  return (
    <main className={styles.container}>
      {isVerified ? (
        <section className={styles.registration}>
          <h1 className={styles.heading}>
            {"Welcome Onboard!"}
          </h1>
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
              <TextInput
                showInputOnly
                placeholder="name"
                isRequired
                value={name}
                onChange={setName}
              />
              <PasswordInput
                showInputOnly
                placeholder="password"
                isRequired
                value={password}
                onChange={setPassword}
              />
              <PasswordInput
                showInputOnly
                placeholder="confirm password"
                isRequired
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </section>
          </section>
          <section className={styles.actions}>
            <span
              className={styles.toLoginContainer}
            >
              <span
                className={styles.toLoginPrefix}
              >
                {"Already have an account?"}
              </span>
              <Link
                className={styles.toLogin}
                href={"/auth/login"}
              >
                Login
              </Link>
            </span>
            <button
              className={styles.btn}
              onClick={handleSubmit}
            >
              <span className={styles.btnLabel}>
                {"Register"}
              </span>
            </button>
          </section>
        </section>
      ) : (
        <section className={styles.verification}>
          <h1 className={styles.heading}>
            {"Welcome Onboard!"}
          </h1>
          <section className={styles.form}>
            <section className={styles.inputs}>
              <TextInput
                showInputOnly
                placeholder="invitation code"
                isRequired
                value={invitationCode}
                onChange={setInvitationCode}
              />
            </section>
          </section>
          <button
            className={styles.btn}
            onClick={() => {
              setIsVerified(true);
            }}
          >
            <span className={styles.btnLabel}>
              {"Next"}
            </span>
          </button>
        </section>
      )}
    </main>
  );
}
