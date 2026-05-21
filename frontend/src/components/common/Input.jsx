const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  style = {},
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        outline: "none",
        fontSize: "15px",
        marginBottom: "15px",
        boxSizing: "border-box",
        ...style,
      }}
    />
  );
};

export default Input;