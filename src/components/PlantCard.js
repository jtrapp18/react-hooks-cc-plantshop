import React, {useState} from "react";

function PlantCard({removePlant, showEditForm, setShowEditForm, plantToEdit, setPlantToEdit, plant}) {

  const {id, name, image, price} = plant;
  const [inStock, setInStock] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleClick() {
    setInStock(inStock=>!inStock);
  }

  function handleDelete() {
    
    fetch(`http://localhost:6001/plants/${id}`,{
      method: "DELETE", 
      headers: {"Content-Type": "Application/JSON"},
      }
    )
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(plant=>{
      removePlant(id);
      console.log("Deleted:", plant);
    })
  }

  function handleEditClick() {
    setShowEditForm(true);
    setPlantToEdit(plant);
  }

  const inEditMode = (plantToEdit.id === plant.id) && (showEditForm);

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
      <button onClick={handleEditClick} className={inEditMode ? "edit-mode" : ""}>Edit</button>
      {inEditMode && (
        <mark>Edit details in the form above</mark>
      )}           
      <button onClick={()=>setShowConfirm(true)}>Delete</button>
      {showConfirm && (
        <mark>
          <p>Are you sure you want to delete the {name}? It is so beautiful and lively!</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </mark>
      )}      
    </li>
  );
}

export default PlantCard;
