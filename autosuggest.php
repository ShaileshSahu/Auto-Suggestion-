<?php




function isAjax()
{
	
	return isset($_SERVER['HTTP_X_REQUESTED_WITH'])&& $_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest';
}

if(!isAjax())
{
	exit;
}

function checkIt($choice,$query)
{
	return strpos($choice,$query)===0;
}


function search($query,$choices)
{
	$d_query =strtolower($query);
	$match =[];
	foreach($choices as $choice)
	{
		$d_choice = strtolower($choice);
		  if(checkIt($d_choice,$d_query))
		  {
			  $match[] = $choice;
		  }
	}
	return $match;
}
  $query =(isset($_GET['query']))?$_GET['query']:0;

           $choices = file("data.txt",FILE_IGNORE_NEW_LINES);

 $suggestion = search($query,$choices);
  sort($suggestion);
  $complete_suggestion =array_slice($suggestion,0,5);
    echo json_encode($complete_suggestion );
?>