from flask import *
import pymysql
import pymysql.cursors
import os
from flask_cors import CORS

# Mpesa Payment Route
import requests
import datetime
import base64
from requests.auth import HTTPBasicAuth

app = Flask(__name__)

# updater app settings/configurations for the default upload folder
app.config["upload_folder"] = "public/images"
#setup cors
CORS(app)

# Define a route for signup
@app.route("/api/signup", methods = ["POST"])
def signup():
    username = request.form["username"]
    email = request.form["email"]
    phone = request.form["phone"]
    password = request.form["password"]

# create db connection using the .connect() method
    connection = pymysql.connect(host= 'Taty4na.mysql.pythonanywhere-services.com', user= 'Taty4na', password='modcom1234', database= 'Taty4na$default')

# create a cursor to initialize DB and to execute db
    cursor = connection.cursor()

    sql = 'insert into users (username, email, phone, password) values (%s,%s, %s, %s)'

    data = (username, email, phone, password)

    # execute the sql using cursor
    cursor.execute(sql, data)

    # ensure record is saved
    connection.commit()

    return jsonify({"success": "Thank you for joining"})

@app.route("/api/signin", methods = ["POST"])
def signin():
    username = request.form["username"]
    password = request.form["password"]

    connection = pymysql.connect(host="Taty4na.mysql.pythonanywhere-services.com", user="Taty4na", password='modcom1234', database="Taty4na$default")
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    sql = "select user_id,username,phone,email from users where password = %s and username = %s or phone = %s or email = %s"
    data = (password, username, username, username)

    cursor.execute(sql, data)

    if cursor.rowcount == 0:
        return jsonify({'message':'Login Failed. Invalid credentials'})
    else:
        user = cursor.fetchone()
        return jsonify({
            'message' : 'Login successful',
            'user' : user
        })

@app.route("/api/addproduct", methods = ["POST"])
def addproduct():
    product_name = request.form["product_name"]
    product_desc = request.form["product_desc"]
    product_cost = request.form["product_cost"]

    # Get all uploaded images from the form
    product_photos = request.files.getlist("product_photo")   # 'product_photos' is the name of the form field

    # Initialize a list to store paths of saved images
    saved_images = []

    # Iterate over each image and save it
    for product_photo in product_photos:
        photo_name = product_photo.filename
        
        photo_path = os.path.join(app.config["upload_folder"], photo_name)

        # Save the image to the server
        product_photo.save(photo_path)

        # Append the image URL to the saved_images list
        saved_images.append(photo_name)


    # Proceed to save the product data into the 'products' table
    # return jsonify(saved_images)

    connection = pymysql.connect(host="Taty4na.mysql.pythonanywhere-services.com",
                                   user="Taty4na", password='modcom1234',
                                   database="Taty4na$default")
    cursor = connection.cursor()
    

    # Insert product data
    sql = "insert into products (product_name, product_desc, product_cost, product_photos) values (%s,%s,%s,%s)"
    data = (product_name, product_desc, product_cost, saved_images)
    cursor.execute(sql, data)
    connection.commit()

    # Get the product_id of the newly inserted product
    product_id = cursor.lastrowid

    # Insert images into the 'product_images' table
    for image_name in saved_images:
        sql_image = "insert into product_images (product_id, image_url) values (%s, %s)"
        data_image = (product_id, image_name)
        cursor.execute(sql_image, data_image)

    connection.commit()

    return jsonify({"success": "Product added successfully with images"})

@app.route("/api/getproducts")
def getproducts():
    connection = pymysql.connect(host='Taty4na.mysql.pythonanywhere-services.com', user='Taty4na', password='modcom1234', database='Taty4na$default')
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    sql = 'select * from products'

    cursor.execute(sql)
    products = cursor.fetchall()
    return jsonify(products)

@app.route("/api/getusers")
def getusers():
    connection = pymysql.connect(host='Taty4na.mysql.pythonanywhere-services.com', user='Taty4na', password='modcom1234', database='Taty4na$default')
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    sql = 'select username, email, phone from users'

    cursor.execute(sql)
    users = cursor.fetchall()
    return jsonify(users)

@app.route('/api/mpesa_payment', methods=['POST'])
def mpesa_payment():
    if request.method == 'POST':
        # Extract POST Values sent
        amount = request.form['amount']
        phone = request.form['phone']

        # Provide consumer_key and consumer_secret provided by safaricom
        consumer_key = "GTWADFxIpUfDoNikNGqq1C3023evM6UH"
        consumer_secret = "amFbAoUByPV2rM5A"

        # Authenticate Yourself using above credentials to Safaricom Services, and Bearer Token this is used by safaricom for security identification purposes - Your are given Access
        api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"  # AUTH URL
        # Provide your consumer_key and consumer_secret
        response = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
        # Get response as Dictionary
        data = response.json()
        # Retrieve the Provide Token
        # Token allows you to proceed with the transaction
        access_token = "Bearer" + ' ' + data['access_token']

        #  GETTING THE PASSWORD
        timestamp = datetime.datetime.today().strftime('%Y%m%d%H%M%S')  # Current Time
        passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'  # Passkey(Safaricom Provided)
        business_short_code = "174379"  # Test Paybill (Safaricom Provided)
        # Combine above 3 Strings to get data variable
        data = business_short_code + passkey + timestamp
        # Encode to Base64
        encoded = base64.b64encode(data.encode())
        password = encoded.decode()

        # BODY OR PAYLOAD
        payload = {
            "BusinessShortCode": "174379",
            "Password":password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,  # use 1 when testing
            "PartyA": phone,  # change to your number
            "PartyB": "174379",
            "PhoneNumber": phone,
            "CallBackURL": "https://coding.co.ke/api/confirm.php",
            "AccountReference": "Mansory Fashion House",
            "TransactionDesc": "Payments for Products"
        }

        # POPULAING THE HTTP HEADER, PROVIDE THE TOKEN ISSUED EARLIER
        headers = {
            "Authorization": access_token,
            "Content-Type": "application/json"
        }

        # Specify STK Push  Trigger URL
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        # Create a POST Request to above url, providing headers, payload
        # Below triggers an STK Push to the phone number indicated in the payload and the amount.
        response = requests.post(url, json=payload, headers=headers)
        print(response.text) #
        # Give a Response
        return jsonify({"message": "An MPESA Prompt has been sent to Your Phone, Please Check & Complete Payment"})


app.run(debug = True)