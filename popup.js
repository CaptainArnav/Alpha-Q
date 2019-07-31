$(function(){
    
    $('#show_input').text("spoiler", "alert");
    chrome.storage.sync.get(['words'],function(array){
        $('#show_input').text(array.words);
    });

    $('#add_input').click(function(){
        chrome.storage.sync.get(['words'],function(array){
            var newArray= [];
            if (array.words){
                newArray.push(array.words);
            }

            var newWord = $('#text_input').val();
            if (newWord){
                newArray.push(newWord);
            }

            chrome.storage.sync.set({'words': newArray}, function(){               
            });
            $('#show_input').text(newArray);
            $('#text_input').val('');

           

        });
    });

    $("#clear_input").click(function(){
        newArray = ["spoiler", "alert"];
        chrome.storage.sync.set({'words': newArray}, function(){
            var notifOptions = {
                    type: "basic",
                    iconUrl: "hello_extensions.png",
                    title: "Words reset!",
                    message: "The keyword list has been reset."
            };
            chrome.notifications.create('limitNotif', notifOptions);
             
        });
        $('#show_input').text(newArray);;      
    });

    $("#addMovie").click(function(){
        var selectedMovie = $("#movieList").children("option:selected").attr('id');
        
        if(selectedMovie != 'a')
        {

            var addKeyword=[];
            switch(selectedMovie){
                case "b":
                    addKeyword = ["Rock Hammer", "Red", "escapes", "hole", "mexico", "arrested", "andy","wrongful imprisonment","escape from prison",
                    "prison","suicide","prison cell search","infidelity","prison yard","rita hayworth","prison guard","imprisonment","suicide by gunshot","solitary confinement","shawshank","basalt","carving"];
                    break;
                case "c":
                    addKeyword = ["andrew", "mental", "teddy", "edward","mental asylum","cave","memory","anagram","psycho"];
                    break;
                case "d":
                    addKeyword = ["split", "insomnia","ikea","suicide","consumerism","alter ego","sexual desire","mental instability","alienation","violence","testicular cancer","schizophrenia","rage","shot in head","death","identity"];
                    break;
                case "e":
                    addKeyword = ["twin", "dies", "tesla","magician","diary","murder","death","canary","generator","lookalike","pantaloon","englishman","sledgehammer","fame","watch","rubber ball"];
                    break;
                case "f":
                    addKeyword = ["space travel", "wormhole","astronaut","black hole","morse code","morse","dust storm","giant wave","tidal wave","time dilation","cryogenic","embryo","escape pod",""];
                    break;
                case "g":
                    addKeyword = ["recycling robot", "pollution", "soil","plant"]
                    break;
            };

            chrome.storage.sync.get(['words'],function(array){
                var newArray=[];
                if(search(array.words, addKeyword))
                {
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "hello_extensions.png",
                        title: "Movie already added!",
                        message: "The movie keywords are already included in the list."
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
                else
                {    
                    if(array.words){
                    newArray= (array.words).concat(addKeyword);
                    };
                    chrome.storage.sync.set({'words': newArray}, function(){               
                        $('#show_input').text(newArray);
                    });
                };

                
            });
        };
    });
   
    function search(arr1, arr2){
        var there=0;
        for(var i=0; i < arr1.length; i++){
            if(arr1[i] == arr2[0]){
                there = 1;
            };
            for(var j=0; j< arr2.length; j++){
                if( arr1[i+j] != arr2[j])
                {
                    there=0;
                };
            };
            if(there == 1){break;};
            
        };
        return there;
    };

});
