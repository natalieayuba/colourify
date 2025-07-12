export const ProgressBar = ({ value, label }) => {
  const percentage = value * 100;
  return (
    <div className='flex gap-5 flex-col items-center text-3xl'>
      <p>{label}</p>
      <div className='bg-black/50 w-96 h-7 rounded-2xl border-2 border-black'>
        <div
          className='h-full bg-black rounded-2xl border-2 border-black/50'
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className='inline-block'>{`${Math.floor(percentage)}%`}</span>
    </div>
  );
};
