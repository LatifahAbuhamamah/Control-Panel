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

