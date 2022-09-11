/* eslint-disable react-hooks/rules-of-hooks */
import React,{useRef,useEffect} from 'react'

const index = () => {
  const ref = useRef(undefined);

  useEffect(() => {
    console.log(ref.current); // 1
  });

  const onClick = () => {
    ref.current.methodA(); // called methodA
  };

  return (
    <div>
      <button type="button" onClick={onClick}>
        click
      </button>
      <Child ref={ref} />
    </div>
  );
}

class Child extends React.Component {
  constructor(props) {
    super(props);
    //this.x = 1;
    this.methodA = this.methodA.bind(this);
  }

  methodA() {
    console.log('called methodA');
  }

  render() {
    return <span>child text</span>;
  }
}

export default index