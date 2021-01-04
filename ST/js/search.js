function figcapSearch() {
    var input, filter, month, fc, a, i, j, txtValue, flag;
    input = document.getElementById("figcapSearch");
    filter = input.value.toUpperCase();
    month = document.getElementsByClassName("month");
    for(i = 0; i < month.length; i++) {
       fc = month[i].getElementsByTagName("figcaption");
       month[i].style.display ="inline-block";
       flag = false;
       for(j = 0; j<fc.length; j++) {
         a = fc[j];
         txtValue = a.innerHTML;
         if (txtValue.toUpperCase().indexOf(filter) > -1) {
            fc[j].parentElement.parentElement.style.display = "inline-block";
            flag = true;
         } else {
            fc[j].parentElement.parentElement.style.display = "none";
        }
       }
       if(flag) {month[i].style.display = "inline-block"} else {month[i].style.display = "none"}
    }
}

var css = "#figcapSearch{background-image: url(/ST/images/search.svg);background-size: 25px;background-position: 10px 12px;background-repeat: no-repeat;width: 50%;font-size: 16px;padding: 12px 20px 12px 40px;  border: 1px solid #ddd;margin-bottom: 12px;}";

var style = newel(document.body,"style",{innerText:css});
