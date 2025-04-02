import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./PD.css";



const profiles = [
  { id: 1, name: "John Doe", photo: "/john.jpeg", description: "Software Engineer", lat: 37.7749, lng: -122.4194, contact: "john@example.com", interests: "Coding, Hiking" },
  { id: 2, name: "Jane Smith", photo: "/josh.jpeg", description: "UX Designer", lat: 40.7128, lng: -74.006, contact: "jane@example.com", interests: "Design, Photography" },
];

const PD = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [userProfiles, setUserProfiles] = useState(profiles);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    setUserProfiles(userProfiles.filter((profile) => profile.id !== id));
  };

  useEffect(() => {
    if (selectedProfile) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000); // Simulate loading
    }
  }, [selectedProfile]);

  return (
    <div className="container">
      <h1>Profile List</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      <div className="profile-list">
        {userProfiles
          .filter((profile) => profile.name.toLowerCase().includes(search.toLowerCase()))
          .map((profile) => (
            <div key={profile.id} className="profile-card" onClick={() => setSelectedProfile(profile)}>
              <img src={profile.photo} alt={profile.name} className="profile-photo" />
              <h2>{profile.name}</h2>
              <p>{profile.description}</p>
              <button onClick={() => setSelectedProfile(profile)}>Summary</button>
              <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(profile.id); }}>Delete</button>
            </div>
          ))}
      </div>
      {loading && <p>Loading map...</p>}
      {selectedProfile && (
        <div className="profile-details">
          <h2>{selectedProfile.name}</h2>
          <p><strong>Contact:</strong> {selectedProfile.contact}</p>
          <p><strong>Interests:</strong> {selectedProfile.interests}</p>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={{ lat: selectedProfile.lat, lng: selectedProfile.lng }}
              zoom={12}
            >
              <Marker position={{ lat: selectedProfile.lat, lng: selectedProfile.lng }} />
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
};

export default PD;
