/*function beforeValidate(form) {
	alert('je');
   if ( form.data('zavrzi') ) {
	   alert('je');
        this.validateOnSubmit = false;
        this.beforeValidate = '';
        form.submit();
        return false;
    }
    return true;
}*/
$(document).ready(function() {
  //checkKoledar();
});

//var img_count=100; // samo nek id za slike v $_POST

// Simulates PHP's date function
Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(i-1>=0&&format.charAt(i-1)=="\\"){returnStr+=curChar}else if(replace[curChar]){returnStr+=replace[curChar].call(this)}else if(curChar!="\\"){returnStr+=curChar}}return returnStr};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate()},D:function(){return Date.replaceChars.shortDays[this.getDay()]},j:function(){return this.getDate()},l:function(){return Date.replaceChars.longDays[this.getDay()]},N:function(){return this.getDay()+1},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')))},w:function(){return this.getDay()},z:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((this-d)/86400000)}, W:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((((this-d)/86400000)+d.getDay()+1)/7)},F:function(){return Date.replaceChars.longMonths[this.getMonth()]},m:function(){return(this.getMonth()<9?'0':'')+(this.getMonth()+1)},M:function(){return Date.replaceChars.shortMonths[this.getMonth()]},n:function(){return this.getMonth()+1},t:function(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),0).getDate()},L:function(){var year=this.getFullYear();return(year%400==0||(year%100!=0&&year%4==0))},o:function(){var d=new Date(this.valueOf());d.setDate(d.getDate()-((this.getDay()+6)%7)+3);return d.getFullYear()},Y:function(){return this.getFullYear()},y:function(){return(''+this.getFullYear()).substr(2)},a:function(){return this.getHours()<12?'am':'pm'},A:function(){return this.getHours()<12?'AM':'PM'},B:function(){return Math.floor((((this.getUTCHours()+1)%24)+this.getUTCMinutes()/60+this.getUTCSeconds()/ 3600) * 1000/24)}, g:function(){return this.getHours()%12||12},G:function(){return this.getHours()},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12)},H:function(){return(this.getHours()<10?'0':'')+this.getHours()},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes()},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds()},u:function(){var m=this.getMilliseconds();return(m<10?'00':(m<100?'0':''))+m},e:function(){return"Not Yet Supported"},I:function(){return"Not Yet Supported"},O:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+'00'},P:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+':00'},T:function(){var m=this.getMonth();this.setMonth(0);var result=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,'$1');this.setMonth(m);return result},Z:function(){return-this.getTimezoneOffset()*60},c:function(){return this.format("Y-m-d\\TH:i:sP")},r:function(){return this.toString()},U:function(){return this.getTime()/1000}};
Date.prototype.setDateFromForm=function(dateText){
	if(dateText.length >= 10){
		var datum = dateText.substr(0,10);
		var datumArray = datum.split(".");
		this.setDate(datumArray[0]);//dan
		this.setMonth(datumArray[1]-1);//mesec
		this.setFullYear(datumArray[2]);//leto
	}	
	/*if(dateText.length >= 16){
		var cas = dateText.substr(11);
		var casArray=cas.split(".");
	
	}*/
}

function pocisti(pl, o){
	o.content=strip_tags(o.content,'');
}

function startDateChanged(dateText, inst){
	
	if(dateText.length >= 10){
		var date = new Date();
		var start_date = new Date();
		var today = new Date();
		//spremeni datum objave na pet dni pred dogodkom
		start_date.setDateFromForm(dateText);
		start_date.setDate(start_date.getDate()-5);
		if (start_date>today){			
			var target = $('#Vsebine_publish_up');
			target.val(start_date.format('d.m.Y')+target.val().substr(10));
		}
		//spremeni datum konca objave na dan po dogodku
		date.setDateFromForm(dateText);
		date.setDate(date.getDate()+1);
		$('#Vsebine_publish_down').val(date.format('d.m.Y'));
		
		//nastavi začetno vrednost koledarja na datumu konca dogodka
		$('#Vsebine_end_date').datepicker("option", "defaultDate", dateText);
	}	
}

function endDateChanged(dateText, inst){
	//spremeni datum konca objave na dan po dogodku
	if(dateText.length >= 10){
		var date = new Date();
		date.setDateFromForm(dateText);
		date.setDate(date.getDate()+1);		
		$('#Vsebine_publish_down').val(date.format('d.m.Y'));
	}	
}

