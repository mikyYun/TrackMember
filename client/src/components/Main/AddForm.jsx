import React from "react";
import { fetchAdd } from "../../fetch/fetch";

const AddForm = ({hideForm, user}) => {
  const [email, setEmail] = React.useState("mkyun2714@gmail.com");
  const [name, setName] = React.useState("tester");

  const updateEmail = (e) => {
    const val = e.target.value;
    setEmail(val);
  };

  const updateName = (e) => {
    const val = e.target.value;
    setName(val);
  };

  /** Send email to new member */
  const startAdd = async () => {
    if (!email || !name) return;
    await fetchAdd(email, name, user)
      .then(res => res.json())
      .then(res => console.log("RES", res))
    // hideForm(); // hide form
  }

  return (
    <div className="add_form_container">
      <form className="form_add">
        <div className="email_container">
          <label htmlFor="email">email: </label>
          <input
            type="email"
            className="email"
            placeholder="add@email.com"
            onChange={updateEmail}
          />
        </div>
        <div className="name_container">
          <label htmlFor="member_name">name: </label>
          <input
            type="text"
            maxLength={10}
            className="name"
            placeholder="member name"
            onChange={updateName}
          />
        </div>
      </form>
      <div className="button_container">
        <button className="button cancel" onClick={hideForm}>Cancel</button>

        <button className="button confirm" onClick={startAdd}>Invite</button>
      </div>
    </div>
  );
};

export default AddForm;
