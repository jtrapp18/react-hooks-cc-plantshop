import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import EditPlantForm from "./EditPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { prettyDOM } from "@testing-library/react";

function PlantPage() {

  const [searchInput, setSearchInput] = useState("");
  const [allPlants, setAllPlants] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
  });

  function addPlant(newPlant) {
    setAllPlants(prevPlants => [...prevPlants, newPlant])
  }

  function removePlant(plantId) {
    setAllPlants(prevPlants => prevPlants.filter(plant=> plant.id !== plantId));
  }

  function editPlant(updatedPlant) {
    setAllPlants(prevPlants => {
      return prevPlants.map(plant=> {
        if (plant.id === updatedPlant.id) {
          return updatedPlant
        }
        else {
          return plant
        }
        })
    })
  }

  useEffect(()=> {
    fetch("http://localhost:6001/plants")
    .then(res=>res.json())
    .then(plants=>setAllPlants(prevPlants=>plants))
  }, 
  [])

  const filteredPlants = searchInput === "" ? allPlants : 
    allPlants.filter(plant=> plant.name.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <main>
      <NewPlantForm 
        addPlant={addPlant}
      />
      {showEditForm ?
      <EditPlantForm 
        editPlant={editPlant}
        plantToEdit={plantToEdit}
        setPlantToEdit={setPlantToEdit}
        setShowEditForm={setShowEditForm}
      /> : null}
      <Search 
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <PlantList 
        plants={filteredPlants}
        removePlant={removePlant}
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
        plantToEdit={plantToEdit}
        setPlantToEdit={setPlantToEdit}
      />
    </main>
  );
}

export default PlantPage;
