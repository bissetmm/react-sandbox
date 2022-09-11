/* eslint-disable react-hooks/rules-of-hooks */
import React,{useRef} from 'react'

const MyInput = (props, ref) => {
  console.log(ref); // {current: undefined}
  return <input type="text" />;
};

const WrappedMyInput = React.forwardRef(MyInput);

const index2 = () => {
  const ref = useRef(undefined);

  return (
    <div>
      <WrappedMyInput ref={ref} />
    </div>
  );
}

export default index2