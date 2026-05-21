import LoginForm from "../components/auth/LoginForm.jsx";

const Login = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
      
    </div>
  );
};

export default Login;