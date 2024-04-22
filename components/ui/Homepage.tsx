import Register from "@/components/ui/auth/Register";

import styles from "@/components/ui/homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
}
