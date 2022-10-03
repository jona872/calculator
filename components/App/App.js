import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';


export default function App() {
  // I read the theme from local storage and set it onto body data attribute earlier in my code, so
  const [theme, setTheme] = useState(1);
  const [display, setDisplay] = useState("0");
  const [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });

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


  const btnValues = [
    [7, 8, 9, "DEL"],
    [4, 5, 6, "+"],
    [1, 2, 3, "-"],
    [".", 0, "/", "x"],
    ["REST", "="],
  ];


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
          <h1> {display} </h1>
          <h1> {calc.num ? calc.num : calc.res} </h1>
        </div>



        <div className="keyboard" >
          {
            btnValues.flat().map((btn, i) => {
              let cn = "div" + ++i + " ";
              cn = (btn === "=") ? cn + "intro" : cn;
              cn = (btn === "DEL") ? cn + "special" : cn;
              cn = (i === 17) ? cn + "special" : cn;

              return (
                <Button
                  key={i}
                  className={cn}
                  value={btn}
                  onClick={() => {
                    console.log(`${btn} clicked!`);
                  }}
                />
              );
            })
          }
        </div>

      </div>
    </div>
  )
}