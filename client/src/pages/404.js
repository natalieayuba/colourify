import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center flex-1'>
      <h1 className='text-8xl sm:text-9xl font-semibold mb-4'>
        404
      </h1>
      <p className="text-2xl mb-2">Page not found</p>
      <Link to="/" className='btn mt-8 w-fit'>Go home</Link>
    </div>
  );
};

export default NotFound;
