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

    if($action == 'getAllRoom'){
        array_push($result, $room->list_all_room());
    }

    if($action == 'getRoomData'){
        array_push($result, $room->get_room_by_id($_POST['id']));
    }

    if($action == 'checkImg'){
        array_push($result, $room->search_img($_POST['filepath']));
    }

    if($action == 'modRoom'){
        $roomNumber = $_POST['id'];
        $description = $_POST['nDesc'];
        $numberOfPerson = $_POST['nCap'];
        $price = $_POST['nPrix'];
        $img = $_POST['nImg'];
        array_push($result, $room->modify_room_details($roomNumber,$description,$numberOfPerson,$price,$img));
    }

    if($action == 'getRoomDet'){
        array_push($result, $room->list_available_room());
    }

    if($action == 'getRoomRes'){
        array_push($result, $reservation->get_reservation_by_id($_POST['id']));
    }

    if($action == 'cancelRes'){
        array_push($result, $reservation->cancel_reservation($_POST['id']));
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