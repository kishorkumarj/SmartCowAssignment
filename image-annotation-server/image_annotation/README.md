# Image Annotation Server
Backend code to save the uploaded images and allows the user to save the annotations.
Enables token based authentication with the client.



# Technologies used.
    python: 3.8.0
    Django: 3.0.6
    djangorestframework: 3.11.0
    sqlite database.
    
# To run locally.
    create a python virtual environment: python -m vene venv
    activate venv
    install pip packages: pip3 install -r requirements.txt (can be found at folder: image-annotation-server/image-annotation)
    do db migration python manage.py migrate (using sqllite as default)
    run server:
        python manage.py runserver.
    
# Description:
All the application related code is kept under /image-annotation-server/image_annotation/annotation_app/ app. api.py will have all the apis realted to this application.
App support user registration, login with auth token (django's default token). Allows the user to upload image, allows the user to save the annotations for an image.
app is enabled with cors to support request from client on another domain.
