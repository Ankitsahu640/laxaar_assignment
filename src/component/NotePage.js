import React,{useEffect,useRef, useState} from 'react';
import Notes from './Notes';
import AddModal from './AddModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NotePage() {
    const getNotes = () => {
        let list = localStorage.getItem('Notes');
        if(list){
            return JSON.parse(list);
        }
        else{
            return [];
        }
    }

  const [search,setSearch] = useState("");
  const [Note, setNote] = useState(getNotes());


  //showing note modal
  const noteRef = useRef(null);
  const [showNote,setShowNote]=useState({title:"",discription:""});

  const ShowNotes = (curNote) =>{
    setShowNote({title:curNote.title ,discription:curNote.discription })
    noteRef.current.click();
  }

//check input

const checkInputUP = (note) => {
  let ii=0;
  Note.map((ele)=>{
    if(ele.title.toLowerCase()===note.title.toLowerCase() && ele.id!==note.id){
      toast.error("Note title already exists.", {
        position: "top-center",
        autoClose: 1500});
      ii=1;
      return;
    }
  })
  if(ii===1){
    return false;
  }
  else{
    return true;
  }
}


//Updating note
    const updateRef = useRef(null);
    const refClose = useRef(null);
    const [noteVal,setNoteVal] = useState({id:"" ,title:"" ,discription:""});

    const UpdateNoteChanges=(e)=>{
        setNoteVal({...noteVal,[e.target.name]: e.target.value});
        if (e.target.name === "title" && e.target.value.trim().length < 10) {
          document.getElementById("validateDiscription02").setAttribute("required", true);
        } else {
          document.getElementById("validateDiscription02").removeAttribute("required");
        }
    }

    const UpdateNote = (curNote)=>{
      setNoteVal({id:curNote.id ,title:curNote.title ,discription:curNote.discription})
      updateRef.current.click();
    }

    const handleUpdateNote = (e) =>{
        e.preventDefault();
        if(checkInputUP(noteVal)){
          setNote(Note.map((ele)=>{
              if(ele.id===noteVal.id){
                  return noteVal;
              }
              else{
                  return ele;
              }
          }))
          refClose.current.click();
          setNoteVal({id:"" ,title:"" ,discription:"" });
          toast.info("Note Updated", {
              position: "top-center",
              autoClose: 1500});
        }
      }
  

//Applying Filter

    const handleSearch=(e)=>{
      if(e.key==="Enter"){
        e.preventDefault();
        setSearch(e.target.value.toLowerCase().trim());
        // console.log(search);
      }
    }    

    const handleReset=()=>{
      setSearch("");
    }


//useEffect
  useEffect(() => {
    localStorage.setItem('Notes',JSON.stringify(Note));
  }, [Note])


  return (
    <div className=" containerN">

                  {/* Update Modal */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={updateRef} data-bs-target="#updateModal" style={{display:"none"}}/>
                <div className="modal fade bggrad" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabe2" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content" style={{backgroundColor:"rgb(216, 230, 233)"}}>
                      <div className="modal-header btn-info">
                        <h1 className="modal-title fs-5" id="exampleModalLabe2">Update Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <form onSubmit={handleUpdateNote}>
                      <div className="modal-body">
                        <div className="title">
                            <label htmlFor="validationDefault01" className="form-label">Title</label>
                            <input type="text" className="form-control" id="validationDefault01" name="title" value={noteVal.title} onChange={UpdateNoteChanges} minLength={3} required/>
                        </div>
                        <div className="discription">
                            <label htmlFor="validateDiscription02" className="form-label">Discription</label>
                            <textarea className="form-control" id="validateDiscription02" resize="none" style={{height:"20rem"}} name="discription" value={noteVal.discription} onChange={UpdateNoteChanges} minLength={5} required/>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Cancel</button>
                        <button type="Submit" className="btn btn-info" >Update</button>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* showing Note Modal */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#openNote"style={{display:"none"}} ref={noteRef}/>
                <div className="modal fade" id="openNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-xl">
                    <div className="modal-content" style={{backgroundColor:"rgb(216, 230, 233)"}}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel"/>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body open-note container navcolor">
                        <h1 className='card-title'>{showNote.title}</h1>
                        <h4 className='card-discription'><i>{showNote.discription}</i></h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>


                <div className="yourNotes">
                  <h1 className='txtgrad'>Note Taking App</h1>
                  <hr/>
                </div>
                <div className="searchBar my-3">
                    <div><input type="search" id="search" onKeyDown={handleSearch} placeholder='Search Your Notes'/></div>
                    <div>
                      <button type="button" className="btn btn-info" onClick={handleReset}>Reset</button>
                    </div>
                </div>

                <div className="noteContainer grid-container">
                <AddModal Note={Note} setNote={setNote}/>
                  {Note.map((note)=>{
                        if(search==="" || note.title.toLowerCase().includes(search))
                            return(<Notes key={note.id} note={note} UpdateNote={UpdateNote} ShowNotes={ShowNotes} setNote={setNote} Note={Note}/>) 
                      })
                  }
                </div>
        <ToastContainer/>
    </div>
  )
}

export default NotePage
