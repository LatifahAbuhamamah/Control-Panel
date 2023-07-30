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
            margin: 40px;
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
        .swal-button--ok {
        background-color:#17617E ; 
        color: #ffffff; 
        }
        .swal-button--ok:hover {
        background-color: rgb(116, 180, 208);
        }
       .swal-button--lastValue {
        background-color: #a72754; 
        color: #ffffff; 
       }
        .swal-button--lastValue:hover {
        background-color: rgb(116, 180, 208);
        }

        .swal-error--error {
        background-color:#17617E ; 
        color: #ffffff; 
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
                width: 200px;
            }
        }
    
    </style>
</head>
<body>
    <h1>Robot Control Panel</h1>
    <div class="control-panel">
        <button class="direction-btn" data-direction="Forward">↑</button>
    </div>
    <div class="control-panel">
        <button class="direction-btn" data-direction="Left">←</button>
        <button class="direction-btnn" data-direction="Stop">Stop</button>
        <button class="direction-btn" data-direction="Right">→</button>
    </div>
    <div class="control-panel">
        <button class="direction-btn" data-direction="Backward">↓</button>
    </div>

    <script>
        $(document).ready(function() {
            $('.direction-btn').click(function() {
                const direction = $(this).data('direction');
                sendDirection(direction);
            });

            function sendDirection(direction) {
                const validDirections = ["Backward", "Stop", "Left", "Right", "Forward"];
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
                                buttons: {
                                    ok: {
                                        text: "OK",
                                        value: "ok",
                                        className: "swal-button--ok",
                                    },
                                    lastValue: {
                                        text: "Last Value?",
                                        value: "lastValue",
                                        className:"swal-button--lastValue",
                                    },
                                },
                            }).then((value) => {
                                if (value === "lastValue") {
                                    window.location.href = "get_direction.php";
                                }
                            });
                        } else {
                            swal({
                                title: "Error",
                                text: "Failed to store data",
                                icon: "error",
                                className:"swal-error--error",
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
This code creates a web page for a robot control panel. It includes some styling with CSS and uses jQuery for handling button clicks and making AJAX requests.
- The HTML part defines the layout of the control panel with buttons for different directions (Forward, Backward, Left, Right, Stop).
- CSS is used to style the page, including button appearance and colors.
- The JavaScript code uses jQuery to simplify event handling. When any direction button is clicked, it calls the `sendDirection()` function, passing the direction as a data attribute.
- The `sendDirection()` function checks if the selected direction is valid. If it is, it sends an AJAX request to the server to store the direction using the SweetAlert library to show success or error messages.

## 2. PHP Code to Store Direction
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
This PHP code connects to a MySQL database and stores the direction received from the control panel page.
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
    echo "    " . $row["direction"];
} else {
    echo "0 results";
}

mysqli_close($conn);

?>
```
This PHP code connects to the same MySQL database and retrieves the last direction that was stored.

- It queries the database for the last inserted direction using an SQL query with `ORDER BY id DESC LIMIT 1`. This ensures that the most recent direction is fetched.
- If the query returns a result, it prints the direction on the page. Otherwise, it displays "0 results".











## 2. Task Execution:
![img1](https://github.com/LatifahAbuhamamah/Control-Panel-Using-PhP/blob/main/Robot-CP.png)

![img2](https://github.com/LatifahAbuhamamah/Control-Panel-Using-PhP/blob/main/Data.png)

![img3](https://github.com/LatifahAbuhamamah/Control-Panel-Using-PhP/blob/main/Database.png)
### Screen recording showcasing the task execution
https://github.com/LatifahAbuhamamah/Control-Panel-Using-PhP/assets/139233344/88289945-2e09-4d0c-b547-2ba3a0f26dfc

















### 3. Algorithm for Linking Page with the Engines:

**Receive the Direction:**
   - Capture the direction from the control panel or any input source.

**Mapping Directions to Actions:**
   - Create a mapping between the received directions and the corresponding actions to be executed by the robot's motors or actuators.
   - For example:
     - If the direction is "Forward," instruct the motors to move the robot forward.
     - If the direction is "Left," adjust the motors to turn the robot to the left.
     - If the direction is "Right," adjust the motors to turn the robot to the right.
     - If the direction is "Backward," set the motors to move the robot backward.
     - If the direction is "Stop," stop the motors to halt the robot's movement.

**Control the Robot's Engines:**
   - Based on the received direction, execute the corresponding action as mapped in step 2.
   - Use appropriate signals, commands, or data to control the robot's motors or actuators.
   - The actual implementation of this step will depend on the hardware and communication interface used to control the robot.

**Safety Measures (Important):**
   - Implement safety measures to handle exceptional cases, such as collisions, out-of-range values, or emergency stops.
 


