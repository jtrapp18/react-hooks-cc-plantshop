import React, {useState} from "react";
import { json } from "react-router-dom";

function EditPlantForm({editPlant, plantToEdit, setPlantToEdit, setShowEditForm}) {

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setPlantToEdit(prevData=> {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:6001/plants/${plantToEdit.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "Application/JSON"},
      body: JSON.stringify(plantToEdit)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(plant=>{
      editPlant(plant);
      console.log("Edited:", plant);
      setShowEditForm(false);
    })
    .catch(e=>console.error(e))
  }

  return (
    <div className="edit-plant-form">
      <h2>Edit Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={plantToEdit.name} onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={plantToEdit.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={plantToEdit.price} onChange={handleChange}/>
        <button type="submit">Submit Edits</button>
      </form>
      <button onClick={()=>setShowEditForm(false)}>Hide Form</button>
    </div>
  );
}

export default EditPlantForm;
