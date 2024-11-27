import React, {useState} from "react";

function NewPlantForm({addPlant}) {
  const emptyObj = {
    name: "",
    image: "",
    price: "",
  }
  const [formData, setFormData] = useState(emptyObj);
  const [passVal, setPassVal] = useState(true);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(prevData=> {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  function missingItems() {
    return Object.keys(formData).filter(key=>
      formData[key]==="")}

  function handleSubmit(event) {
    event.preventDefault();

    if (missingItems().length > 0) {
      setPassVal(false);
    }

    else  {
      setPassVal(true);

      fetch("http://localhost:6001/plants", {
        method: "POST",
        headers: {"Content-Type": "Application/JSON"},
        body: JSON.stringify(formData)
      })
      .then(res=>res.json())
      .then(plant=>{
        addPlant(plant);
        setFormData(emptyObj);
        console.log("Added:", plant);
      })
      .catch(e=>console.error(e));
    }
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
      {!passVal && (
        <mark>
          <p>Please fill in the following items and resubmit:</p>
          <ul>
            {missingItems().map(item=>
              <li key={item}>{item}</li>)}
          </ul>
        </mark>
      )}
    </div>
  );
}

export default NewPlantForm;
