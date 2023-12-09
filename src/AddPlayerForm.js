// import "./AddPlayerForm.css"

/** An individual game piece dropped by a player
 *
 * Props:
 *  - Color: The background color of the piece based on player selection
 *
 * State:
 *  - None
 *
 * PlayerManager -> AddPlayerForm*/
function AddPlayerForm({ add }) {
  console.log("AddPlayerForm re-rendered");

  return (
    <div className="AddPlayerForm">
      Add Player Form
    </div>
  );
}

export default AddPlayerForm;