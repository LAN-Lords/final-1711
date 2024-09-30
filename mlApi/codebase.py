# from PIL import Image
# import torch
# from transformers import CLIPProcessor, CLIPModel
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.linear_model import LogisticRegression

# device = "cuda" if torch.cuda.is_available() else "cpu"

# model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(device)
# processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# complaints = [
#     "dirty platform",
#     "broken equipment",
#     "overcrowded platform",
#     "unsafe conditions",
#     "missing amenities",
#     "inadequate lighting",
#     "broken signage",
#     "empty platform",
#     "poor seating",
#     "lack of information"
# ]

# complaint_descriptions = [
#     "dirty platform",
#     "broken equipment",
#     "overcrowded platform",
#     "unsafe conditions",
#     "missing amenities",
#     "inadequate lighting",
#     "broken signage",
#     "empty platform",
#     "poor seating",
#     "lack of information"
# ]

# complaint_categories = [
#     "Cleanliness",
#     "Maintenance",
#     "Crowd Control",
#     "Safety",
#     "Facilities",
#     "Lighting",
#     "Signage",
#     "Timeliness",
#     "Comfort",
#     "Information"
# ]

# vectorizer = TfidfVectorizer()
# X = vectorizer.fit_transform(complaint_descriptions)
# classifier = LogisticRegression()
# classifier.fit(X, complaint_categories)


# def generate_complaint_description(image):
#     inputs = processor(text=complaints, images=image, return_tensors="pt", padding=True).to(device)
#     with torch.no_grad():
#         outputs = model(**inputs)
#     logits_per_image = outputs.logits_per_image
#     probs = logits_per_image.softmax(dim=1)
#     description = complaints[probs.argmax().item()]
#     return description


# def classify_complaint_description(description):
#     X_desc = vectorizer.transform([description])
#     category = classifier.predict(X_desc)[0]
#     return category


















from PIL import Image
import torch
from transformers import CLIPProcessor, CLIPModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from PIL import Image
import pytesseract
import numpy as np
import cv2
import pytesseract

# For Windows, specify the path to tesseract.exe
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Then proceed with the rest of the OCR code

device = "cuda" if torch.cuda.is_available() else "cpu"

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(device)
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

complaints = [
    "dirty platform",
    "broken equipment",
    "overcrowded platform",
    "unsafe conditions",
    "missing amenities",
    "inadequate lighting",
    "broken signage",
    "empty platform",
    "poor seating",
    "lack of information"
]

complaint_descriptions = [
    "dirty platform",
    "broken equipment",
    "overcrowded platform",
    "unsafe conditions",
    "missing amenities",
    "inadequate lighting",
    "broken signage",
    "empty platform",
    "poor seating",
    "lack of information"
]

complaint_categories = [
    "Cleanliness",
    "Maintenance",
    "Crowd Control",
    "Safety",
    "Facilities",
    "Lighting",
    "Signage",
    "Timeliness",
    "Comfort",
    "Information"
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(complaint_descriptions)
classifier = LogisticRegression()
classifier.fit(X, complaint_categories)


def generate_complaint_description(image):
    inputs = processor(text=complaints, images=image, return_tensors="pt", padding=True).to(device)
    with torch.no_grad():
        outputs = model(**inputs)
    logits_per_image = outputs.logits_per_image
    probs = logits_per_image.softmax(dim=1)
    description = complaints[probs.argmax().item()]
    return description


def classify_complaint_description(description):
    X_desc = vectorizer.transform([description])
    category = classifier.predict(X_desc)[0]
    return category


# OCR

def simple_preprocess(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)
    return binary


def perform_ocr(image):
    processed_image = simple_preprocess(image)
    text = pytesseract.image_to_string(processed_image)
    return text



