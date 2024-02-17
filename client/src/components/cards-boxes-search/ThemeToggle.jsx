import { useState, useEffect } from 'react';
// import lightModeIcon from '../../photos/lightmode.png';
// import darkModeIcon from '../../photos/darkmode.png';

const ThemeToggle = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);
  
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Save the theme preference to local storage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    // Pass the theme toggle to the parent component
    if (onToggle) {
      onToggle(newMode);
    }
  }


    return (
      <button onClick={toggleTheme}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    );
  };

export default ThemeToggle;
