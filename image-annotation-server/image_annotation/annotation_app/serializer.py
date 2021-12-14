from rest_framework import serializers
from django.contrib.auth.models import User
from annotation_app import models

class RegisterUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    confirmpassword = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        if data.get('password') != data.get('confirmpassword'):
            raise serializers.ValidationError({'confirmpassword': 'Password and confirm password doesnt match.'})

        if User.objects.filter(username=data.get('username')).count():
            raise serializers.ValidationError({'username': 'User already exist.'})
    
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',)


class ImageSerializer(serializers.ModelSerializer):
    image  = serializers.SerializerMethodField()

    class Meta:
        model = models.TrafficImages
        fields = '__all__'

    def get_image(self, obj):
        return obj.image.url

class ImageAnnotationSerializer(serializers.ModelSerializer):
    image = ImageSerializer()
    annotations = serializers.SerializerMethodField()

    class Meta:
        model = models.ImageAnnotations
        fields = ('user', 'image', 'annotations')

    def get_annotations(self, obj):
        return obj.annotation_json