function split(val) {
	return val.split(/,\s*/);
}
function extractLast(term) {
	return split(term).pop();
}

function addTag(element, tag) {
	 var terms = split(element.value);
     // remove the current input
     terms.pop();
     // add the selected item
     //if not exists in array already
     if(terms.indexOf(tag) == -1 ){
    	 terms.push( tag );
     }
     // add placeholder to get the comma-and-space at the end
     terms.push('');
     element.value = terms.join(', ');
     
}

function addTagFromSelect(element, selectList){
	tag = selectList.options[selectList.selectedIndex].text; //preberi vrednost
	trimmed = $.trim(element.value); //počisti space
	if(trimmed.length > 0 && trimmed.substr(trimmed.length - 1) != ','){ //če ni vejice, jo dodaj
		element.value=element.value+',';
	}
	addTag(element, tag);
}

function addTagFromCbx(element, cbx, tags){
	if(cbx.checked){
		tags=split(tags);
		for(i=0; i<tags.length; i=i+1){
			addTag(element, tags[i]);
		}
	}
}

function checkKoledar(chbox){
	if($("#Vsebine_koledar").is(':checked')){
		$("#Vsebine_koledar_naslov").removeAttr("disabled");
		$("#Vsebine_start_date").removeAttr("disabled");
		$("#Vsebine_end_date").removeAttr("disabled");
		$("#Vsebine_event_cat").removeAttr("disabled");
		if(!$.trim($("#Vsebine_koledar_naslov").val()).length){
			$("#Vsebine_koledar_naslov").val($("#Vsebine_title").val());
		}
	}else{
		$("#Vsebine_koledar_naslov").attr("disabled", "disabled");
		$("#Vsebine_start_date").attr("disabled", "disabled");
		$("#Vsebine_end_date").attr("disabled", "disabled");
		$("#Vsebine_event_cat").attr("disabled", "disabled");
	}
}

function kopirajNaslov(){
	input = $("#id_jajca_copytemplate td:first input");
	if(!$.trim(input.val()).length)
		input.val($("#Vsebine_title").val());
	$("table.mmf_table").removeClass("hide");
}

function nalozi_sliko(file_id, success, loading_img){ //id od input file brez #, success funkcija, loading img z #
	//file_index = file_index || 0; // default parameter
	console.log("nalozi_sliko");
	var input = document.getElementById(file_id);
	var len = input.files.length;
	var i,j=0,k=0;
	for ( i=0; i < len; i++ ) { // za vsak file
		$("#loading_img").css('display','inline');
		file = input.files[i];

//		if (!!file.type.match(/image.*/)) {
//			success = function (res) {
//				if(slika=parseResult(res)){
//		 			vstavi_sliko('#slike', 2, slika);
//		 			
////			  		jInsertEditorText(slika_za_clanek(res), 'Vsebine_fulltext');
//			  		
//				}
//				$("#loading-img2").css('display','none');
//			}			
//			nalozi_sliko('nalozi_sliko', success, i, "#loading-img2");
//		}else{
//			alert('To pa že ni slika!');
//		}
	
		extension = input.files[i].name.split('.').pop().toLowerCase(); //preberi extension
		if(file_id == "priponke"){
			console.log("priponke");
			if($.inArray(extension, ["doc", "docx", "xls", "xlsx",
		                             "pdf", "odt", "jpg", "gif", "png",
		                             "tif", "tiff", "jpeg", "mp3", "zip"]) == -1) {
				alert('Datoteke vrste '+extension+' ni dovoljeno nalagati.');
				if (i==len-1 && j==k)
					$(loading_img).css('display','none');
				continue;			
			}
		}
		else{
			console.log("slike");
			if($.inArray(extension, ["jpg", "gif", "png",
		                             "tif", "tiff", "jpeg"]) == -1) {         //preveri, če gre za sliko
			   
				alert('To pa že ni slika.');
				if (i==len-1 && j==k)
					$(loading_img).css('display','none');
			    continue;
			}
		}
		
		var formdata = false;  
		 if (window.FormData) {  
		     formdata = new FormData();  
		     formdata.append("images[]", input.files[i]);
		     //document.getElementById("btn").style.display = "none";  
		 } 
		 //alert(formdata);
		//var data={activeFile: encodeURIComponent($('#Vsebine_activeFile').val())};
		//$.post(ajax_url, data, function(data){alert(data);})
		 if (file_id=="priponke"){
			 formdata.append("priponka", 1);
		 }
		 if (formdata) {
			 wrapped_success = function (res){
				console.log("wrapped_success");
				k=k+1;
				success(res);
				if(j==k){
					$(loading_img).css('display','none');
				}
			}
			j=j+1;
			$(loading_img).css('display','inline');
			console.log("before ajax");
			$.ajax({
				url: ajax_url, //se zgenerira v php-ju
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: wrapped_success,
			});
			console.log("after ajax");
		}
	}
	$("#"+file_id).val(''); //počisti, da se ob objavi ne nalaga še enkrat
}

