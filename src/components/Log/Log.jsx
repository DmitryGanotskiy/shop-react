import React, { useContext, useState } from 'react';
import { Context } from '../../context/Cont';
import styles from './Log.module.css';
import { assets } from '../../assets/assets';

const Log = () => {
  const { darkMode, toggleDarkMode, openLog, setOpenLog, setUsers, setCurrentUser } = useContext(Context);
  const [isLogin, setIsLogin] = useState(false); // Default to registration
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    link: '',
    email: '',
    birthday: '',
    photo: null
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
    setPreviewPhoto(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFormData({ ...formData, photo: file });
    setPreviewPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (isLogin) {
      // Login logic
      const user = storedUsers.find(
        (user) => user.email === formData.email && user.password === formData.password
      );
      if (user) {
        setCurrentUser(user);
        alert('Login successful!');
        setFormData({ username: '', password: '', phone: '', link: '', email: '', birthday: '', photo: null });
        setPreviewPhoto(null);
        setErrorMessage(''); // Clear any existing error messages
      } else {
        setErrorMessage('Invalid email or password');
      }
    } else {
      // Registration logic
      const userExists = storedUsers.some(
        (user) =>
          user.username === formData.username ||
          user.password === formData.password ||
          (formData.phone && user.phone === formData.phone) ||
          (formData.email && user.email === formData.email)
      );

      if (userExists) {
        setErrorMessage('A user with the same username, password, phone number, or email already exists.');
      } else {
        const newUser = {
          img: formData.photo ? URL.createObjectURL(formData.photo) : null, // Convert file to URL
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          link: formData.link,
          email: formData.email,
          birthday: formData.birthday,
          description: 'A dedicated and detail-oriented professional with a passion for continuous learning and a knack for solving complex problems efficiently.'
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        setUsers(storedUsers);
        alert('Registration successful!');
        setFormData({ username: '', password: '', phone: '', link: '', email: '', birthday: '', photo: null });
        setPreviewPhoto(null);
        setErrorMessage(''); // Clear any existing error messages
      }
    }
  };

  const closeForm = () => {
    setOpenLog((openLog) => !openLog);
  };

  return (
    openLog && (
      <div className={`${styles.overlay} ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className={styles.main}>
          <img src={assets.close_icon} className={styles['close-icon']} alt="Close" onClick={closeForm} />
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                {/* Photo Upload */}
                <div
                  className={styles['drag-and-drop']}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <input
                    id="fileInput"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {previewPhoto ? (
                    <img src={previewPhoto} alt="Preview" />
                  ) : (
                    <p>Drag & drop a photo, or click to select one (optional)</p>
                  )}
                </div>
              </>
            )}

            {/* Username */}
            {!isLogin && (
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
            )}

            {/* Email */}
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Phone (Optional) */}
            {!isLogin && (
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Website Link */}
            {!isLogin && (
              <div>
                <label>Website Link:</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Birthday */}
            {!isLogin && (
              <div>
                <label>Birthday:</label>
                <input
                  type="text"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  placeholder="dd/mm/yyyy"
                  required
                />
              </div>
            )}

            {/* Error Message */}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            {/* Submit Button */}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>

          {/* Toggle Login/Register */}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
      </div>
    )
  );
};

export default Log;
