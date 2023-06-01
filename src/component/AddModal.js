import React,{ useRef,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddModal(props) {

  const {Note, setNote} = props;
  const ref = useRef(null)
  const refClose = useRef(null);
  const [noteVal,setNoteVal] = useState({title:"",discription:"",tag:""});

  const AddNoteChanges=(e)=>{
    setNoteVal({...noteVal,[e.target.name]: e.target.value,id: new Date().getTime().toString()});
    if (e.target.name === "title" && e.target.value.trim().length < 10) {
      document.getElementById("validateDiscription").setAttribute("required", true);
    } else {
      document.getElementById("validateDiscription").removeAttribute("required");
    }
  }

  const checkInput = (note) => {
    let ii=0;
    Note.map((ele)=>{
      if(ele.title.trim().toLowerCase()===note.title.trim().toLowerCase()){
        toast.error("Note title already exists.", {
          position: "top-center",
          autoClose: 1500});
        ii=1;
        return ; 
      }
    })
    if(ii===1){
      return false;
    }
    else{
      return true;
    }
  }
    
  const handleAddNote=(e)=>{
    e.preventDefault();
    if(checkInput(noteVal)){
      setNote([...Note,noteVal]);
      refClose.current.click();
      setNoteVal({title:"",discription:"",tag:""});
      toast.info("Note Added", {
        position: "top-right",
        autoClose: 1500});
    }
  } 

  return (
    <div>
        <div className="card col card-body add-note" onClick={()=>{ref.current.click()}}>
            <div className='icon-plus'>+</div>
            <div>Add new notes</div>
        </div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" style={{display:"none"}}>
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content" style={{backgroundColor:"rgb(216, 230, 233)"}}>
              <div className="modal-header btn-info">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleAddNote}>
              <div className="modal-body">
                <div className="title">
                    <label htmlFor="validationDefault01" className="form-label">Title</label>
                    <input type="text" className="form-control" id="validationDefault01" name="title" value={noteVal.title} onChange={AddNoteChanges} required/>
                </div>
                <div className="discription">
                    <label htmlFor="validateDiscription" className="form-label">Discription</label>
                    <textarea className="form-control" id="validateDiscription" resize="none" style={{height:"20rem"}} name="discription" value={noteVal.discription} onChange={AddNoteChanges} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Cancel</button>
                <button type="Submit" className="btn btn-info" >Add</button>
              </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default AddModal;
