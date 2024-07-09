import React, { useState, useEffect } from 'react';
import Translate from './components/TextInput';
import Logo from './assets/VerbalVoyageLogo.png';

function App() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('en'); // State for selected source language
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('/api/languages');
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const handleTranslate = async () => {
    try {
      console.log('Translating text:', text, 'to language:', language)
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: text, target: language }), // Use selected source language
      });
      const data = await response.json();
      setTranslatedText(data.translated_text);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header flex flex-col justify-center items-center h-screen">
        <div className='flex flex-col justify-center items-center lg:h-auto h-screen lg:w-auto w-screen bg-gray-700 lg:pb-10 lg:px-10 pb-0 px-0 rounded-xl'>
        <img src={Logo} className="App-logo w-64" alt="logo" />
        <h1 className='pb-10 text-3xl font-semibold text-[#fcfefb]'>Verbal Voyage</h1>
        <Translate
          language={language}
          setLanguage={setLanguage} // Pass setLanguage function to update the selected source language
          languages={languages}
          text={text}
          translatedText={translatedText}
          setText={setText}
          handleTranslate={handleTranslate}
        />
        </div>
      </header>
    </div>
  );
}

export default App;
