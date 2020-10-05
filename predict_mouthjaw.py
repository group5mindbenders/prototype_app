from imutils import face_utils
import argparse
import imutils
import time
import dlib
import cv2
import sys
import urllib

data = sys.argv[1]

response = urllib.request.urlopen(data)
with open('image.jpg', 'wb') as f:
    f.write(response.file.read())

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("mouth_jaw.dat")

image=cv2.imread('image.jpg')

def yawn(image):
		
	image = imutils.resize(image, width=400)
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

	rects = detector(gray, 0)

	
	for rect in rects:
		
		(x, y, w, h) = face_utils.rect_to_bb(rect)
		cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

		
		shape = predictor(gray, rect)
		shape = face_utils.shape_to_np(shape)
		count = 0
		y1 = 0
		y2 = 0
		x1 = 0
		x2 = 0
		for (x, y) in shape:
			#count=count+1
			if count== 21: 
				y1=y
			if count == 27:
				y2=y
			if count ==  18:
				x1=x
			if count == 24:
				x2 = x
			count=count+1
           
            
		verticalY=y2-y1
		horizontalY=x2-x1
		#print("vertical: ",verticalY," horizontal: ",horizontalY)
		ratio=(h/verticalY)
		
		
		 
		if(ratio<=4.5):        
		#if(verticalY>11 and horizontalY<28):
			# 	#print(ratio)
				
			# 	#cv2.imwrite('imgs'+str(i)+".jpg", image)
			return("yawning")
			


		else:		
			#print("images"+str(i)+".jpg")
			#print(ratio)
			return("attentive")
	
	
		for (sX, sY) in shape:
			cv2.circle(image, (sX, sY), 1, (0, 0, 255), -1)
	return("not")

print(yawn(image))
		

