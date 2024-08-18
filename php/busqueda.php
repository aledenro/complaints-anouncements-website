<?php
include 'dbConnection.php';

$keyword = $_GET['keyword'];

$sql = "CALL search_content(?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $keyword);
$stmt->execute();
$result = $stmt->get_result();

$results = [];
while ($row = $result->fetch_assoc()) {
    $results[] = $row;
}

header('Content-Type: application/json');
echo json_encode($results);

$stmt->close();
$conn->close();
?>
