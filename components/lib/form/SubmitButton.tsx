import Image from "next/image";

import styles from "@/components/lib/form/submitButton.module.css";

export default function SubmitButton(
  props: {
    label?: string;
    status?: "" | "ok" | "error";
    isNotClickable?: boolean;
  } & (
    | {
        iconSrc?: undefined;
      }
    | {
        iconSrc: string;
        iconAlt: string;
      }
  )
) {
  const {
    label,
    status,
    isNotClickable,
    iconSrc
  } = props;

  return (
    <div
      className={`
        ${styles.container}
        ${status && status === "ok" ? styles.ok : ""}
        ${status && status === "error" ? styles.error : ""}
        ${isNotClickable ? styles.disabled : ""}
      `}
    >
      {iconSrc && (
        <Image
          className={styles.icon}
          src={iconSrc}
          alt={props.iconAlt}
          width={20}
          height={20}
        />
      )}
      <input
        className={styles.button}
        type="submit"
        value={label || "Submit"}
      />
    </div>
  );
}
