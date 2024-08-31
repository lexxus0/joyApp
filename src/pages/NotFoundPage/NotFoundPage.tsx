import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <div className={css.container}>
        <h1 className={css.title}>404</h1>
        <p className={css.message}>
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
