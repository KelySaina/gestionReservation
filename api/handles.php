<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    include 'Room.php';

    $result = array('error'=>false);
    $action = '';

    $room = new Room();

    if(isset($_GET['action'])){
        $action = $_GET['action'];
    }

    if($action == 'getRoomDet'){
        array_push($result, $room->list_available_room());
    }

    echo json_encode($result);

?>