# Generated by Django 3.1.2 on 2020-10-14 07:22

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):
    atomic = False

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mybl', '0002_topic_owner'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Entry',
            new_name='Comment',
        ),
        migrations.RenameModel(
            old_name='Topic',
            new_name='Post',
        ),
        migrations.AlterModelOptions(
            name='comment',
            options={'verbose_name_plural': 'comments'},
        ),
    ]
