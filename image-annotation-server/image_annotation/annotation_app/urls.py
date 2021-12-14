#from django.conf.urls import url, include
from django.urls import path
from django.conf.urls import url
from annotation_app import apis

urlpatterns = [
    url(r'register-user', apis.RegisterUser.as_view()),
    url(r'auth/login', apis.UserLogin.as_view()),
    url(r'get-user-info', apis.GetUserInfo.as_view()),
    url(r'upload-image', apis.UploadImage.as_view()),
    url(r'images', apis.GetUploadedImages.as_view()),
    url(r'image/(?P<image_id>\d+)/rest-annotation', apis.ResetAnnotations.as_view()),
    url(r'image/(?P<image_id>\d+)', apis.GetImageAnnotations.as_view()),
    url(r'my-annotations', apis.MyAnnotations.as_view()),
]