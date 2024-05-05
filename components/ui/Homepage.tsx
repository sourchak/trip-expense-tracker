import Image from "next/image";

import styles from "@/components/ui/homepage.module.css";
import Link from "next/link";

export default function Homepage() {
  return (
    <main className={styles.container}>
      <section className={styles.homepage}>
        <Image
          className={styles.icon}
          src={"/icons/homepage.svg"}
          alt="homepage icon"
          width={200}
          height={200}
          draggable={false}
        />
        <section className={styles.content}>
          <h1 className={styles.heading}>
            {"Tripping"}
          </h1>
          <p className={styles.description}>
            {
              "This app will help manage the expenditure smartly, so that Shaon Da does not get over-charged"
            }
          </p>
        </section>
        <Link
          className={styles.btn}
          href={"/auth/login"}
        >
          <span className={styles.btnLabel}>
            {"Let's Get Started"}
          </span>
        </Link>
      </section>
    </main>
  );
}
