<?php

class Room{

    private $roomNumber, $roomDescription, $numberOfPerson, $price;
    
    private $conn;

    public function __construct() {
        $this->conn = new mysqli('localhost', 'thyler', 'k', 'hotel_reservation_system');

        if ($this->conn->connect_error) {
            die("Database connection failed: " . $this->conn->connect_error);
        }
    }

    public function get_number_available_room(){
        $res = array('error'=>false);

        $sql = "select count(room_number) as nb from room where room_number not in (select id_room from reservation) ";
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                array_push($res,$rows);
            }
        }

        return $res;
    }

    public function list_available_room(){
        $res = array('error'=>false);

        $sql = "select room_number, description, number_of_person, price, img_url from room where room_number not in (select id_room from reservation where stat = 'On going')  ";
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                array_push($res,$rows);
            }
        }

        return $res;
    }

    public function list_all_room(){
        $res = array('error'=>false);

        $sql = "select room_number, description, number_of_person, price, img_url from room";
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                array_push($res,$rows);
            }
        }

        return $res;
    }

    public function get_room_by_id($id){
        $res = array('error'=>false);

        $sql = "select description, number_of_person, price, img_url from room where room_number = '$id'";
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                array_push($res,$rows);
            }
        }

        return $res;
    }

    public function list_booked_room(){
        $res = array('error'=>false);

        $sql = "select id_room, phone, full_name, check_in_date, check_out_date from reservation";
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                array_push($res,$rows);
            }
        }

        return $res;
    }

    public function search_booked_room_on_date($date){
        $res = array('error'=>false);

        $sql = "select room.room_number, reservation.phone, reservation.full_name, reservation.check_in_date, reservation.check_out_date from room join reservation on room.room_number = reservation.id_room where check_out_date >= '".$date."'";
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                array_push($res,$rows);
            }
        }

        return $res;
    }

    public function search_available_room_for_price_less($price){
        $res = array('error'=>false);

        $sql = "select room_number, description, number_of_person, price, img_url from room where room_number not in (select id_room from reservation) and price <= '".$price."'";
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                array_push($res,$rows);
            }
        }

        return $res;
    }

    public function search_available_room_for_price_more($price){
        $res = array('error'=>false);

        $sql = "select room_number, description, number_of_person, price from room where room_number not in (select id_room from reservation)  and price >= ".$price;
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                array_push($res,$rows);
            }
        }

        return $res;
    }

    public function search_img($fp){
        $res = false;

        $sql = "select img_url from room where img_url = '$fp'";
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            $res = true;
        }

        return $res;
    }

    public function search_available_room_for_number_of_person_between($number){
        $res = array('error'=>false);

        $nbArr = explode("-",$number);
        $number1 = $nbArr[0];
        $number2 = $nbArr[1];

        $sql = "select room_number, description, number_of_person, price from room where room_number not in (select id_room from reservation)  and number_of_person between ".$number1." and ".$number2;
        $result = $this->conn->query($sql);

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                array_push($res,$rows);
            }
        }

        return $res;
    }


    public function modify_room_details($roomNumber,$description,$numberOfPerson,$price,$img){
        $res = array('error'=>false);
        try{
        $sql = "update room set description = '".$description."', number_of_person = '".$numberOfPerson."', price = '".$price."', img_url = '".$img."' where room_number not in (select id_room from reservation where stat = 'On going') and room_number = '".$roomNumber."'";

        if ($this->conn->query($sql) === TRUE) {
            $res['msg'] = "Succes de la modification";
        }
        }catch(mysqli_sql_exception $e){
            $res['msg'] = "Error updating record: " . $conn->error;
            $res['info'] = "error";
        }

        return $res;
    }

}

?>