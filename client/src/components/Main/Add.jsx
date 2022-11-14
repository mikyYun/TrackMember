import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Add = ({addMember}) => {
  

  return (
    <button className="button add" onClick={addMember}>
      <PersonAddIcon />
    </button>
  )
}

export default Add;