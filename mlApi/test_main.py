
# # #last working version
# import cv2
# from fastapi import FastAPI, UploadFile, File, Form, Depends
# from fastapi.responses import JSONResponse
# from PIL import Image
# import io
# import codebase
# import numpy as np
# import re
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allow all origins for now, restrict in production
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods
#     allow_headers=["*"],  # Allow all headers
# )


# @app.post("/upload-image/")
# async def upload_image(
#         file: UploadFile = File(...)
#         # db: Session = Depends(get_db)
# ):
#     try:
#         # Read and process the image
#         image = Image.open(io.BytesIO(await file.read()))
#         complaint_description = codebase.generate_complaint_description(image)
#         category = codebase.classify_complaint_description(complaint_description)

#         # Save to database
#         # create_complaint(db, pnr, coach_no, seat_no, complaint_description, category)

#         return JSONResponse(content={

#             "complaint_description": complaint_description,
#             "category": category,

#         })

#     except Exception as e:
#         return JSONResponse(content={"error": str(e)}, status_code=400)


# @app.post("/ocr-image")
# async def upload_file(ticketImage: UploadFile = File(...)):
#     try:
#         if ticketImage is not None:
#             # Convert the uploaded file to an image
#             image = Image.open(ticketImage.file)  # Use file.file to get the actual file-like object
#             image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

#             # Perform OCR on the image to extract text
#             extracted_text = codebase.perform_ocr(image_cv)

#             # Regex pattern to extract PNR, Train No, and Train Name
#             # regex = r"PNR\s*(\d+).*?Train\s*No\./Name\s*(\d+)/([^\n]+)"
#             regex = r"PNR\s*(\d+).*?Train\s*No\./Name\s*(\d+)/([^\n]+).*?Class\s*(\S+).*?Booking\s*Date\s*(" \
#                     r"\d{2}-\w{3}-\d{4}\s*\d{2}:\d{2}:\d{2}\s*HRS)"
#             matches = re.search(regex, extracted_text, re.DOTALL)
#             """pnr, train_no, train_name, class_name, booking_date = matches"""

#             if matches:
#                 pnr = matches.group(1)
#                 train_no = matches.group(2)
#                 train_name = matches.group(3).strip()
#                 class_name = matches.group(4)
#                 booking_date = matches.group(5)

#                 return JSONResponse(content={
#                     "pnrNo": pnr,
#                     "trainNo": train_no,
#                     "Train Name": train_name,
#                     "coachNo": class_name,
#                     "seatNo": ""
#                 })
#             else:
#                 return JSONResponse(content={"Response": "No valid information found"}, status_code=400)
#         else:
#             return JSONResponse(content={"Response": "File is missing"}, status_code=400)

#     except Exception as e:
#         # Handle any exceptions and return a 400 error
#         return JSONResponse(content={"error": str(e)}, status_code=400)







from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import io
import codebase
import numpy as np
import re
import cv2
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now, restrict in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Read and process the image
        image = Image.open(io.BytesIO(await file.read()))
        complaint_description = codebase.generate_complaint_description(image)
        category = codebase.classify_complaint_description(complaint_description)

        return JSONResponse(content={
            "complaint_description": complaint_description,
            "category": category,
        })

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

@app.post("/ocr-image")
async def upload_file(ticketImage: UploadFile = File(...)):
    try:
        if ticketImage is not None:
            # Convert the uploaded file to an image
            image = Image.open(ticketImage.file)
            image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

            # Perform OCR on the image to extract text
            extracted_text = codebase.perform_ocr(image_cv)

            # Regex pattern to extract PNR, Train No, and Train Name
            regex = r"PNR\s*(\d+).*?Train\s*No\./Name\s*(\d+)/([^\n]+).*?Class\s*(\S+).*?Booking\s*Date\s*(" \
                    r"\d{2}-\w{3}-\d{4}\s*\d{2}:\d{2}:\d{2}\s*HRS)"
            matches = re.search(regex, extracted_text, re.DOTALL)

            if matches:
                pnr = matches.group(1)
                train_no = matches.group(2)
                train_name = matches.group(3).strip()
                class_name = matches.group(4)
                booking_date = matches.group(5)

                return JSONResponse(content={
                    "pnrNo": pnr,
                    "trainNo": train_no,
                    "Train Name": train_name,
                    "coachNo": class_name,
                    "seatNo": ""
                })
            else:
                return JSONResponse(content={"Response": "No valid information found"}, status_code=400)
        else:
            return JSONResponse(content={"Response": "File is missing"}, status_code=400)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

@app.post("/predict-issue/")
async def predict_issue_endpoint(
    date: str = Form(...),
    time: str = Form(...),
    location: str = Form(...),
    weather: str = Form(...),
):
    try:
        predicted_issue = codebase.predict_issue(date, time, location, weather)
        return JSONResponse(content={"predicted_issue": predicted_issue})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

