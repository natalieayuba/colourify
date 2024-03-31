const PrivacyScreen = () => {
  return (
    <div className='max-w-4xl pt-14'>
      <h1 className='text-4xl font-semibold mb-4'>Privacy</h1>
      {[...Array(4)].map((e, i) => (
        <p key={i} className='mb-2'>
          Consectetur consectetur minim incididunt dolore minim id in duis enim
          labore fugiat consequat veniam laborum. Duis in magna enim ipsum
          commodo duis est eu Lorem commodo excepteur minim et in. In pariatur
          dolor laboris aliqua ex sint dolore et in mollit. Do est Lorem ad ea.
          Ipsum minim laborum et excepteur. Ea pariatur id mollit magna dolor.
          Sint aliquip in minim voluptate.
        </p>
      ))}
    </div>
  );
};

export default PrivacyScreen;
