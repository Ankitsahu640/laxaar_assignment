import {AiFillDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notes(props){
  const {note,UpdateNote,ShowNotes,setNote,Note} = props;
  // let date = new Date(note.date).toISOString().replace('-', '/').split('T')[0].replace('-', '/');

  //Delete Note

const DeleteNote=(e)=>{
  e.stopPropagation();
  if(window.confirm("you want to delete the note")){
      setNote(Note.filter((ele)=>{
        return ele.id!==note.id;
      }))
    toast.info("Note Deleted", {
      position: "top-right",
      autoClose: 1500});
  }
}


  return (
    <div>
      <div className="card col card-body" onClick={(e)=>{ShowNotes(note)}}>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text"><i>{note.discription}</i></p>
          <hr/>
          <div className="cardDate">
            <div className='del_edit'>
              <span className="delIcon" onClick={DeleteNote}><AiFillDelete size={"1.3rem"} color={"red"}/></span>
              <span className="editIcon" onClick={(e)=>{e.stopPropagation();UpdateNote(note)}}><FaEdit size={"1.3rem"} color={"yellow"}/></span>
            </div>
          </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Notes
