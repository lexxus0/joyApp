import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className=" pt-32 flex items-center justify-center min-h-screen bg-gray-900">
      <div className="border-2 border-red-600 p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-200">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Please log in to access your account.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
