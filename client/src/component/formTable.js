import React from "react";
import "../App"
import { MdClose } from "react-icons/md";
const Formtable =({handlesubmit,handelOnChange,handleclose,rest})=>{
    return(
<div className="addcontainer"> 
  <form onSubmit={handlesubmit}>
  <div className="close-btn" onClick={handleclose}><MdClose/></div>

    <label htmlFor="name">name:</label>
    <input type ="text" id="name" name="name" onChange={handelOnChange} value={rest.name }/>
    
    <label htmlFor="email">email:</label>
    <input type ="email" id="email" name="email" onChange={handelOnChange} value={rest.email }/>

    <label htmlFor="mobile">mobile:</label>
    <input type ="number" id="mobile" name="mobile" onChange={handelOnChange} value={rest.mobile}/>

    <button className="btn">submit</button>
  </form>
</div>
    )
}
export default Formtable