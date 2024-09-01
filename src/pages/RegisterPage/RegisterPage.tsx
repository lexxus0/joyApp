import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Join us today! Just create an account to get started.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
