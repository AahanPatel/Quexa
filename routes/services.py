from flask import render_template, redirect, request, Blueprint, session, url_for
from flask_wtf.file import FileRequired, FileField, FileAllowed
from wtforms import StringField, PasswordField, EmailField, BooleanField
from wtforms.fields.choices import SelectField
from wtforms.validators import InputRequired, Length, EqualTo
from flask_wtf import FlaskForm
from flask_login import LoginManager, login_user, current_user, logout_user, login_required
import shortuuid
from app.db import db
import os

from app.db.models import Post

topic_choices = [(1, 'Math'), (1, 'Science'), (1, 'English'), (1, 'Social Studies')]

services_blueprint = Blueprint('services', __name__)

class create_post_form(FlaskForm):
    title = StringField('Title', validators=[InputRequired(), Length(min=1, max=100)])
    message = StringField('Message', validators=[InputRequired(), Length(min=1, max=200)])
    topic = SelectField('Topic', validators=[InputRequired()], choices=topic_choices)
    image = FileField(validators=[FileAllowed(['jpg', 'png'], 'Images only!')])


@services_blueprint.route('/posts')
@login_required
def posts():
    return render_template('post.html')

@services_blueprint.route('/browser')
@login_required
def browser():
    post_object_list = db.session.query(Post).filter(Post.resolved == False).order_by(
        Post.id.desc()).all()
    post_list = []
    for i in post_object_list:
        post_list.append({
            "id": i.id,
            "topic": i.topic,
            "poster": i.poster,
            "title": i.title,
            "message": i.message,
            "resolved": i.resolved,
            "image": i.image_name
        })
    return render_template('browser.html', posts=post_list)


@services_blueprint.route('/create', methods=["POST", "GET"])
@login_required
def create():
    form = create_post_form()
    if form.validate_on_submit():
        file_name = ""
        image = form.image.data
        if image is not None:
            file_name = shortuuid.ShortUUID().random(length=10)
            directory = 'templates/static/images/'
            if not os.path.exists(directory):
                os.makedirs(directory)
            image.save('templates/static/images/' + file_name + os.path.splitext(image.filename)[1])
        new_post = Post(title=form.title.data, message=form.message.data, image_name=file_name, poster=current_user.name, topic=form.topic.data, resolved=False)
        db.session.add(new_post)
        db.session.commit()
        return redirect(url_for('services.browser'))
    return render_template('create.html', form=form)
