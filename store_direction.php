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


