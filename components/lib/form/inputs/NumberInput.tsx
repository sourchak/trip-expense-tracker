/* eslint-disable react-hooks/exhaustive-deps */

import {
  ChangeEvent,
  useEffect,
  useState
} from "react";

import styles from "@/components/lib/form/inputs/inputs.module.css";

export default function NumberInput(
  props: {
    showInputOnly?: boolean;
    label?: string;
    name?: string;
    placeholder?: string;
    value?: number;
    acceptDecimal?: boolean;
    doReset?: boolean;
    onChange: (value: number) => void;
    transform?: (value: number) => number;
  } & (
    | {
        isRequired?: undefined;
      }
    | {
        isRequired?: boolean;
        requiredErrorMessage?: string;
        minLength?: undefined;
        minValue?: undefined;
        maxValue?: undefined;
      }
    | {
        isRequired?: boolean;
        requiredErrorMessage?: string;
        minLength?: number;
        minLengthErrorMessage?: string;
        minValue?: number;
        minValueErrorMessage?: string;
        maxValue?: number;
        maxValueErrorMessage?: string;
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
          validate?: (value: number) => boolean;
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
    acceptDecimal,
    doReset,
    onChange,
    transform,
    validate
  } = props;

  const [mantissa, setMantissa] =
    useState<string>(
      value
        ? value.toString().includes(".")
          ? value.toString().split(".")[0]
          : value.toString()
        : ""
    );
  const [
    containDecimalPoint,
    setContainDecimalPoint
  ] = useState<boolean>(
    value ? value.toString().includes(".") : false
  );
  const [exponent, setExponent] =
    useState<string>(
      value
        ? value.toString().includes(".")
          ? value.toString().split(".")[1]
          : ""
        : ""
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
      | "min-value"
      | "max-value"
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
      case "min-value":
        return (
          (isRequired &&
            props.minValue &&
            props.minValueErrorMessage) ||
          `${label || "value"} should not be greater than ${isRequired && props.minValue}`
        );
      case "max-value":
        return (
          (isRequired &&
            props.maxValue &&
            props.maxValueErrorMessage) ||
          `${label || "value"} should not be less than ${isRequired && props.maxValue}`
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

    let numValue = value
      .replace(/[^0-9.]/g, "")
      .replace(".", "$")
      .replace(/[.]/g, "")
      .replace("$", ".");

    if (transform) {
      numValue = transform(
        Number(numValue)
      ).toString();
    }

    const requiredErr =
      isRequired && numValue.length === 0;

    const minLengthErr =
      !requiredErr &&
      isRequired &&
      props.minLength &&
      numValue.length < props.minLength;

    const maxLengthErr =
      !requiredErr &&
      !minLengthErr &&
      maxLength &&
      numValue.length > maxLength;

    const minValueErr =
      !requiredErr &&
      !minLengthErr &&
      !maxLengthErr &&
      isRequired &&
      props.minValue &&
      Number(numValue) < props.minValue;

    const maxValueErr =
      !requiredErr &&
      !minLengthErr &&
      !maxLengthErr &&
      !minValueErr &&
      isRequired &&
      props.maxValue &&
      Number(numValue) > props.maxValue;

    const validationErr =
      !requiredErr &&
      !minLengthErr &&
      !maxLengthErr &&
      !minValueErr &&
      !maxValueErr &&
      validate &&
      !validate(Number(numValue));

    setMantissa(
      numValue.includes(".")
        ? numValue.split(".")[0]
          ? numValue.split(".")[0]
          : ""
        : numValue
    );
    setContainDecimalPoint(
      numValue.includes(".")
    );
    setExponent(
      numValue.includes(".")
        ? numValue.split(".")[1]
          ? numValue.split(".")[1]
          : ""
        : ""
    );

    if (
      requiredErr ||
      minLengthErr ||
      maxLengthErr ||
      minValueErr ||
      maxValueErr ||
      validationErr
    ) {
      setError(true);
      setErrMessage(
        getErrMessage(
          (requiredErr && "required") ||
            (minLengthErr && "min-length") ||
            (maxLengthErr && "max-length") ||
            (minValueErr && "min-value") ||
            (maxValueErr && "max-value") ||
            "validation"
        )
      );
    } else {
      setError(false);
      setErrMessage("");
    }
  };

  useEffect(() => {
    onChange(
      acceptDecimal && containDecimalPoint
        ? Number(`${mantissa || "0"}.${exponent}`)
        : Number(mantissa)
    );
  }, [mantissa, exponent]);

  useEffect(() => {
    if (doReset) {
      setMantissa("");
      setContainDecimalPoint(false);
      setExponent("");
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
        className={`
          ${styles.inputContainer} 
          ${hasChanged ? (error ? styles.error : styles.ok) : ""}
        `}
      >
        <input
          className={styles.input}
          type="text"
          name={name || "textInput"}
          placeholder={placeholder || ""}
          autoComplete="off"
          spellCheck={false}
          value={
            acceptDecimal && containDecimalPoint
              ? `${mantissa || "0"}.${exponent}`
              : mantissa
          }
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
