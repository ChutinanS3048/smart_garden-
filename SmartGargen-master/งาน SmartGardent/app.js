(function(){

    // Initialize Firebase
    const config = {
    apiKey: "AIzaSyB094fPQCWyBhdpFtXmooOHKJSjN0IoNBk",
    authDomain: "smartgarden-b9bb2.firebaseapp.com",
    databaseURL: "https://smartgarden-b9bb2.firebaseio.com",
    projectId: "smartgarden-b9bb2",
    storageBucket: "smartgarden-b9bb2.appspot.com",
    messagingSenderId: "227042628549"
    };

    firebase.initializeApp(config);

    /* Get Element */ 
    const showTem   = document.getElementById('temperature');   //ตัวแปร temperature 
    const showHum   = document.getElementById('Humidtity');     //ตัวแปร Humidtity
    const showSoil1  = document.getElementById('soil1');          //ตัวแปร Soil1
    const showSoil2  = document.getElementById('soil2');          //ตัวแปร Soil2
    

    const showHoursTime1 = document.getElementById('Hours');        //ตัวแปรเวลาชั่วโมงสวนแรก
    const showMinTime1 = document.getElementById('Min');            //ตัวแปรเวลานาทีสวนแรก
    const showHoursTime2 = document.getElementById('Hours2');        //ตัวแปรเวลาชั่วโมงสวนแรก
    const showMinTime2 = document.getElementById('Min2');            //ตัวแปรเวลานาทีสวนแรก

    const showWater1 = document.getElementById('water-stat1');       //ตัวแปรเก็บสถานะว่ารดน้ำอยู่เปล่า1
    const showWater2 = document.getElementById('water-stat2');      //ตัวแปรเก็บสถานะว่ารดน้ำอยู่เปล่า2

    const showifSet1 = document.getElementById('showtime1');        //ตัวแปรเก็บสถานะเวลา 1
    const showifSet2 = document.getElementById('showtime2');        //ตัวแปรเก็บสถานะเวลา 2
   


    /**  create References */
    const dbRefTem = firebase.database().ref('Sensor/Temperature'); //สร้างตัวแปร อุณหภูมิอ้างอิง กับ Firebase
    const dbRefHum = firebase.database().ref('Sensor/Humidtity');  //สร้างตัวแปร ความชื้นในอากาศอ้างอิง กับ Firebase
    const dbRefSoil1 = firebase.database().ref('Sensor/Soil1');      //สร้างตัวแปร ความชื้นในดินอ้างอิง กับ Firebase
    const dbRefSoil2 = firebase.database().ref('Sensor/Soil2');      //สร้างตัวแปร ความชื้นในดินอ้างอิง กับ Firebase

    const dbRefHours1 = firebase.database().ref('Time/Hours');      //สร้างตัวแปร เวลาชั่วโมงสวนแรกอ้างอิง กับ firebase 
    const dbRefMin1 = firebase.database().ref('Time/Min');      //สร้างตัวแปร เวลาชั่วโมงสวนแรกอ้างอิง กับ firebase 
    const dbRefHours2 = firebase.database().ref('Time2/Hours2');      //สร้างตัวแปร เวลาชั่วโมงสวนแรกอ้างอิง กับ firebase 
    const dbRefMin2 = firebase.database().ref('Time2/Min2');      //สร้างตัวแปร เวลาชั่วโมงสวนแรกอ้างอิง กับ firebase 
    
    const dbRefwater1 = firebase.database().ref('Input Status/status1');    //สร้างตัวแปร สถานะไว้แสดงหน้าเว็บ ทำงาน1
    const dbRefwater2 = firebase.database().ref('Input Status/status2');    //สร้างตัวแปร สถานะไว้แสดงหน้าเว็บ ทำงาน2

    const dbRefState1 = firebase.database().ref('Input Status/StateTime1')  //สร้า่งตัวแปรไว้อ้างอิง สถานะการตั้งเวลา
    const dbRefState2 = firebase.database().ref('Input Status/StateTime2')  //สร้า่งตัวแปรไว้อ้างอิง สถานะการตั้งเวลา
    
    
        

    /* Listening when value  Changed */
    

    dbRefHum.on('value',snap =>{
        showHum.innerText = snap.val();
    });

    dbRefSoil1.on('value',snap =>{
        showSoil1.innerText = snap.val();
    });

    dbRefSoil2.on('value',snap =>{
        showSoil2.innerText = snap.val();
    });
   
    dbRefTem.on('value',snap =>{
        showTem.innerText = snap.val();
    });

        
        
    /* แสดงว่าตั้งเวลาแรก */
    dbRefState1.on('value',snap =>{
        dbRefState1.once("value").then(function(dataSnapshot){
        var anothercheck =  dataSnapshot.val();
        if(anothercheck==1){
            showifSet1.innerText = "ตั้งเวลาไว้ที่";
            dbRefHours1.on('value',snap =>{
                showHoursTime1.innerText = snap.val()+ "นาฬิกา";
            });

            dbRefMin1.on('value',snap =>{
                showMinTime1.innerText = snap.val()+ "นาที";
            });
        }
        else{
            showifSet1.innerText = "ไม่ได้ตั้งเวลา";
            showHoursTime1.innerText =""; 
            showMinTime1.innerText ="";
        }
        });
    });
    

    /*แสดงว่าตั้งเวลาสอง */
    dbRefState2.on('value',snap =>{
        dbRefState2.once("value").then(function(dataSnapshot){
        var anothercheck2 =  dataSnapshot.val();
        if(anothercheck2==1){
            showifSet2.innerText = "ตั้งเวลาไว้ที่";
            dbRefHours2.on('value',snap =>{
                showHoursTime2.innerText = snap.val()+ "นาฬิกา";
            });

            dbRefMin2.on('value',snap =>{
                showMinTime2.innerText = snap.val()+ "นาที";
            });
        }
        else{
            showifSet2.innerText = "ไม่ได้ตั้งเวลา";
            showHoursTime2.innerText =""; 
            showMinTime2.innerText ="";
        }
        });
    });


    
    /* แสดงสถานะเปิด/ปิด  อันแรก */
    dbRefwater1 .on('value',snap =>{
        dbRefwater1.once("value").then(function(dataSnapshot){
        var waterStat = dataSnapshot.val();
        if( waterStat ==1){
            showWater1.innerText = "สถานะรดน้ำ : กำลังทำงาน ";
        }
        else{
            showWater1.innerText = "สถานะรดน้ำ : ปิดใช้งาน ";
        }
        });
    });

    
     /* แสดงสถานะเปิด/ปิด  อันสอง*/
     dbRefwater2 .on('value',snap =>{
        dbRefwater2.once("value").then(function(dataSnapshot){
        var waterStat2 = dataSnapshot.val();
        if( waterStat2 ==1){
            showWater2.innerText = "สถานะรดน้ำ : กำลังทำงาน ";
        }
        else{
            showWater2.innerText = "สถานะรดน้ำ : ปิดใช้งาน ";
        }
        //alert(waterStat);
        //alert(dataSnapshot.val());
        });
    });
    

    firebase.auth().onAuthStateChanged(function (user){
        if (user) {
            // User is signed in
            document.getElementById('coltrol').style.display = "block";
            document.getElementById('login').style.display = 'none';
             hideSomething();
           
        } else {
            // No user is signed in
            document.getElementById('coltrol').style.display = 'none';
            document.getElementById('login').style.display = 'block';
            
        }
    });

}());

