import Image from "next/image";

import styles from "@/components/ui/lib/form/submitButton.module.css";

export default function SubmitButton({
  label,
  status,
  isNotClickable,
  showIcon
}: {
  label?: string;
  status?: "" | "ok" | "error";
  isNotClickable?: boolean;
  showIcon?: boolean;
}) {
  return (
    <div
      className={`
        ${styles.container}
        ${status && status === "ok" ? styles.ok : ""}
        ${status && status === "error" ? styles.error : ""}
        ${isNotClickable ? styles.disabled : ""}
      `}
    >
      {showIcon && (
        <Image
          className={styles.icon}
          src="/icons/login-icon.svg"
          alt="login"
          width={20}
          height={20}
        />
      )}
      <input
        className={styles.button}
        type="button"
        value={label || "Submit"}
      />
    </div>
  );
}
