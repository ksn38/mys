# Generated by Django 3.0.1 on 2021-06-10 06:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybl', '0030_auto_20210608_1618'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lang_graph',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('java', models.FloatField()),
                ('js', models.FloatField()),
                ('php', models.FloatField()),
                ('py', models.FloatField()),
                ('cpp', models.FloatField()),
                ('date_added', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='comment',
            name='bpost',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mybl.Bpost'),
        ),
    ]
