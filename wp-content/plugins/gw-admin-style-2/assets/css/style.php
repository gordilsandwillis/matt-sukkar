<? 
  require(substr(dirname( __FILE__), 0, -4)."/includes/scss.inc.php");
  scss_server::serveFrom(substr(dirname( __FILE__ ),0,-4)."/sass/");
?>