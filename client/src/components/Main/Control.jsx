import React from "react";

import Add from "./Add";
import Remove from "./Remove";
import AddForm from "./AddForm";

const Control = ({user}) => {
  const [showAddForm, setShowAddForm] = React.useState(false)
  
  const hideForm = () => {
    setShowAddForm(false)
  }

  const addMember = () => {
    setShowAddForm(true)
  }

  return (
    <div className="control_container">
      CONTROL
      <Add addMember={addMember}/>
      <Remove />
      {showAddForm && <AddForm hideForm={hideForm} user={user}/>}
    </div>
  )
}

export default Control;