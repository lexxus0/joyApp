import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className=" pt-32 flex items-center justify-center min-h-screen bg-gray-900">
      <div className="border-2 border-red-600 p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Create Your Account
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Join us today! Just create an account to get started.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
