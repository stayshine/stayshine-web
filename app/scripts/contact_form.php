<?php
// Constants
define("DATABASE", "mgrover_stayshine_contactform");
define("USER", "mgrover_scontact");
define("PASS","K0ntax1@2");

// Get the user input
@ $first_name  = trim($_POST['fName']);
@ $last_name   = trim($_POST['lName']);
@ $email       = trim($_POST['email']);
@ $phone       = trim($_POST['phone']);
@ $service     = trim($_POST['service']);
@ $information = trim($_POST['information']);

if ( empty($first_name) || empty($last_name) || empty($email) )
{
	echo '<h2>You forgot to insert important information</h2>';
	echo '<p>Please <a href=\"mailto:mike@stayshine.com\">email mike@stayshine.com</a></p>';
	exit;
}

// Connect to mysql
$mysql = mysqli_connect('localhost', USER, PASS);
if (!$mysql) {
	echo 'Cannot connect to database';
	echo '<p>Please <a href=\"mailto:mike@stayshine.com\">email mike@stayshine.com</a></p>';
	exit;
}
// Select the right database
$selected = mysqli_select_db( $mysql, DATABASE);
if (!$selected)
{
	echo '<h2>Unable to access the database</h2>';
	echo '<p>Please <a href=\"mailto:mike@stayshine.com\">email mike@stayshine.com</a></p>';
	exit;
}

// Make query for the database entry
$query = "INSERT INTO `mgrover_stayshine_contactform`.`contact_form` (`ID`, `firstName`, `lastName`, `email`, `phone`, `service`, `information`) VALUES (NULL, '{$first_name}', '{$last_name}', '{$email}', '{$phone}', '{$service}', '{$information}')";

$insert = mysqli_query($mysql, $query);

// check if the insert came back ok
if (!$insert)
{
	echo '<h2>Unable to insert information into table</h2>';
	echo '<p>Please <a href=\"mailto:mike@stayshine.com\">email mike@stayshine.com</a></p>';
}

echo '<h2>Thank you very much!</h2><br>'
    ."<p>$first_name, we look forward to speaking with you very shortly!</p>";
?>


<?php
// Email information to myself part of php form
$myEmail = 'mike@stayshine.com';
$subject = 'New Stayshine Form Recieved!';
$message = 'Name: '.$first_name.' '.$last_name."\n"
           .'Email: '.$email."\n"
           .'Phone: '.$phone."\n"
           .'Service: '.$service."\n"
           .'Info: '.$information;

mail($myEmail,$subject, $message);

?>

