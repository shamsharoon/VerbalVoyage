from flask import Flask, request, jsonify
from flask_cors import CORS
from libretranslatepy import LibreTranslateAPI
from gtts import gTTS
import requests
import logging

app = Flask(__name__)
CORS(app)

# Initialize LibreTranslateAPI with your chosen endpoint URL
lt = LibreTranslateAPI("https://translate.terraprint.co/")

# Setup logging
logging.basicConfig(level=logging.INFO)

@app.route("/api")
def home():
    return jsonify({"message": "Welcome to the translation API"})

@app.route('/api/translate', methods=['POST'])
def translate():
    try:
        data = request.json
        if not data or 'q' not in data:
            return jsonify({'error': 'Invalid request data'}), 400
        
        text = data['q']
        target_language = data.get('target', 'es')  # Default target language to Spanish if not provided

        # Use LibreTranslateAPI instance to translate text
        translated_text = lt.translate(text, target=target_language)

        return jsonify({'translated_text': translated_text})

    except Exception as e:
        logging.error(f"Error in translate endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/languages', methods=['GET'])
def get_languages():
    try:
        url = "https://translate.terraprint.co/languages"
        response = requests.get(url)

        if response.status_code == 200:
            supported_languages = response.json()
            return jsonify(supported_languages)
        else:
            return jsonify({'error': 'Failed to fetch supported languages'}), response.status_code

    except Exception as e:
        logging.error(f"Error in get_languages endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/convert-to-speech', methods=['POST'])
def convert_to_speech():
    try:
        data = request.json
        if not data or 'text' not in data:
            return jsonify({'error': 'Invalid request data'}), 400
        
        text = data['text']
        language = data.get('language', 'en')  # Default language to English if not provided

        # Initialize gTTS with text and language
        tts = gTTS(text=text, lang=language, slow=False)

        # Save the audio file
        audio_file = "client/src/assets/translated_audio.mp3"
        tts.save(audio_file)

        # Return the filename to play on the frontend
        return jsonify({'audio_file': audio_file})

    except Exception as e:
        logging.error(f"Error in convert_to_speech endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
