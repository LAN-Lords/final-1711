import speech_recognition as sr
from io import BytesIO
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from transformers import pipeline

# Sample complaint categories and training data (can be extended)
complaint_categories = [
    "Platform Cleanliness", "Infrastructure Maintenance", "Passenger Flow Management",
    "Safety and Security", "Passenger Amenities", "Information Systems",
    "Environmental Comfort", "Accessibility", "Staff and Customer Service", "Emergency Preparedness"
]

complaint_data = [
    ("Platform Cleanliness", ["dirty platform", "litter on tracks", "overflowing trash bins"]),
    # Other complaint categories and descriptions...
]

# Preparing training data
X = []
y = []

for category, desc_list in complaint_data:
    X.extend(desc_list)
    y.extend([category] * len(desc_list))

vectorizer = TfidfVectorizer()
X_tfidf = vectorizer.fit_transform(X)
classifier = RandomForestClassifier(n_estimators=100, random_state=42)
classifier.fit(X_tfidf, y)

sentiment_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")


def transcribe_audio(audio_file):
    recognizer = sr.Recognizer()
    audio = sr.AudioFile(BytesIO(audio_file))
    with audio as source:
        audio_data = recognizer.record(source)
    return recognizer.recognize_google(audio_data)


def classify_complaint_description(description):
    X_desc = vectorizer.transform([description])
    category = classifier.predict(X_desc)[0]
    probabilities = classifier.predict_proba(X_desc)[0]
    return category, probabilities


def analyze_sentiment(text):
    result = sentiment_model(text)[0]
    sentiment = result['label']
    score = result['score']
    return sentiment, score