const CustomiseForm = ({
  timeRangeButtons,
  toggleSwitch,
  downloadButton,
}) => {
  return (
    <form className='w-[324px] sm:w-[520px]'>
      <h2 className='text-4xl font-semibold mb-8'>Customise</h2>
      {timeRangeButtons}
      {toggleSwitch}
      {downloadButton}
    </form>
  );
};

export default CustomiseForm;
