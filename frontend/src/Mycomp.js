import { useEffect, useState } from "react";
import Inputs from "./test/input";
function Mycomp(props){
    const nm = props.name;
    const {name  :xyz} =props
    const [val ,setCounter] =useState(0);
    const [fruit,setFruit] = useState(['apple','mango','guava']);
    const[text,settext]=useState('User');
    //console.log(fruit);
    function buttonclicked(){
        console.log("button ");
    setCounter(val+1);
    setFruit([...fruit,'orange'])
  
    }

   function inputChangehandler(event){
       const {target} =event;
       const {value} =target;
       console.log(value);
       settext(value);
       
    }

    console.log(fruit);
    return(
        <div>
            <p>

                hello!! {text}
            </p>
        <button onClick={()=>buttonclicked()}>
            clickMe
        </button>
        {/* <input value={text} onChange={(event)=>inputChangehandler(event)}>
        
        </input> */}


        <Inputs xyz={inputChangehandler} text={text}/>

        <p> counter - {val}</p>
        {/* <button onClick={counter} > increment counter </button> */}
        
        {val%2==0 ?<ul>
        {fruit.map((itr) => <li> {itr}</li>)}
        </ul> : null
        }
        </div>
//new component -> logic input
    );
}

export default Mycomp;