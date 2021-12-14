from django.db import models
from django.contrib.auth.models import User
import json

# Create your models here.
class TrafficImages(models.Model):
    image = models.FileField()
    file_name = models.CharField(max_length=250, null=True, blank=True)
    user = models.ForeignKey(User, related_name='uploaded_images', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

class ImageAnnotations(models.Model):
    image = models.ForeignKey(TrafficImages, on_delete=models.CASCADE, related_name='annotations')
    user = models.ForeignKey(User, related_name='user_annotations', on_delete=models.CASCADE)
    annotations = models.TextField(null=True, blank=True) # will save as json
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "%s %s" %(self.image, self.user)

    @property
    def annotation_json(self):
        try:
            return json.loads(self.annotations)
        except:
            return {}

    @property
    def annotation_string(self, annotation_obj):
        try:
            self.annotations = json.dumps(annotation_obj)
        except Exception:
            self.annotations = ''

        return self.annotations

