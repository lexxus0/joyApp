const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <p className="text-2xl font-medium mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="text-lg text-blue-900 hover:text-blue-400 underline"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
