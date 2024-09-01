import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-6">
          Please log in to access your account.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