function nalozi_sliko_iz_url(input_selector, success){ 
	
	extension = $(input_selector).val().split('.').pop().toLowerCase(); //preberi extension
	if($.inArray(extension, ['gif','png','jpg','jpeg', 'bmp']) == -1) {         //preveri, če gre za sliko
	    alert('To pa že ni slika!');
	    return false;
	}
	
	  
    formdata = false;  
	 if (window.FormData) {  
	     formdata = new FormData();  
	     formdata.append("image_url", $(input_selector).val());
	     //document.getElementById("btn").style.display = "none";  
	 } 
	 //alert(formdata);
	//var data={activeFile: encodeURIComponent($('#Vsebine_activeFile').val())};
	//$.post(ajax_url, data, function(data){alert(data);})
	 if (formdata) {
			$.ajax({
				url: ajax_url_url, //se zgenerira v php-ju
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: success,
			});
		}
	  
}

function vstavi_sliko(container_selector, mesto_prikaza, slika_obj, width, allowDelete){
	width = width || '264px'; // default parameter
	if (allowDelete === undefined) allowDelete = true; // defsault value
	
	deleteImgStyle="";
	if(allowDelete)deleteImgStyle="width:16px;float:right;";
	else deleteImgStyle="width:16px;float:right;display:none;";
	
	$('<div />', {
			id:'slika_'+img_count
		}).css({width: width, float: 'left'}).append(
			$('<a/>', {
				href: "#",
				'class': "delete_img"
					}
			).append(
					$('<img/>',{
							src:base_url+'/slike/delete_16.gif',
							alt:"izbrisi",
							title:"izbriši",
							style:deleteImgStyle
					})),
			$('<a/>', {
				href: "#",
				'class': "crop_img"
					}
			).append(
					$('<img/>',{
							src:base_url+'/slike/image-crop.png',
							alt:"obreži",
							title:"obreži",
							style:"width:16px;float:right;"
					})),
			$('<img/>', {
				src: slika_obj.url2,
				class: "slikca-"+slika_obj.id
			}).css('width', width),
			$('<input/>', {
				type:'hidden', 
				name: 'Slike['+img_count+'][zp_st]',
				id: 'slika_'+img_count+'_zp_st',
				'class': 'zp_st'
			})
			,
			$('<input/>', {
				type:'hidden', 
				name: 'Slike['+img_count+'][id_slike]',
				id: 'slika_'+img_count+'_id_slike',
				'class': 'id_slike',
				value: slika_obj.id
			}),
			$('<input/>', {
				type:'hidden', 
				name: 'Slike['+img_count+'][mesto_prikaza]',
				id: 'slika_'+img_count+'_mesto_prikaza',
				'class': 'mesto_prikaza',
				value: mesto_prikaza
			})
		).appendTo(container_selector);
		$('#'+'slika_'+img_count+'_zp_st').val($('#'+'slika_'+img_count).index()+1); //nastavi zp_st
		img_count=img_count+1;
}

