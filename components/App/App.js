import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from "./App.module.css";


export default function App() {
  // I read the theme from local storage and set it onto body data attribute earlier in my code, so
  const [theme, setTheme] = useState("");

  // sync the changed theme value to local storage and body data attribute
  useEffect(() => {
    if (theme && theme !== document.body.dataset.theme) {
      // console.log("document.body.dataset.theme= "+document.body.dataset.theme);
      // console.log(document.body.dataset.theme);

      window.localStorage.setItem("theme", theme);
      document.body.dataset.theme = theme;
    }else{
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  const selectTheme = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const nextTheme = e.currentTarget.innerText;
    // console.log(nextTheme.toString() == 1);
    console.log(nextTheme === "2");
    if (nextTheme === "1" ) setTheme("dark");
    if (nextTheme === "2" ) setTheme("green");
    if (nextTheme === "3" ) setTheme("red");
    
    
  };


  return (
<div className="content">


    <div className={styles.calc} >

      <div className={styles.calcHeader} >
        <span>calc</span>
        <div>
          <p>THEME</p>
          <p>THEME</p>
        </div>
      </div>

      <div>
        <div onClick={selectTheme}> 1 </div>
        <div onClick={selectTheme}> 2 </div>
        <div onClick={selectTheme}> 3 </div>
      </div>

      <div className={styles.display} >
        <h1>399,981</h1>
      </div>

      <div className={styles.keyboard}>

        <div className="div1"> 7 </div>
        <div className="div2"> 8 </div>
        <div className="div3"> 9</div>
        <div className="div4"> Del </div>

        <div className="div5"> 4 </div>
        <div className="div6"> 5 </div>
        <div className="div7"> 6 </div>
        <div className="div8"> + </div>

        <div className="div9"> 1 </div>
        <div className="div10"> 2 </div>
        <div className="div11"> 3 </div>
        <div className="div12"> - </div>

        <div className="div13"> . </div>
        <div className="div14"> 0 </div>
        <div className="div15"> / </div>
        <div className="div16"> * </div>

        <div className={styles.bigDiv1}> RESET </div>
        <div className={styles.bigDiv2}> = </div>
      </div>

    </div>
    </div>
  )
}