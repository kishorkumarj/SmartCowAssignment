import json, csv
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import get_user_model, authenticate
from annotation_app import serializer as app_serializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from annotation_app import models

class RegisterUser(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        serializer = app_serializer.RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.create(
                    username=serializer.validated_data.get('username'),
                    email=serializer.validated_data.get('username'))
            
                user.set_password(serializer.validated_data.get('password'))
                user.save()
                
                # Register will login also. No need to login again
                # create token for user.
                token, created = Token.objects.get_or_create(user=user)

                user_serializer = app_serializer.UserSerializer(instance=user)
                data = user_serializer.data
                data['token'] = token.key
                return Response(data, status=200)
            except Exception as e:
                print('error registering user:: ', str(e))
                return Response({'message': 'Exception while creating User'}, status=500)
        else:
            return Response(serializer.errors, status=403)


class UserLogin(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            raise AuthenticationFailed(detail='Invalid credentials.', code=403)
        
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = app_serializer.UserSerializer(instance=user)
        data = user_serializer.data
        data['token'] = token.key

        return Response(data, status=200)

class GetUserInfo(APIView):
    def get(self, request):
        user = get_object_or_404(User, pk=request.user.id)
        return Response(app_serializer.UserSerializer(instance=user).data)

class UploadImage(APIView):

    def post(self, request):
        file = request.FILES.get('file')
        image_upload = models.TrafficImages.objects.create(
                        image=file,
                        user=request.user,
                        file_name=file.name)
        return Response({'url': image_upload.image.url})


class GetUploadedImages(ListAPIView):
    serializer_class = app_serializer.ImageSerializer

    def get_queryset(self):
        '''
        user =  self.request.user
        if user.is_superuser:
            return models.TrafficImages.objects.all()
        else:
            return models.TrafficImages.objects.filter(user=user)
        '''
        return models.TrafficImages.objects.all()


class GetImageAnnotations(APIView):
    def get(self, request, image_id):
        image = get_object_or_404(models.TrafficImages, id=image_id)

        # super user can see all the annotations
        if request.user.is_superuser:
            annotations = models.ImageAnnotations.objects.filter(image=image)
        else:
            annotations = models.ImageAnnotations.objects.filter(image=image, user=request.user)

        image_serializer = app_serializer.ImageSerializer(instance=image).data
        image_serializer['annotations'] = app_serializer.ImageAnnotationSerializer(instance=annotations, many=True).data

        return Response(image_serializer)


    def post(self, request, image_id):
        image = get_object_or_404(models.TrafficImages, id=image_id)
        annotations = request.data.get('annotations', [])
        try:
            annotation_obj = models.ImageAnnotations.objects.get(user=request.user, image=image)
        except models.ImageAnnotations.DoesNotExist:
            annotation_obj = models.ImageAnnotations(
                user=request.user,
                image=image
            )

        try:
            annotation_obj.annotations = json.dumps(annotations)
            annotation_obj.save()
        except Exception as e:
            print(str(e))
            return Response({'message': 'Failed to save annotations.'}, status=500)

        return Response({'message': 'success'})

    def delete(self, request, image_id):
        pass

# this will download all the annotations for an image.
class DownloadCSV(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, image_id):
        
        image = get_object_or_404(models.TrafficImages, id=image_id)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="annotations.csv"'
        writer = csv.DictWriter(response, fieldnames=['file_name', 'vehicle_type' ,'x_axis', 'y_axis', 'width', 'height'])

        # get filename and coordinates of each annotation.
        for annotation in image.annotations.all():
            for entry in annotation.annotation_json:
                try:
                    writer.writerow({
                        'file_name': annotation.image.file_name, 
                        'vehicle_type': entry.get('data', {}).get('text', ''),
                        'x_axis': round(entry.get('geometry', {}).get('x', 0), 2),
                        'y_axis': round(entry.get('geometry', {}).get('y', 0), 2),
                        'width': round(entry.get('geometry', {}).get('width', 0), 2),
                        'height': round(entry.get('geometry', {}).get('height', 0), 2)
                    })
                except Exception:
                    pass    
        return response
        


class ResetAnnotations(APIView):
    def post(self, request, image_id):
        image = get_object_or_404(models.TrafficImages, id=image_id)
        models.ImageAnnotations.objects.filter(image=image, user=request.user).delete()
        return Response({'message': 'success'})

class MyAnnotations(ListAPIView):
    serializer_class = app_serializer.ImageAnnotationSerializer
    def get_queryset(self):
        return models.ImageAnnotations.objects.filter(user=self.request.user)