import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Tinkamo from "@musedlab/tinkamod/src/tinkamo"; 
import Sidebar from "./Sidebar"; 
import './index.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const tinkamo = new Tinkamo(); 


function TinkamoEditor() {
  const [code, setCode] = useState("");
  const [cores, setTinkacores] = useState({}); 

  //set Tinkamo in event listener
  useEffect(() => {

    const topEventListener = (event) => {
      console.log('THE STATE ', JSON.stringify(cores))
      cores[event.tinkacore.id] = {
        'name': event.tinkacore.name,
        'sensor': event.sensor,
        'value': event.value
      }
      setTinkacores({...cores});
      console.log('THE STATE PART 2', JSON.stringify(cores))


    }
    // have 2 event listeners where one will check for sensor changes, the other for readings. 
    // on sensor change, the value should not be set cuz that will just be true/false
    // on reading, set value
    
    tinkamo.addEventListener('connect', (event) => {
      
      console.log('EVENT 1\n\n', JSON.stringify(event));
      
      // console.log('=====')
      // console.log('newcore initial', JSON.stringify(newCores))
      // console.log(JSON.stringify(event.tinkamo.tinkacores))
      event.tinkacore.addEventListener('*', topEventListener)

      // for (let i in cores1) {
      //   console.log('IDS', i); 
      //   cores1[i].addEventListener('sensor change', (event) => topEventListener(event, cores))
      // }
    });  

  },[])
  
  
  const onClick = () => {
    tinkamo.connect();
  }
 

  return (
    <div>
       <div> 
        {console.log('got here', JSON.stringify(cores))}
        {
          Object.values(cores).map(
            (elem, i) => {
              console.log(JSON.stringify(elem));
              return <p key={i}> {elem.name + '/'+ elem.sensor + '/' + elem.value} </p>
            }
          )
        }
        {console.log('got here')}
      </div>
      <Sidebar onClick={() => onClick()} />
      <h1 className="main">Tinkamo Editor</h1>
      <CodeMirror
        value={code}
        options={{
          mode: 'xml',
          theme: 'material',
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value)
        }}
        // onChange={(editor, data, value) => {
        //   setCode(value)
        // }}
      />
      <pre>{code}</pre>
     
      {/* <TinkaList tinkamos={cores} /> */}
    </div>
  );
}




// function TinkaList({ tinkamos }) {
//   return (
//     <div className="main"> 
//       Connected Tinkamos
//       <ul>
//         {tinkamos.map(tinka => {
//           console.log('mynameyeff', JSON.stringify(tinka))
//           return (
//           <li key={tinka[1].id}>
//             {console.log("yooyoo", tinka[1].sensor, tinka[1].sensor_connected)}
//             {tinka[1].name + " / " + (tinka[1].sensor ? tinka[1].sensor.name : "loops")}
//           </li>
//         )})}
//       </ul>
//       {console.log('boop', tinkamos)}
//       {tinkamos.length > 0 ? tinkamos[0][1].name: undefined }
//     </div>
//   );
// }





window.addEventListener("load", () => {
  render(<TinkamoEditor />, document.getElementById("main"));
});
