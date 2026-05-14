import styles from "./Button.module.css";

function Button({ variant = "primary", className = "", children, ...props }) {
  const variantClassNames = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    danger: styles.buttonDanger,
  };
  return (
    <button
      className={styles.button + " " + variantClassNames[variant] + " " + className}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
