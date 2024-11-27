import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, removePlant, showEditForm, setShowEditForm, plantToEdit, setPlantToEdit}) {
  return (
    <ul className="cards">
      {plants.map(plant=>
        <PlantCard
          key={plant.id}
          plant={plant}
          removePlant={removePlant}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          plantToEdit={plantToEdit}
          setPlantToEdit={setPlantToEdit}
        />
      )}
    </ul>
  );
}

export default PlantList;
