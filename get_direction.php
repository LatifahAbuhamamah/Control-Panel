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
