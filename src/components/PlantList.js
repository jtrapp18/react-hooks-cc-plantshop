import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, removePlant, plantToEdit, setPlantToEdit, setShowEditForm}) {
  return (
    <ul className="cards">
      {plants.map(plant=>
        <PlantCard
          key={plant.id}
          removePlant={removePlant}
          setShowEditForm={setShowEditForm}
          plantToEdit={plantToEdit}
          setPlantToEdit={setPlantToEdit}
          plant={plant}
        />
      )}
    </ul>
  );
}

export default PlantList;
