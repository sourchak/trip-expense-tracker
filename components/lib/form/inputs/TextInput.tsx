/* eslint-disable react-hooks/exhaustive-deps */

import {
  ChangeEvent,
  useEffect,
  useState
} from "react";

import styles from "@/components/lib/form/inputs/inputs.module.css";

export default function TextInput(
  props: {
    showInputOnly?: boolean;
    label?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    doReset?: boolean;
    onChange: (value: string) => void;
    transform?: (value: string) => string;
  } & (
    | {
        isRequired?: undefined;
      }
    | {
        isRequired?: boolean;
        requiredErrorMessage?: string;
        minLength?: undefined;
      }
    | {
        isRequired?: boolean;
        requiredErrorMessage?: string;
        minLength?: number;
        minLengthErrorMessage?: string;
      }
  ) &
    (
      | {
          maxLength?: undefined;
        }
      | {
          maxLength?: number;
          maxLengthErrorMessage?: string;
        }
    ) &
    (
      | {
          validate?: undefined;
        }
      | {
          validate?: (value: string) => boolean;
          validationErrorMessage?: string;
        }
    )
) {
  const {
    showInputOnly,
    label,
    name,
    placeholder,
    value,
    isRequired,
    maxLength,
    doReset,
    onChange,
    transform,
    validate
  } = props;

  const [text, setText] = useState<string>(
    value || ""
  );

  const [hasChanged, setHasChanged] =
    useState<boolean>(false);
  const [error, setError] =
    useState<boolean>(false);
  const [errMessage, setErrMessage] =
    useState<string>("");

  const getErrMessage = (
    type:
      | "required"
      | "min-length"
      | "max-length"
      | "validation"
  ): string => {
    switch (type) {
      case "required":
        return (
          (isRequired &&
            props.requiredErrorMessage) ||
          `${label || "value"} is required`
        );
      case "min-length":
        return (
          (isRequired &&
            props.minLength &&
            props.minLengthErrorMessage) ||
          `${label || "value"} should be at least ${isRequired && props.minLength} characters`
        );
      case "max-length":
        return (
          (maxLength &&
            props.maxLengthErrorMessage) ||
          `${label || "value"} should be at most ${maxLength} characters`
        );
      case "validation":
        return (
          (validate &&
            props.validationErrorMessage) ||
          `invalid ${label || "value"}`
        );
      default:
        return "";
    }
  };

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    if (value && !hasChanged) {
      setHasChanged(true);
    }

    if (transform) {
      value = transform(value);
    }

    const requiredErr =
      isRequired && value.trim().length === 0;

    const minLengthErr =
      !requiredErr &&
      isRequired &&
      props.minLength &&
      value.trim().length < props.minLength;

    const maxLengthErr =
      !requiredErr &&
      !minLengthErr &&
      maxLength &&
      value.trim().length > maxLength;

    const validationErr =
      !requiredErr &&
      !minLengthErr &&
      !maxLengthErr &&
      validate &&
      !validate(value.trim());

    setText(value);

    if (
      requiredErr ||
      minLengthErr ||
      maxLengthErr ||
      validationErr
    ) {
      setError(true);
      setErrMessage(
        getErrMessage(
          (requiredErr && "required") ||
            (minLengthErr && "min-length") ||
            (maxLengthErr && "max-length") ||
            "validation"
        )
      );
    } else {
      setError(false);
      setErrMessage("");
    }
  };

  useEffect(() => {
    onChange(text.trim());
  }, [text]);

  useEffect(() => {
    if (doReset) {
      setText("");
      setHasChanged(false);
      setError(false);
      setErrMessage("");
    }
  }, [doReset]);

  return (
    <label
      className={styles.container}
      style={
        showInputOnly
          ? {
              gridTemplateRows: "1fr",
              height: "5rem"
            }
          : {}
      }
    >
      {!showInputOnly &&
        (label || isRequired) && (
          <span className={styles.labelContainer}>
            <span className={styles.label}>
              {label}
            </span>
            {isRequired && (
              <span className={styles.required}>
                *
              </span>
            )}
          </span>
        )}
      <div
        className={`${styles.inputContainer} ${hasChanged ? (error ? styles.error : styles.ok) : ""}`}
      >
        <input
          className={styles.input}
          type="text"
          name={name || "textInput"}
          placeholder={placeholder || ""}
          autoComplete="off"
          spellCheck={false}
          value={text}
          onChange={handleChange}
        />
      </div>
      {!showInputOnly && hasChanged && error && (
        <span className={styles.errorMessage}>
          {errMessage}
        </span>
      )}
    </label>
  );
}
