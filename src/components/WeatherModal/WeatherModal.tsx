import React, {useState} from 'react';


interface ModalProps {
    currentLocation: string;
    setLocation: (Location: string) => void;
    onClose: () => void;
}


const WeatherModal: React.FC<ModalProps> = ({currentLocation, setLocation, onClose}) => {
    
    const [newLocation, setNewLocation] = useState(currentLocation);

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLocation(event.target.value);
    }

    const handleSave = () => {
        setLocation(newLocation);
        onClose();
    }

    const handleCancel = () => {
        onClose();
    }
    
    return (
            <div className="modal">
              <div className="modal-content">
                <h2>Change Location</h2>
                <label>
                  New Location:
                  <input type="text" value={newLocation} onChange={handleLocationChange} />
                </label>
                <div className="modal-actions">
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleSave}>Save</button>
                </div>
              </div>
            </div>
          );
        };

export default WeatherModal