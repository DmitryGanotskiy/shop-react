import React, { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import styles from './Stage1.module.css';
import { Context } from '../../../context/Cont';
import { assets } from '../../../assets/assets';

// Component to handle map events and set marker location
const LocationMarker = ({ setLocation }) => {
    useMapEvents({
        click(e) {
            setLocation(e.latlng);
        }
    });
    return null;
};

const Stage1 = () => {
    const { openStage1, setOpenStage1, setOpenStage2, upload, setUpload } = useContext(Context);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [age, setAge] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [tags, setTags] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState(upload.location || { lat: 51.505, lng: -0.09 });
    
    if (!openStage1) return null;

    const requiredFields = [
        { name: 'Title', value: title },
        { name: 'Description', value: description },
        { name: 'Visibility', value: visibility },
        { name: 'Minimum age', value: age },
        { name: 'Date & Time', value: dateTime },
        { name: 'Location', value: location },
        { name: 'Images', value: upload.images.length > 0 }
    ];

    const missingFields = requiredFields
        .filter(field => !field.value || (field.name === 'Location' && (!location.lat || !location.lng)))
        .map(field => field.name);

    const isFormValid = missingFields.length === 0;

    const handleTagChange = (e) => {
        const input = e.target.value;
        const formattedTags = input.split(' ').map(tag => `#${tag.replace(/^#/, '')}`).join(' ');
        setTags(formattedTags);
    };

    const handleClose = () => {
        setOpenStage1(false);
    };

    const handleSubmit = () => {
        // Update the upload state with form data
        setUpload({
            title,
            description,
            images: upload.images,
            age,
            access: visibility,
            date: dateTime,
            location: location
        });

        
        setOpenStage2(true);

        // Log the data for debugging
        console.log({
            title,
            description,
            visibility,
            age,
            dateTime,
            tags,
            location
        });
    };

    const handleSearch = async () => {
        // Implement search functionality
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const validFiles = Array.from(files).filter(file =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
        );

        if (validFiles.length > 0) {
            setUpload(prevState => ({
                ...prevState,
                images: [...prevState.images, ...validFiles]
            }));
        }
    };

    const handleDelete = (index) => {
        setUpload(prevState => {
            const newImages = prevState.images.filter((_, i) => i !== index);
            return { ...prevState, images: newImages };
        });
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <img src={assets.close_icon} alt="Close" className={styles.closeIcon} onClick={handleClose} />
                <div className={styles.topRow}>
                    <div className={styles.uploadBox}>
                        <input
                            id="fileInput"
                            type="file"
                            name="file"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            multiple
                            style={{ display: 'none' }}
                        />
                        <button
                            className={styles.uploadButton}
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            Click or Drag & Drop to Select
                        </button>
                        {upload.images.length > 0 && (
                            <div className={styles.carousel}>
                                {upload.images.map((file, index) => (
                                    <div key={index} className={styles.carouselItem}>
                                        {file.type.startsWith('image/') ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Upload Preview ${index}`}
                                                className={styles.carouselImage}
                                            />
                                        ) : (
                                            <video controls className={styles.carouselVideo}>
                                                <source src={URL.createObjectURL(file)} />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(index)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={styles.map}>
                        <MapContainer center={location} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <LocationMarker setLocation={(latlng) => {
                                setLocation(latlng);
                                setUpload(prevState => ({
                                    ...prevState,
                                    location: { lat: latlng.lat, lng: latlng.lng }
                                }));
                            }} />
                            {location && (
                                <Marker position={location}>
                                    <Popup>
                                        Marker at {location.lat}, {location.lng}
                                    </Popup>
                                </Marker>
                            )}
                        </MapContainer>
                        <div className={styles.searchBox}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search location"
                            />
                            {searchTerm && (
                                <img
                                    onClick={handleSearch}
                                    src={assets.send_icon} // Path to your send icon
                                    alt="Send"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.formWrapper}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="visibility">Visibility</label>
                        <select
                            id="visibility"
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="age">Minimum age</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter age"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="dateTime">Date & Time</label>
                        <input
                            type="datetime-local"
                            id="dateTime"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="tags">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={handleTagChange}
                            placeholder="Enter tags"
                        />
                    </div>
                </div>
                <div className={styles.bottomBar}>
                    <span className={styles.formStatus}>
                        {missingFields.length > 0 ? `Please fill the following fields: ${missingFields.join(', ')}` : 'All forms are filled'}
                    </span>
                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Stage1;
