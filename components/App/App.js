import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function App() {
  // I read the theme from local storage and set it onto body data attribute earlier in my code, so
  const [theme, setTheme] = useState(1);

  // sync the changed theme value to local storage and body data attribute
  useEffect(() => {
    if (theme && theme !== document.body.dataset.theme) {
      window.localStorage.setItem("theme", theme);
      document.body.dataset.theme = theme;
    } else {
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  const selectTheme = (e) => {
    e.preventDefault();
    const nextTheme = e.currentTarget.innerText;
    if (nextTheme === "1") setTheme(1);
    if (nextTheme === "2") setTheme(2);
    if (nextTheme === "3") setTheme(3);


  };


  return (
    <div className="content">

      <div className="calc" >
        <div className="calcHeader" >
          <span>calc</span>
          <div className='theme-picker'>
            <p>THEME</p>
            <div className="theme--picker--wrapper">
              <div className='theme--picker--values'>
                <div onClick={selectTheme}> 1 </div>
                <div onClick={selectTheme}> 2 </div>
                <div onClick={selectTheme}> 3 </div>
              </div>
              <div className='theme--picker--circles'>
                <div className='theme--active'>  </div>
                <div className='theme--active'>  </div>
                <div className='theme--active'>  </div>
              </div>
            </div>
          </div>
        </div>


        <div className="display" >
          <h1>399,981</h1>
        </div>

        <div className="keyboard" >

          <button className="div1"> 7 </button>
          <button className="div2"> 8 </button>
          <button className="div3"> 9</button>
          <button className="div4 special"> DEL </button>

          <button className="div5"> 4 </button>
          <button className="div6"> 5 </button>
          <button className="div7"> 6 </button>
          <button className="div8"> + </button>

          <button className="div9"> 1 </button>
          <button className="div10"> 2 </button>
          <button className="div11"> 3 </button>
          <button className="div12"> - </button>

          <button className="div13"> . </button>
          <button className="div14"> 0 </button>
          <button className="div15"> / </button>
          <button className="div16"> * </button>

          <button className="bigDiv1 special"> RESET </button>
          <button className="bigDiv2 intro"> = </button>
        </div>

      </div>
    </div>
  )
}