# Image Annotation Client

UI to upload image and add annotation on those uploaded images.

# To  run client locally
    git clone repo
    go to folder image-annotation-client
    npm install
    npm start
    
# Connect to Image annotation server.
Image annotation server will be running a different instance (atleast on a dev environment), to connect to server do the following steps.

    on client instance/vm/machine add environment variable SERVER_URL and set the value as server url (eg: http://localhost:8000/ including the slash)
    
    or
    
    open image-annotation-client/src/config.js and set apiURL to the server url
    eg: apiURL: 'http://localhost:8000/'
    

# Technologies used:
    node: v16.13.0
    react: ^16.13.1
    react-image-annotation: ^0.9.10
    
# Screenshots:

Login page:

![alt text](https://github.com/kishorkumarj/SmartCowAssignment/blob/main/image-annotation-client/help/images/login.png)

Register user page:

![alt text](https://github.com/kishorkumarj/SmartCowAssignment/blob/main/image-annotation-client/help/images/register.png)

Image Gallery page:

once login, user will land into this page, this will display all the images uploaded by all the users, user can upload image by clicking upload button on this page.
If user want to annotate any image, then click on that image, then the annotation page will be displayed for annotation.

![alt text](https://github.com/kishorkumarj/SmartCowAssignment/blob/main/image-annotation-client/help/images/home_page.png)

Image Annotation page:

Once user clicks on an image, then this page will be displayed with the larger version of that image, user can annotate on this image using mouse, once they drag a box, that will give a popup where user can enter a text (what they are annotating), user can do multiple annotation. Once thats done, user need to click the save button to save the annotations.

User can use reset button to reset the annotation, this will clear that users annotation from db as well. User can download the annotations on a csv format(note download will give you the entire annotation made by all other users, but UI will show only the annotaion made by logged in user.

![alt text](https://github.com/kishorkumarj/SmartCowAssignment/blob/main/image-annotation-client/help/images/image_annotation.png)


My Annotations:

This page will display the images that are annotated by logged in user, on click of any image will take the user to Image annotation page where they can add more annotations.

![alt text](https://github.com/kishorkumarj/SmartCowAssignment/blob/main/image-annotation-client/help/images/my_annotation_page.png)

