import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <div className='text-center flex flex-col items-center pt-40'>
      <h1 className='text-7xl font-semibold mb-2'>
        404
      </h1>
      <p className="text-2xl mb-2">Not found</p>
      <p>Uh oh! The resource you requested does not exist.</p>
      <Link to="/" className='btn mt-8'>Return to home</Link>
    </div>
  );
};

export default NotFoundScreen;
