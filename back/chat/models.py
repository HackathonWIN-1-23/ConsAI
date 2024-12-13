from django.db import models
from django.conf import settings


# Таблица Code
class Code(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title

# Таблица Article
class Article(models.Model):
    number = models.IntegerField()
    title = models.CharField(max_length=255)
    text = models.TextField()
    code = models.ForeignKey(Code, on_delete=models.CASCADE, related_name='articles')

    def __str__(self):
        return self.title

# Таблица Chat
class Chat(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='chats')

    def __str__(self):
        return f"Chat {self.id} with {self.user.username}"

# Таблица Message
class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    is_gpt = models.BooleanField(default=False)
    text = models.TextField()

    def __str__(self):
        return f"{'GPT' if self.is_gpt else 'User'} Message in Chat {self.chat.id}"

