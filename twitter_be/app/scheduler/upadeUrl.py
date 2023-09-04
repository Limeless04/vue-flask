from app.extensions  import db
from app.models.tweet import Tweets
from minio import Minio
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
BUCKET_NAME = "twitterclone"


client = Minio(
        "play.min.io", 
        access_key="Q3AM3UQ867SPQQA43P2F",
        secret_key="zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
    )


def updated_link():
    # Query new data
    tweets = Tweets.query.all()
   
    for tweet in tweets:
        file_name = secure_filename(tweet.image_name)
        # Get the presigned URL using your method (replace with actual method call)
        presigned_url = client.presigned_get_object(BUCKET_NAME, file_name)

        # # Update the file_path attribute
        tweet.file_path = presigned_url

    # Commit the changes to the database
    db.session.commit()
