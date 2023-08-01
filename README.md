# Robot Control Panel
## 1. HTML, CSS, and JavaScript with jQuery
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <title>Robot Control Panel</title>
 <style>
    body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 100px;
            margin: 70px;
            color: #17617E;

        }
        .control-panel {
            display: flex;
            justify-content: center;
            
        }
        .direction-btn {
            background-color: #297b9b;
            color: #fff;
            font-size: 25px;
            padding: 20px 40px;
            border: none;
            border-radius: 8px;
            margin: 10px;
            cursor: pointer;
            box-shadow: 0px 2px 5px rgba(132, 31, 31, 0.2);
        }
        .direction-btnn {
            background-color: #a72754;
            color: #fff;
            font-size: 24px;
            padding: 10px 30px;
            border: none;
            border-radius: 8px;
            margin: 10px;
            cursor: pointer;
            box-shadow: 0px 2px 5px rgba(132, 31, 31, 0.2);
        }
        .direction-btn:hover {
            background-color: rgb(116, 180, 208);
        }
        .swal-title {
            color: #17617E;
            font-family: Arial, sans-serif; 
        }
        .swal-text {
            font-family: Arial, sans-serif; 
            color: #a72754;
            font-size: 25px;
        }
        .swal-icon--success {
            border-color: #440023;
        }
        .swal-icon--success__line {
            height: 5px;
            background-color: #17617E;
            display: block;
            border-radius: 50px;
            position: absolute;
            z-index: 2;
        }
        .swal-icon--success__ring {
            width: 80px;
            height: 80px;
            border: 4px solid hsla(340, 49%, 75%, 0.7);
            border-radius: 50px;
            box-sizing: content-box;
            position: absolute;
            left: -4px;
            top: -4px;
            z-index: 2;
        }
        .Dire{
            width: 400px;
           height: 300px;
            
        }
    
        /* Media query for small devices, such as phones */
        @media screen and (max-width: 480px) {
           
            .direction-btn { 
                font-size: 20px;
                padding: 15px 30px;
            }
            .direction-btnn {
                font-size: 20px;
                padding: 10px 20px;
            }
            .swal-text {
                font-size: 18px;
            }
            .swal-icon--success__ring {
                width: 80px;
                height: 80px;
                border-width: 4px;
            }
            .Dire {
                width: 300px;
               
            }
        }

    </style>
</head>
<body>
<div class="control-panel">
        <button class="direction-btn" data-direction="forward">↑</button>
    </div>
    <div class="control-panel">
        <button class="direction-btn" data-direction="left">←</button>
        <button class="direction-btnn" data-direction="stop">Stop</button>
        <button class="direction-btn" data-direction="right">→</button>
    </div>
    <div class="control-panel">
        <button class="direction-btn" data-direction="backward">↓</button>
    </div>

  <script>
    $(document).ready(function() {
    $('.direction-btn, .direction-btnn').click(function() {
        const direction = $(this).data('direction');
        sendDirection(direction);
    });

    function sendDirection(direction) {
        const validDirections = ["backward", "stop", "left", "right", "forward"];
        if (!validDirections.includes(direction)) {
            return;
        }
        const xhr = new XMLHttpRequest();
        const url = `store_direction.php?direction=${encodeURIComponent(direction)}`;
        xhr.open("GET", url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    swal({
                        title: "Data successfully stored",
                        text: direction,
                        icon: "success",
                        timer: 2000,
                        button: false,
                        className:"Dire"
                    });
                    
                }
            }
        };
        xhr.send();
    }
});

</script>
</body> 
</html>
```
- This code creates a web page for a robot control panel with buttons to control its movement.
- The control panel has buttons for "Forward," "Backward," "Left," "Right," and "Stop" directions.
- The web page includes CSS styling to make the buttons look visually appealing.
- The JavaScript code uses jQuery to handle button clicks and AJAX requests.
- When any direction button is clicked, the `sendDirection()` function is called with the selected direction as a data attribute.
- The `sendDirection()` function checks if the selected direction is valid (one of "backward," "stop," "left," "right," or "forward").
- If the direction is valid, an AJAX request is sent to the server with the selected direction as a parameter.
- When the AJAX request is successful, the SweetAlert library is used to show a success message with the stored direction, which disappears after 2 seconds.

## 2. PHP Code to Connect and Store Directions in the Database
```
<?php

$conn = mysqli_connect('localhost', 'root', '', 'control');

// Checking for connections
if (!$conn) {
    echo "Not Connected";
}

if (isset($_GET['direction'])) {
    $direction = $_GET['direction'];
    $sql = "INSERT INTO control (direction) VALUES ('$direction')";
    mysqli_query($conn, $sql);
}

?>
```
- This PHP code connects to a MySQL database and stores the direction received from the control panel page.
- It establishes a connection to the MySQL database using `mysqli_connect()`.
- If the script receives a direction (sent as a GET parameter), it inserts that direction into the database using an SQL query.

## 3. PHP Code to Retrieve Last Direction
```
<?php
$conn = mysqli_connect('localhost', 'root', '', 'control');

$sql = "SELECT direction FROM control ORDER BY id DESC LIMIT 1";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    echo $row["direction"];
} else {
    echo "0 results";
}

mysqli_close($conn);

?>
```
- This PHP code connects to the same MySQL database and retrieves the last direction that was stored.
- It queries the database for the last inserted direction using an SQL query with `ORDER BY id DESC LIMIT 1`. This ensures that the most recent direction is fetched.
- If the query returns a result, it prints the direction on the page. Otherwise, it displays "0 results".


## 4. Task Execution:
![image1](https://github.com/LatifahAbuhamamah/Control-Panel/blob/main/1.png)
![image2](https://github.com/LatifahAbuhamamah/Control-Panel/blob/main/2.png)
![image3](https://github.com/LatifahAbuhamamah/Control-Panel/blob/main/3.png)
![image4](https://github.com/LatifahAbuhamamah/Control-Panel/blob/main/4.png)










## .5 Algorithm for Linking "Retrieve Last Direction" Page to Engines

**Step1: Receive the Direction**
   - Capture the direction from the control panel or any input source.

**Step2: Mapping Directions to Actions**
   - Create a mapping between the received directions and the corresponding actions to be executed by the robot's motors or actuators.
   - For example:
     - If the direction is "Forward," instruct the motors to move the robot forward.
     - If the direction is "Left," adjust the motors to turn the robot to the left.
     - If the direction is "Right," adjust the motors to turn the robot to the right.
     - If the direction is "Backward," set the motors to move the robot backward.
     - If the direction is "Stop," stop the motors to halt the robot's movement.

**Step3: Control the Robot's Engines:**
   - Based on the received direction, execute the corresponding action as mapped in step 2.
   - Use appropriate signals, commands, or data to control the robot's motors or actuators.
   - The actual implementation of this step will depend on the hardware and communication interface used to control the robot.

**Step4: Safety Measures (Important)**
   - Implement safety measures to handle exceptional cases, such as collisions, out-of-range values, or emergency stops.
 
