import torch
from PIL import Image
import cv2
import pytesseract
from transformers import CLIPProcessor, CLIPModel, pipeline
from moviepy.editor import VideoFileClip
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

try:
    import whisper
except ImportError as e:
    print(f"Error importing whisper: {e}")
    whisper = None

device = "cuda" if torch.cuda.is_available() else "cpu"


def load_models():
    clip_model = CLIPModel.from_pretrained("openai/clip-vit-large-patch14").to(device)
    clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-large-patch14")
    sentiment_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
    whisper_model = whisper.load_model("base") if whisper else None
    return clip_model, clip_processor, sentiment_model, whisper_model


clip_model, clip_processor, sentiment_model, whisper_model = load_models()

complaint_categories = [
    "Platform Cleanliness", "Infrastructure Maintenance", "Passenger Flow Management",
    "Safety and Security", "Passenger Amenities", "Information Systems",
    "Environmental Comfort", "Accessibility", "Staff and Customer Service", "Emergency Preparedness"
]

complaint_data = [
    ("Platform Cleanliness",
     ["dirty platform", "litter on tracks", "overflowing trash bins", "spills on floor", "unclean seating areas"]),
    ("Infrastructure Maintenance",
     ["broken escalator", "malfunctioning elevator", "cracked platform edge", "damaged ceiling",
      "faulty lighting fixtures"]),
    ("Passenger Flow Management",
     ["overcrowded platform", "congested entry/exit points", "insufficient queuing space", "blocked pathways",
      "inadequate platform capacity"]),
    ("Safety and Security",
     ["missing safety barriers", "insufficient CCTV coverage", "poorly lit areas", "slippery surfaces",
      "lack of emergency call points"]),
    ("Passenger Amenities",
     ["insufficient seating", "lack of shelter", "missing platform clocks", "inadequate waste bins",
      "absence of water fountains"]),
    ("Information Systems",
     ["outdated display boards", "inaudible announcements", "missing wayfinding signs", "incorrect train information",
      "lack of multi-language support"]),
    ("Environmental Comfort",
     ["poor air circulation", "extreme platform temperature", "excessive noise levels", "inadequate weather protection",
      "poor air quality"]),
    ("Accessibility",
     ["lack of wheelchair ramps", "absent tactile paving", "insufficient disabled seating", "missing lift access",
      "inadequate assistance for visually impaired"]),
    ("Staff and Customer Service",
     ["absence of help desk", "unresponsive station staff", "lack of visible security personnel",
      "poor customer service", "insufficient staff during peak hours"]),
    ("Emergency Preparedness",
     ["blocked emergency exits", "missing first aid facilities", "outdated evacuation procedures",
      "lack of emergency drills", "insufficient emergency lighting"])
]

X = []
y = []

for category, desc_list in complaint_data:
    X.extend(desc_list)
    y.extend([category] * len(desc_list))

complaints = [item for sublist in [desc_list for _, desc_list in complaint_data] for item in sublist]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

vectorizer = TfidfVectorizer()
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)
classifier = RandomForestClassifier(n_estimators=100, random_state=42)
classifier.fit(X_train_tfidf, y_train)


def generate_complaint_description(image):
    inputs = clip_processor(text=complaints, images=image, return_tensors="pt", padding=True).to(device)
    with torch.no_grad():
        outputs = clip_model(**inputs)
    logits_per_image = outputs.logits_per_image
    probs = logits_per_image.softmax(dim=1)
    top_index = probs.argmax(dim=1).item()
    top_complaint = complaints[top_index]
    top_prob = probs[0][top_index].item()
    return top_complaint, top_prob


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


def extract_keyframes(video_path):
    keyframes = []
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    interval = int(fps * 10)  # Extract a keyframe every 10 seconds
    for frame_number in range(0, frame_count, interval):
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
        ret, frame = cap.read()
        if ret:
            keyframes.append(frame)
    cap.release()
    return keyframes


def extract_subtitles_from_frame(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray)
    return text


def generate_subtitles_from_video(video_path):
    if not whisper_model:
        raise RuntimeError("Whisper model is not loaded. Please check the model loading.")

    audio_path = "audio.wav"
    video = VideoFileClip(video_path)
    video.audio.write_audiofile(audio_path)
    audio = whisper.load_audio(audio_path)
    result = whisper_model.transcribe(audio)
    return result["text"]