/* ตั้งเวลา อันแรก */
function SetTime(){
    /** อ้างอิงตัวแปรจาก firebase  */
    var Hours = firebase.database().ref('Time');
    var Min = firebase.database().ref('Time');
    
    /*รับค่ามาจาก input */
    var Gettime = (document.getElementById('timepicker').value);
    var Time1=  parseInt(document.getElementById('timepicker').value);
    var Time2 =  parseInt(Gettime.substr(3));
    /** อัพเดทตัวแปรเวลาใน firebase  */
    Hours.update({
        "Hours" : Time1 
    });
    Min.update({
        "Min" : Time2
    });
    
    alert("ตั้งเวลาไว้ที่ :" + Time1 +" นาฬิกา"+Time2 +" นาที");
}

/* ตั้งเวลาชุดที่2 */
function setTime2(){

    /** อ้างอิงตัวแปรชุดที่2จาก firebase  */
    var Hours2 = firebase.database().ref('Time2');
    var Min2   = firebase.database().ref('Time2');

    /*รับค่ามาจาก input ของ garden 2 */
    var gettime2 =  (document.getElementById('timepicker').value);
    var time3   =  parseInt(document.getElementById('timepicker').value);
    var time4   =  parseInt(gettime2.substr(3));

    /* อัพเดทตัวแรปเวลาชุดที่2 ใน firebase */
    Hours2.update({
        "Hours2" :time3 
    });
    Min2.update({
        "Min2" : time4
    });
    

    alert("ตั้งเวลาไว้ที่ :" + time3+" นาฬิกา"+time4+"นาที");
}


