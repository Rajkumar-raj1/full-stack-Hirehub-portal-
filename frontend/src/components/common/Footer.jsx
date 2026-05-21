const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#111827",
        color: "#ffffff",
        padding: "20px",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
        HireHub
      </h3>

      <p style={{ marginBottom: "10px" }}>
        Find jobs and hire talented people easily.
      </p>

      <p
        style={{
          fontSize: "14px",
          color: "#d1d5db",
        }}
      >
        © {new Date().getFullYear()} HireHub. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;