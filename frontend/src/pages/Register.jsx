import RegisterForm from "../components/auth/RegisterForm.jsx";

const Register = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RegisterForm />
    </div>
  );
};

export default Register;