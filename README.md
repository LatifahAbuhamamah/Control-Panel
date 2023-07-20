# Control-Panel-Using-PhP
## 1.Explanation of the Control Panel HTML&PHP
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
- This PHP code connects to a MySQL database and handles the data from a control panel for a robot. When a direction is selected on the control panel, the code saves it in the database. Then, it retrieves and displays the last direction that was saved in the database

#2.Screenshot of the completed task
![img1](
