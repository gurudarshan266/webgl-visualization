<?php


require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;

$connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
$channel = $connection->channel();


$channel->queue_declare('hello', false, false, false, false);

#echo ' [*] Waiting for messages. To exit press CTRL+C', "\n";

$callback = function($msg) {
  echo  $msg->body;
  //echo "$msg";
  //$msg->$channel->close();
};

$channel->basic_consume('hello', '', false, true, false, false, $callback);

/*while(count($channel->callbacks)) {
    //break;
    $channel->wait();
    break;

}*/

$timeout = 0.9;
try{
            $channel->wait(null, false , $timeout);
}
catch(\PhpAmqpLib\Exception\AMQPTimeoutException $e)
{
 echo "NODATA";
}
$channel->close();
$connection->close();

?>

