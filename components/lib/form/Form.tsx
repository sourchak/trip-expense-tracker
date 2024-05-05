import { FormEvent, ReactNode } from "react";
import Link from "next/link";

import SubmitButton from "@/components/lib/form/SubmitButton";

import styles from "@/components/lib/form/form.module.css";

export default function Form(
  props: {
    heading?: string;
    subHeading?: string;
    submitButtonLabel?: string;
    children: ReactNode;
    onSubmit: () => void;
  } & (
    | {
        routeLink?: undefined;
      }
    | {
        routeLink: string;
        routeLinkLabel: string;
        routeLabel?: string;
      }
  ) &
    (
      | {
          submitButtonIconSrc?: undefined;
        }
      | {
          submitButtonIconSrc: string;
          submitButtonIconAlt: string;
        }
    )
) {
  const {
    heading: headingProp,
    subHeading: subHeadingProp,
    submitButtonLabel,
    submitButtonIconSrc,
    routeLink,
    children,
    onSubmit
  } = props;

  const heading = headingProp?.trim() || "";
  const subHeading = subHeadingProp?.trim() || "";

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
    >
      {(heading || subHeading) && (
        <section className={styles.header}>
          {heading && (
            <h2 className={styles.heading}>
              heading
            </h2>
          )}
          {subHeading && (
            <h3 className={styles.subHeading}>
              {subHeading}
            </h3>
          )}
        </section>
      )}
      <section className={styles.inputs}>
        {children}
      </section>
      {routeLink && (
        <section className={styles.route}>
          {props.routeLabel && (
            <span>{props.routeLabel}</span>
          )}
          <Link
            className={styles.link}
            href={routeLink}
          >
            {props.routeLinkLabel}
          </Link>
        </section>
      )}
      <SubmitButton
        label={submitButtonLabel}
        status=""
        iconSrc={submitButtonIconSrc}
        iconAlt={
          (submitButtonIconSrc &&
            props.submitButtonIconAlt) ||
          ""
        }
      />
    </form>
  );
}
