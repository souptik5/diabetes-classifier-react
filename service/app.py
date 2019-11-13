from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
import numpy as np
import sys

flask_app = Flask(__name__)
app = Api(app = flask_app,
		  version = "1.0",
		  title = "Diabetes Prediction",
		  description = "Predict diabetes of a patient")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params',
				  {'pregnant': fields.Float(required = True,
				  							   description="Number of Pregnancy",
    					  				 	   help="Pregnancy cannot be blank"),
				  'glucose': fields.Float(required = True,
				  							   description="Blood Glucose Level",
    					  				 	   help="Glucose cannot be blank"),
				  'bp': fields.Float(required = True,
				  							description="Blood Pressure",
    					  				 	help="Blood pressure cannot be blank"),
				  'skin': fields.Float(required = True,
				  							description="Thickness of skin.",
    					  				 	help="Skin thickness cannot be blank"),
                   'insulin': fields.Float(required=True,
                                              description="Insulin level in blood",
                                              help="Insulin level cannot be blank"),
                    'bmi': fields.Float(required = True,
                                           description="Body Measurement Index",
                                           help="bmi cannot be blank"),
                    'pedigree': fields.Float(required = True,
                                           description="Pedigree",
                                           help="Pedigree cannot be blank"),
                    'age': fields.Float(required = True,
				  							   description="Age",
    					  				 	   help="Age cannot be blank")})

classifier = joblib.load('classifier1.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)
	def post(self):
		try:
			formData = request.json
			data = [val for val in formData.values()]
			prediction = classifier.predict(np.array(data).reshape(1, -1))
			types = { 0: "No Diabetes", 1: "Diabetes "}
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "The patient has " + types[prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})
if __name__ == '__main__':
	flask_app.debug = False
	flask_app.run(host='127.0.0.1', port=5000)