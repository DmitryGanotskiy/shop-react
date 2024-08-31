import React, { useContext, useState, useEffect } from 'react';
import styles from './Settings.module.css';
import { Context } from '../../context/Cont';
import { assets } from '../../assets/assets';

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState('account');
  const { openSettings, setOpenSettings, currentUser, setCurrentUser } = useContext(Context);

  const [formData, setFormData] = useState({
    username: '',
    website: '',
    phone: '',
    description: '',
    photo: null
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // Populate form with current user data when component mounts or currentUser changes
  useEffect(() => {
    if (currentUser) {
      console.log('Current User:', currentUser);
      setFormData({
        username: currentUser.username || '',
        website: currentUser.link || '',
        phone: currentUser.phone || '',
        description: currentUser.description || '',
        photo: null
      });
      setPreviewPhoto(currentUser.img || null);
    }
  }, [currentUser]);  

  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };

  const closeForm = () => {
    setOpenSettings(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
    setPreviewPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an updated user object
    const updatedUser = {
      ...currentUser,
      username: formData.username,
      link: formData.website,
      phone: formData.phone,
      description: formData.description,
      img: formData.photo ? URL.createObjectURL(formData.photo) : currentUser.img,
    };

    // Update the user data in context
    setCurrentUser(updatedUser);

    // Optionally, update the local storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = storedUsers.findIndex(user => user.username === currentUser.username);
    if (userIndex > -1) {
      storedUsers[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    alert('Profile updated successfully!');
  };

  return (
    openSettings ? (
      <div className={styles.overlay}>
        <div className={styles.window}>
          <img
            src={assets.close_icon}
            className={styles['close-icon']}
            alt="Close"
            onClick={closeForm}
          />
          <div className={styles.menu}>
            <div onClick={() => handleMenuClick('account')} className={styles.menuItem}>
              Account
            </div>
            <div onClick={() => handleMenuClick('privacy')} className={styles.menuItem}>
              Privacy
            </div>
            <div onClick={() => handleMenuClick('billing')} className={styles.menuItem}>
              Billing
            </div>
            <div onClick={() => handleMenuClick('notifications')} className={styles.menuItem}>
              Notifications
            </div>
            <div onClick={() => handleMenuClick('appearance')} className={styles.menuItem}>
              Appearance
            </div>
          </div>

          <div className={styles.content}>
            {selectedSection === 'account' && (
              <div className={styles.accountSettings}>
                <h2>Account Settings</h2>
                <form onSubmit={handleSubmit}>
                  {/* Profile Image Upload */}
                  <div
                    className={styles['drag-and-drop']}
                    onClick={() => document.getElementById('photoInput').click()}
                  >
                    <input
                      id="photoInput"
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    {previewPhoto ? (
                      <img src={previewPhoto} alt="Profile" className={styles.previewPhoto} />
                    ) : (
                      <p>Click to select a profile photo (optional)</p>
                    )}
                  </div>

                  {/* Username */}
                  <div>
                    <label>Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label>Website:</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Profile Description */}
                  <div>
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit">Save Changes</button>
                </form>
              </div>
            )}
            {/* Other sections content */}
            {selectedSection === 'privacy' && <div>Privacy settings content here</div>}
            {selectedSection === 'billing' && <div>Billing settings content here</div>}
            {selectedSection === 'notifications' && <div>Notifications settings content here</div>}
            {selectedSection === 'appearance' && <div>Appearance settings content here</div>}
          </div>
        </div>
      </div>
    ) : null
  );
};

export default Settings;
