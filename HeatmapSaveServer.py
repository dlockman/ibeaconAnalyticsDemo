import json
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

class SaveHeatMapRequestHandler(BaseHTTPRequestHandler):
	
    def do_POST(self):
        print('Received post request!')
        content_len = int(self.headers.getheader('content-length'))
        post_body = self.rfile.read(content_len)
        postData = json.loads(post_body)

        heatdata = postData['data']
        data = heatdata['data']
        segment = postData['segment']
        timeWindow = postData['timeWindow']

        print data
        print segment
        print timeWindow

        final = []

        for idx,val in enumerate(data):
            final.append({'x':val['x'], 'y':val['y'], 'segment':segment, 'timeWindow':timeWindow})
        try:
            with open('heatMapData.json') as outfile:
                fileData = json.load(outfile)
            for point in final:
                fileData.append(point)
            with open('heatMapData.json', 'w') as outfile:
                json.dump(fileData, outfile)

        except IOError:
           with open('heatMapData.json', 'w') as outfile:
            json.dump(final, outfile)
        
        

        #send code 200 response
        self.send_response(200)
        print 'Saved and Responded'

def run():
	print('http server is starting...')

	#ip and port of servr
	#by default http server port is 80
	server_address = ('', 9000)
	httpd = HTTPServer(server_address, SaveHeatMapRequestHandler)
	print('http server is running...')
	httpd.serve_forever()
    
if __name__ == '__main__':
    run()