<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    include 'Room.php';
    include 'Reservation.php';

    $result = array('error'=>false);
    $action = '';

    $room = new Room();
    $reservation = new Reservation();


    if(isset($_GET['action'])){
        $action = $_GET['action'];
    }

    if($action == 'getRoomDet'){
        array_push($result, $room->list_available_room());
    }

    if($action == 'postReservation'){
        $checkInDate = $_POST['dateA'];
        $checkOutDate = $_POST['dateS'];
        $fullName = $_POST['fullName'];
        $phone = $_POST['phone'];
        $floor = $_POST['room_number'];

        array_push($result, $reservation->create_reservation($checkInDate,$checkOutDate,$fullName,$phone,$floor));
    }

    echo json_encode($result);

?>