# CEOL

## Song Recommendation Using Emotion Recognition

This project is a web-based application and the android app is available at ([GithubLink](https://github.com/HARSHA123361/Emotion-Detection-using-Facial-Expression)) that uses facial emotion recognition to recommend calming and positive music tailored to the user’s emotional state. The application is designed to analyze a human face from an uploaded image or webcam, predict the user's emotion using a Convolutional Neural Network (CNN) model and then suggest appropriate songs to counteract negative emotions or enhance positive ones.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)


## Overview

The **CEOL** project is designed to recognize a user's emotion from an image or webcam feed and recommend music to help uplift the user's mood. It uses a **React.js** frontend and **CSS** for styling for user interaction and a **Python-based backend** powered by a CNN emotion recognition model (built with Keras and trained on the FER dataset). 

The backend processes the images converted in the form of Base64 format, predicts emotions and sends it back. Based on the prediction, a curated music playlist designed to have a positive and calming effect is played to the user.


## Features

1. **Facial Emotion Recognition**:
   - Accepts images from either an **upload** or a live **webcam feed**.
   - Converts the image to Base64 format and sends it to the backend for emotion analysis.
   
2. **Emotion-Based Song Recommendation**:
   - Predicts 7 emotions such as Anger, Disgust, Fear, Happy, Sad, Surprise and Neutral.
   - Provides music recommendations that counteract negative emotions (e.g., calming tracks anger) or enhance positive emotions (e.g., energetic tracks for happiness).

3. **Responsive UI**:
   - Built with React.js, it is responsive and provides a seamless user experience with a good visually appealing UI.

5. **Backend Emotion Model**:
   - A CNN-based deep learning model trained on the **FER dataset** for accurate emotion prediction with an accuracy of around 75.6%

## Tech Stack

### **Frontend**
- **React.js**: For building the interactive user interface.
- **React Router DOM**: For handling navigation between pages.
- **React Webcam**: For capturing live images through the webcam.
- **Lucide Icons**: For adding sleek and modern icons to the UI.
- **CSS**: For styling and responsive design.

### **Backend**
- **Python**: For building the backend API.
- **Keras & TensorFlow**: For creating and training the CNN model.
- **FER Dataset**: For training the emotion recognition model.
- **Vercel Functions**: For deploying the backend serverless functions.

## Usage

1. **Emotion Detection**:
   - Upload an image or use the webcam to capture a live photo.
   - The application will analyze the emotion from the face.

2. **Music Recommendation**:
   - Based on the detected emotion, songs from a certain playlist will be suggested to help uplift your mood.

3. **Explore Playlists**:
   - You can explore recommended playlists and play music directly from the interface.