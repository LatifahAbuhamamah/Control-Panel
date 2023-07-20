# Control-Panel-Using-PHP
## 1. Explanation of the Control Panel HTML&PHP files
### HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control Panel</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 50px auto;
            padding: 50px;
            color: #17617E;
        }
        .control-panel {
            display: flex;
            justify-content: center;
        }
        .direction-btn {
            background-color: #297b9b;
            color: #fff;
            font-size: 20px;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            margin: 10px;
            cursor: pointer;
            box-shadow: 0px 2px 5px rgba(132, 31, 31, 0.2);
        }
        .direction-btnn {
            background-color: #a72754;
            color: #fff;
            font-size: 20px;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            margin: 10px;
            cursor: pointer;
            box-shadow: 0px 2px 5px rgba(132, 31, 31, 0.2);
            
        }
        .direction-btn:hover {
            background-color: rgb(116, 159, 208);

        }
    </style>
  </head>
<body>
        <h1>Robot Control Panel</h1>
        <div class="control-panel">
            <button class="direction-btn" onclick="move('Forward')">↑</button> 
        </div>
        <div class="control-panel">
            <button class="direction-btn" onclick="move('Left')">←</button>
            <button class="direction-btnn" onclick="move('Stop')">Stop</button>
            <button class="direction-btn" onclick="move('Right')">→</button>
        </div>
        <div class="control-panel">
            <button class="direction-btn" onclick="move('Backward')">↓</button>
        </div>   
        <script>
        function move(direction) {
        window.location.href = "getdata.php?move=" + direction;
         }
        </script>
   </body>
</html>
```

- The provided code is an HTML file representing a simple control panel for a robot. It allows users to control the robot's movements using directional buttons (forward, backward, left, right, and stop). The control panel consists of a few buttons, each representing a specific direction.
- The HTML structure includes a title, a set of buttons, and a script section for JavaScript.
- The buttons are styled using CSS to have a specific appearance.
- Each button is associated with an `onclick` event that triggers a JavaScript function called `move()` when clicked.
- The `move()` function is responsible for redirecting the user to the `getdata.php` file with a parameter indicating the desired direction
### PHP
```

<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "controlpanel1_db";

$conn = mysqli_connect($host, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_GET['move'])) {
    $direction = mysqli_real_escape_string($conn, $_GET['move']);
    $sql = "INSERT INTO directions (direction) VALUES ('$direction')";
    mysqli_query($conn, $sql);
}

$sql = "SELECT direction FROM directions ORDER BY id DESC LIMIT 1";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    echo "    " . $row["direction"];
} else {
    echo "0 results";
}
?>
```
- This PHP code connects to a MySQL database and handles the data from a control panel for a robot. When a direction is selected on the control panel, the code saves it in the database. Then, it retrieves and displays the last direction that was saved in the database.

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
 


