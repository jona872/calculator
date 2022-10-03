import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';


export default function App() {
  // I read the theme from local storage and set it onto body data attribute earlier in my code, so
  const [theme, setTheme] = useState(1);
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

  const noBlancs = (num) => num.toString().replace(/\s/g, "");

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (noBlancs(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : noBlancs(calc.num) % 1 === 0
              ? Number(noBlancs(calc.num + value))
              : calc.num + value,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
            ? a - b
            : sign === "X"
              ? a * b
              : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            :
            math(
              Number(noBlancs(calc.res)),
              Number(noBlancs(calc.num)),
              calc.sign

            ),
        sign: "",
        num: 0,
      });
    }
  };


  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(noBlancs(calc.num)) : 0;
    let res = calc.res ? parseFloat(noBlancs(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
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
                  onClick={
                    i === 17 ?
                      resetClickHandler
                      : btn === "%" ?
                        percentClickHandler
                        : btn === "=" ?
                          equalsClickHandler
                          : btn === "/" || btn === "X" || btn === "-" || btn === "+" ?
                            signClickHandler
                            : btn === "." ?
                              commaClickHandler
                              : numClickHandler
                  }
                />
              );
            })
          }
        </div>

      </div>
    </div>
  )
}