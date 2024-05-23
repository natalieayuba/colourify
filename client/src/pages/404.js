import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='text-center flex flex-col items-center justify-center h-full '>
      <h1 className='text-9xl font-semibold mb-4'>
        404
      </h1>
      <p className="text-2xl mb-2">Page not found</p>
      <Link to="/" className='btn mt-8'>Go home</Link>
    </div>
  );
};

export default NotFound;
