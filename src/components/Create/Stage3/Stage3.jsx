import React, { useContext } from 'react';
import styles from './Stage3.module.css';
import { Context } from '../../../context/Cont';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { assets } from '../../../assets/assets';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Stage3 = () => {
    const { openStage3, setOpenStage3, setOpenStage2, setOpenStage1, upload, setCurrentUser, currentUser, users, setUsers } = useContext(Context);

    if (!openStage3) return null;

    const onConfirm = () => {
        if (!currentUser) {
            console.error('currentUser or currentUser.posts is not properly defined');
            return;
        }
        console.log(currentUser)
    
        // Update the currentUser's posts array
        const updatedUser = {
            ...currentUser,
            posts: [...currentUser.posts, upload],
        };
    
        // Update the currentUser in the users array
        const updatedUsers = users.map(user =>
            user.email === currentUser.email ? updatedUser : user
        );
    
        // Save the updated users array to local storage
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    
        // Update the context and close the stage
        setCurrentUser(updatedUser);
        setUsers(updatedUsers);
    
        console.log(updatedUsers);
        setOpenStage3(false);
        setOpenStage2(false);
        setOpenStage1(false);
    };
    

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <img 
                    src={assets.close_icon} 
                    alt="Close" 
                    className={styles.closeIcon} 
                    onClick={() => setOpenStage3(false)} 
                />
                
                <div className={styles.topSection}>
                    {/* Carousel */}
                    <div className={styles.carousel}>
                        <Slider {...sliderSettings}>
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
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Location Map */}
                    <div className={styles.map}>
                        <MapContainer center={upload.location} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={upload.location}>
                                <Popup>
                                    {`Location: ${upload.location.lat}, ${upload.location.lng}`}
                                </Popup>
                            </Marker>
                        </MapContainer>
                        <div className={styles.addressLabel}>
                            Address: {`Lat: ${upload.location.lat}, Lng: ${upload.location.lng}`}
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className={styles.scrollableContent}>
                    {/* Basic Info */}
                    <div className={styles.basicInfo}>
                        <h2>{upload.title}</h2>
                        <p>{upload.description}</p>
                        <p><strong>Age Requirement:</strong> {upload.age}</p>
                        <p><strong>Access:</strong> {upload.access}</p>
                        <p><strong>Date & Time:</strong> {upload.date}</p>
                    </div>

                    {/* Tickets Information */}
                    <div className={styles.ticketsSection}>
                        {upload.tickets.map((ticket, index) => (
                            <div key={index} className={styles.ticketCard}>
                                <h3>{ticket.name}</h3>
                                <p>{ticket.description}</p>
                                <p><strong>Price:</strong> {ticket.free ? 'Free' : `${ticket.currency} ${ticket.price}`}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Fixed Bottom Bar */}
                <div className={styles.bottomBar}>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Stage3;
