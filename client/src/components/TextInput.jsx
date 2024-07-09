import React from "react";

const TextInput = ({
  text,
  setText,
  handleTranslate,
  translatedText,
  languages,
  language, // Prop to track selected source language
  setLanguage, // Function to update selected source language
}) => {
  const onTranslateClick = (e) => {
    e.preventDefault();
    handleTranslate(); // Invoke handleTranslate without passing language (use the prop directly inside handleTranslate)
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="w-96 h-24 rounded-xl font-semibold text-lg text-center text-black"
        style={{
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: "normal",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />

      <div className="flex items-center mt-3">
      <select name="target" className="text-black rounded-xl w-32 h-10 text-center" id="target">
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        <button
          className="border-2 border-gray-200 m-3 w-24 h-10 rounded-xl"
          onClick={onTranslateClick}
        >
          Translate
        </button>

        <select
          name="source"
          className="text-black rounded-xl w-32 h-10 text-center"
          id="source"
          value={language} // Bind selected source language to the state
          onChange={(e) => setLanguage(e.target.value)} // Update selected source language
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-96 h-24 flex justify-center font-semibold text-lg items-center bg-white rounded-xl text-center text-black mt-3">
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default TextInput;
