import logo from './logo.svg';
import './App.css';
import { MdClose, MdTableRestaurant } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from "axios";
import Formtable from './component/formTable';
  
axios.defaults.baseURL="http://localhost:8000/";

function App() {
const[addsection,setAddSection]=useState(false)
const[editSection,setEditSection]=useState(false)
const[formData,setFormData]=useState({
  name:"",
  email:"",
  mobile:""
})
const[FormDataEdit,setFormDataEdit]=useState({
  name:"",
  email:"",
  mobile:"",
  _id:""
 
})
const [dataList,setDataList]=useState([])

const handelOnChange=(e)=>{
  const{value,name}=e.target
  setFormData((preve)=>{
    return{
      ...preve,
      [name]:value
    }
  })
}
  const handlesubmit=async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create",formData);
    console.log(data)
    if(data.data.sucess){
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
    }
  }
  const getFetchData=async()=>{
    const data = await axios.get("/");
    console.log(data)
    if(data.data.sucess){
      setDataList(data.data.data)
      
    }
  }
useEffect(()=>{
  getFetchData()
},[])
const handleDelete=async(id)=>{
  const data = await axios.delete("/delete/"+id);

    if(data.data.sucess){
    alert(data.data.message)
      getFetchData()
    }
}
const handleUpdate=async(e)=>{
  e.preventDefault()
  const data = await axios.put("/update/",FormDataEdit);
  if(data.data.sucess){
    getFetchData()
    alert(data.data.message)
    setEditSection(false)
      
    }
}
const handelEditOnChange =async(e)=>{
  const{value,name}=e.target
  setFormDataEdit((preve)=>{
    return{
      ...preve,
      [name]:value
    }
  })
}
const handelEdit=(el)=>{
  setFormDataEdit(el)
  setEditSection(true)
}
  return (
  <>
   <div className="container">
   <p> CONTACT MANAGER</p>
   <button className="btn btn-add" onClick={()=>setAddSection(true)}>ADD</button>
   
{
  addsection &&(
    <Formtable 
    handlesubmit={handlesubmit}
  handelOnChange={handelOnChange}
  handleclose={()=>setAddSection(false)}
  rest={formData}
    />
  )
}
{
editSection &&(
<Formtable 
handlesubmit={handleUpdate}
handelOnChange={handelEditOnChange}
handleclose={()=>setEditSection(false)}
rest={FormDataEdit}
/>)
}
<div className='tableconatiner'>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone </th>
        <th>
         
        </th>
      </tr>
    </thead>
    <tbody>
    { dataList[0]?(
       dataList.map((el)=>{
        return(
          <tr>
            <td>{el.name}</td>
            <td>{el.email}</td>
            <td>{el.mobile}</td>
            <td> 
              <button className='btn btn-edit' onClick={()=>handelEdit(el)}>EDIT</button>
          <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>DELETE</button></td>
          </tr>
        )
      }))
     :(
      <p style={{textAlign:"center"}}>No data</p>
     )
    }
  </tbody>
  </table>

</div>
   </div>
   </>
  );
}

export default App;