function vstavi_priponko(container_selector, slika_obj){
	deleteImgStyle="width:16px;";

	
	$('<div />', {
			id:'slika_'+img_count
		}).append(
			
//			$('<a/>', {
//				href: "#",
//				'class': "crop_img"
//					}
//			).append(
//					$('<img/>',{
//							src:base_url+'/slike/image-crop.png',
//							alt:"obreži",
//							title:"obreži",
//							style:"width:16px;float:right;"
//					})),
			$('<a/>', {
				href: slika_obj.url,
				class: "slikca-"+slika_obj.id,
				target: "_blank"
			}).append(slika_obj.ime_slike),
			$('<a/>', {
				href: "#",
				'class': "delete_img"
					}
			).append(
					$('<img/>',{
							src:base_url+'/slike/delete_16.gif',
							alt:"izbrisi",
							title:"izbriši",
							style:deleteImgStyle
					})),
			$('<input/>', {
				type:'hidden', 
				name: 'Slike['+img_count+'][zp_st]',
				id: 'slika_'+img_count+'_zp_st',
				'class': 'zp_st'
			})
			,
			$('<input/>', {
				type:'hidden', 
				name: 'Slike['+img_count+'][id_slike]',
				id: 'slika_'+img_count+'_id_slike',
				'class': 'id_slike',
				value: slika_obj.id
			}),
			$('<input/>', {
				type:'hidden', 
				name: 'Slike['+img_count+'][mesto_prikaza]',
				id: 'slika_'+img_count+'_mesto_prikaza',
				'class': 'mesto_prikaza',
				value: 4
			})
		).appendTo(container_selector);
		$('#'+'slika_'+img_count+'_zp_st').val($('#'+'slika_'+img_count).index()+1); //nastavi zp_st
		img_count=img_count+1;
}

function slika_za_clanek(src){
	return '<img src=\"'+src+'\" style="float:right;width:265px;" />';
}

$(document).ready(function () {
	
	var textUrl = document.getElementById("Vsebine_slika");
	$("#slike").sortable({
		stop: function () {
		        var inputs = $('input.zp_st');
		        //var nbElems = inputs.length;
		        $('input.zp_st').each(function(idx) {
		            $(this).val(1 + idx);
		        });
		}
	});
	$("#galerija").sortable({
		stop: function () {
		        var inputs = $('input.zp_st');
		        //var nbElems = inputs.length;
		        $('input.zp_st').each(function(idx) {
		            $(this).val(1 + idx);
		        });
		}
	});
	$("#priponke_div").sortable({
		stop: function () {
		        var inputs = $('input.zp_st');
		        //var nbElems = inputs.length;
		        $('input.zp_st').each(function(idx) {
		            $(this).val(1 + idx);
		        });
		}
	});
	$('input').live("keypress", function(e) {
	    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	    if(key == 13) {
		e.preventDefault();
		//$(this).trigger("change");
	        e.preventDefault();
	        var inputs = $(this).closest('form').find(':focusable');
	        inputs.eq( inputs.index(this)+ 1 ).focus();
	    }
	});
		//formdata = false;
	//alert(input);
	function showUploadedItem (source) {
  		var img  = document.getElementById("slika");
  		img.src = source;
	}   

//	if (window.FormData) {
//  		formdata = new FormData();
//  		document.getElementById("btn").style.display = "none";
//	}
	
	var input = document.getElementById("Vsebine_activeFile");
	
 	input.addEventListener("change", function (evt) {
 		//document.getElementById("response").innerHTML = "Uploading . . ."
				success =function (res) {
					if(slika=parseResult(res)){
						$("#naslovna_slika").empty(); //izprazni prejšnjo sliko
			 			vstavi_sliko('#naslovna_slika', 1, slika, '264px', false); //naloži novo
			 			vstavi_sliko('#slike', 2, slika);
			 			$("#Vsebine_slika").val(slika.url2); //zapiši url
					}					
				}
				nalozi_sliko('Vsebine_activeFile', success, "#loading-img1");
				
//				if ( window.FileReader ) {
//					reader = new FileReader();
//					reader.onloadend = function (e) { 
//						showUploadedItem(e.target.result);
//					};
//					reader.readAsDataURL(file);
//				}
//				if (formdata) {
//					formdata.append("images[]", file);
//				}

		
	}, false);
 	
 	$("#Vsebine_slika").change(function(){ //input za url onchange
 		if($("#Vsebine_slika").val()!=""){
 			success = function (res) {
 				if(slika=parseResult(res)){
					$("#naslovna_slika").empty(); //izprazni prejšnjo sliko
		 			vstavi_sliko('#naslovna_slika', 1, slika, '264px', false); //naloži novo
		 			vstavi_sliko('#slike', 2, slika);
		 			$("#Vsebine_slika").val(slika.url2); //zapiši url
 				}
 				$("#loading-img1").css('display','none');
 			}
 			$("#loading-img1").css('display','inline');
 			nalozi_sliko_iz_url("#Vsebine_slika", success);
//	 		$("#slika").attr('src', $("#Vsebine_slika").val()); //nastavsi src, da prikaže sliko
//	 		$("#Vsebine_activeFile").val("");
//	 		jInsertEditorText(slika_za_clanek($("#Vsebine_slika").val()), 'Vsebine_fulltext');
 		}
 	});
 	$("#nalozi_sliko").change(function(){ //input za file
				success = function (res) {
					if(slika=parseResult(res)){
			 			vstavi_sliko('#slike', 2, slika);
					}
				}			
				nalozi_sliko('nalozi_sliko', success, "#loading-img2");
		

		//$("#loading-img2").css('display','none');
		
 	});
 	
 	$("#vstavi_sliko").change(function(){ //input za url onchange
 		if($("#vstavi_sliko").val()!=""){
 	 			success = function (res) {
 	 				if(slika=parseResult(res)){
	 		 			vstavi_sliko('#slike', 2, slika);
	 		 			$("#vstavi_sliko").val('');
 	 				}
 	 				$("#loading-img2").css('display','none');
 	 			}
 	 			$("#loading-img2").css('display','inline');
 	 			nalozi_sliko_iz_url("#vstavi_sliko", success);
 		}
 	});
 	$("#Vsebine_video").change(function(){ //input za url onchange
 		if($("#Vsebine_video").val()!=""){
	 		split=$("#Vsebine_video").val().split('=');
	 		embed='<iframe style="display: block; margin: auto;" width="420" height="315" src="http://www.youtube.com/embed/'+split[1]+'" frameborder="0" allowfullscreen></iframe>';
	 		$("#video").empty();
	 		$("#video").append(embed);
 		}else{
 			$("#video").empty();
 		}
 	});
 	$("#nalozi_galerijo").change(function(){ //input za url onchange
	
		success = function (res) {
				if(slika=parseResult(res)){
					vstavi_sliko('#galerija', 3, slika, '100px');
					//jInsertEditorText(slika_za_clanek(res), 'Vsebine_fulltext');
				}
			}	
		
		nalozi_sliko('nalozi_galerijo', success, "#loading-img3");
			
		
 	});
 	$("#priponke").change(function(){ //input za url onchange
			success = function (res) {
					if(slika=parseResult(res)){
			 			vstavi_priponko('#priponke_div', slika);			  		
					}
				}	
			nalozi_sliko('priponke', success, "#loading-img4");
		
 	});
 	$("a.delete_img").live("click", function(){ //izbrisi sliko
		$(this).parent().remove();
		return false;
 	});
 	$("a.crop_img").live("click", function(){ //izbrisi sliko
 		
 		id_slike=$(this).siblings('input.id_slike').val();
 		$.ajax({
			url: ajax_url_crop, //se zgenerira v php-ju
			type: "GET",
			data: 'id='+id_slike,
			processData: false,
			contentType: false,
			success: function(data){ $('#popup').html(data);
										$("#popup").dialog("open");
 									},
		});
		return false;
 	});
 	
 	//alert($("table.mmf_table tr").length);
 	//skrij tabelo, če ni dogodkov
 	if($("table.mmf_table tr").length==2){
 		$("table.mmf_table").addClass("hide");
 	};
 	
 	$('#ikona_nalozi_sliko').click(function(){
		$('#Vsebine_activeFile').trigger('click');
		return false;
	});
});