/* ทำหน้ำที่รับ input มากจาก switch 1*/
function WaterStatus1(status) {
    /* อ้างอิงตัวแปรจาก firebase */
    var Status1= firebase.database().ref('Input Status');
    var set;
    if (status == 1) {
       
        Status1.update({
        "status1" : 1
       });
        set = 1;
    }
    else{
        Status1.update({
        "status1" : 0
        });
         set = 0;
    }
    
   // alert(set);
}

function WaterStatus2(status) {
    /* อ้างอิงตัวแปรจาก firebase */
    var Status2= firebase.database().ref('Input Status');

    /*รับค่า status มาจาก input check swtich  */
    //var checkStatus = document.getElementById("Water-status2").checked ;

    if (status == 1) {
       
        Status2.update({
        "status2" : 1
       });
       var set = 1;
    }
    else{
        Status2.update({
        "status2" : 0
        });
        var set = 0;
    }
   // alert(set);
}

/*  เปิด/ปิด ตัวตั้งเวลา*/
$(function () {
    /** อ้างอิงตัวแปรจาก firebase  */
    var StateTime1 = firebase.database().ref('Input Status'); //ชุดแรก
    var StateTime2 = firebase.database().ref('Input Status');// ชุดสอง

    /* สวนแรก */
    $("#Onshow").click(function () {
        if ($(this).is(":checked")) {
            $("#Magic").show();
            StateTime1.update({
                "StateTime1" : 1
            });
        } 
        else {
            $("#Magic").hide();
            StateTime1.update({
                "StateTime1" : 0
            });
        }
        
    });
    /* สวนสอง */
    $("#Onshow2").click(function () {
        if ($(this).is(":checked")) {
            $("#Magic2").show();
            StateTime2.update({
                "StateTime2" : 1
            });
        } 
        else {
            $("#Magic2").hide();
            StateTime2.update({
                "StateTime2" : 0
            });
        }
        
    });
});

/* ส่วน login และ logout */
   

    function login(){ 
        var userEmail = document.getElementById('email').value;
        var userPass = document.getElementById('password').value;
        //alert(userEmail +":"+ userPass);
        //alert("Login succeed ")
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error:" + errorMessage);
        // ...
    });
  
    }
    function logout(){
    
         firebase.auth().signOut();
        
    }

    /** function ซ่อนเว็บ */
    $(function hideSomething(){
              $("#login").hide();
    });

    /** function เปลี่ยนสีตาม */
    
    /* เวลาอันเก่า */
    