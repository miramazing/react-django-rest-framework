from rest_framework import serializers
from .models import Post

# Create your views here.
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'content',
        )
        model = Post