function parseResult(res){
	try{
			result=JSON.parse(res);
			if(result[1]!="")alert(result[1]); //msg
			return result[0];
		}		 					
	catch(err){alert(err.message);alert(res);return false;}
}

function strip_tags (str, allowed_tags)
{

    var key = '', allowed = false;
    var matches = [];    var allowed_array = [];
    var allowed_tag = '';
    var i = 0;
    var k = '';
    var html = ''; 
    var replacer = function (search, replace, str) {
        return str.split(search).join(replace);
    };
    // Build allowes tags associative array
    if (allowed_tags) {
        allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
    }
    str += '';

    // Match tags
    matches = str.match(/(<\/?[\S][^>]*>)/gi);
    // Go through all HTML tags
    for (key in matches) {
        if (isNaN(key)) {
                // IE7 Hack
            continue;
        }

        // Save HTML tag
        html = matches[key].toString();
        // Is tag not in allowed list? Remove from str!
        allowed = false;

        // Go through all allowed tags
        for (k in allowed_array) {            // Init
            allowed_tag = allowed_array[k];
            i = -1;

            if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
            if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
            if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}

            // Determine
            if (i == 0) {                allowed = true;
                break;
            }
        }
        if (!allowed) {
            str = replacer(html, "", str); // Custom replace. No regexing
        }
    }
    return str;
}

