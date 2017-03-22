	var suggestion =document.getElementById("suggestion");;
		var search = document.getElementById("search");
		var form = document.getElementById("form-search");

		function otput(result)
		{
			output ='';
			for(i=0;i<result.length;i++)
			{
				output+="<li><a href='complete.php?q="+result[i]+"'>"+result[i]+"</a></li>";
			}

			return output;
		}

		function show(result)
		{
			$li_op = otput(result);
			suggestion.style.display= "block";
			suggestion.innerHTML = $li_op;
		}
		function searching()
		{
			var q = search.value;
			if(q.length<3)
			{
				suggestion.style.display="none";
				return
			}
			var xhr = new XMLHttpRequest();
			xhr.open("GET","autosuggest.php?query="+q,true);
			xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState==4&&xhr.status==200)
				{
					var result = JSON.parse(xhr.responseText);

					show(result);
				}
			}
			xhr.send();
		}

		search.addEventListener("input",searching);
