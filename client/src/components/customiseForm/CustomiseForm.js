const CustomiseForm = ({
  usernameTextBox,
  timeRangeButtons,
  toggleSwitch,
  downloadButton,
}) => (
  <form className='w-[324px] sm:w-[520px]'>
    <h2 className='text-3xl sm:text-4xl font-semibold mb-8'>Customise</h2>
    {usernameTextBox}
    {timeRangeButtons}
    {toggleSwitch}
    {downloadButton}
  </form>
);

export default CustomiseForm;
