const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  style = {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 18px",
        border: "none",
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: "#2563eb",
        color: "#fff",
        fontSize: "15px",
        fontWeight: "500",
        opacity: disabled ? 0.7 : 1,
        transition: "0.2s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;