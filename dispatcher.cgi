#!/usr/bin/python
import sys
sys.path.append('/usr/lib/python2.7/dist-packages/')

import pika
def receive():
    parameters = pika.ConnectionParameters(host="localhost")
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()
    channel.queue_declare(queue='hello')
    method_frame, header_frame, body = channel.basic_get(queue = 'hello')
    if method_frame is None:
	return "EMPTY QUEUE"
    if method_frame.NAME == 'Basic.GetEmpty':
        connection.close()
        return 'NODATA'
    else:            
        channel.basic_ack(delivery_tag=method_frame.delivery_tag)
        connection.close() 
        return body


print "Content-type:text/html\r\n\r\n"
print '<html>'
print '<head>'
print '<title>Hello Word - First CGI Program</title>'
print '</head>'
print '<body>'
print '<h2>Hello Word! This is my first CGI program</h2>'
print '<p>Received Data : %s</p>'%(receive())
print sys.prefix
print sys.version
print '</body>'
print '</html>'
