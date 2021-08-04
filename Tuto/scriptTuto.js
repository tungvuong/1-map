var isFirstTimeTuto = false;
var textFirstPopup = 'Hey ! This is how to start a discussion with someone ! You can be 4 max in a bubble.';
var textSecondPopup = 'You can also use the chat to communicate ! ';
var targetObjectTutoBubble ='Tutobubble';
var targetObjectTutoChat ='tutoChat';
var targetObjectTutoExplanation ='tutoExplanation';
var popUpExplanation = undefined;
var enterSoundUrl = "webrtc-in.mp3";
var exitSoundUrl = "webrtc-out.mp3";
var soundConfig = {
    volume : 0.2,
    loop : false
}

const mic = new webkitSpeechRecognition();
mic.continuous = true;
mic.lang = 'en-US';

function launchTuto (){
    WA.openPopup(targetObjectTutoBubble, textFirstPopup, [
        {
            label: "Next",
            className: "popUpElement",
            callback: (popup) => {
                popup.close();
                console.log('engaged with agent');

                WA.openPopup(targetObjectTutoChat, textSecondPopup, [
                    {
                        label: "Open Chat",
                        className: "popUpElement",
                        callback: (popup1) => {
                            WA.sendChatMessage("Hey you can talk here too!", 'WA Guide');
                            popup1.close();
                            WA.openPopup("TutoFinal","You are good to go! Go through the gate to meet the dev team and discover the features !",[
                                {
                                    label: "Got it!",
                                    className : "success",callback:(popup2 => {
                                        popup2.close();
                                        WA.restorePlayerControl();
                                        WA.loadSound(winSoundUrl).play(soundConfig);
                                    })
                                }
                            ])
                        }
                    }

                ])
            }
        }
    ]);
    WA.disablePlayerControl();

}


/*WA.onEnterZone('popupZone', () => {
    WA.displayBubble();
    WA.loadSound(enterSoundUrl).play(soundConfig);
    if (!isFirstTimeTuto) {
        isFirstTimeTuto = true;
        launchTuto();
    }
    else {
        popUpExplanation = WA.openPopup(targetObjectTutoExplanation, 'Do you want to review the explanation?', [
            {
                label: "No",
                className: "error",
                callback: (popup) => {
                    popup.close();
                }
            },
            {
                label: "Yes",
                className: "success",
                callback: (popup) => {
                    popup.close();
                    launchTuto();
                }
            }
        ])
    }
});

WA.onLeaveZone('popupZone', () => {
    if (popUpExplanation !== undefined) popUpExplanation.close();
    WA.removeBubble();
    WA.loadSound(exitSoundUrl).play(soundConfig);
})*/


WA.onEnterZone('popupZone', () => {
    // WA.nav.openCoWebSite("https://www.youtube.com/embed/BGSghRuCDJI?autoplay=1&muted=0",false,"autoplay");
    WA.nav.openCoWebSite("https://localhost/girltalk/tenor.gif",false,"microphone");
    mic.start();
    mic.onstart = function() { 
        var msg = new SpeechSynthesisUtterance('Hello World');
        window.speechSynthesis.speak(msg);
        // WA.loadSound("takeorder.mp3").play(soundConfig);
        console.log('speak');

    };

    mic.onerror = function(e) { console.log(e); };
    mic.onend = function() { console.log('end'); mic.start(); };
    mic.onresult = function(event) {
        ans = ""
        for (var i = event.resultIndex; i< event.results.length; ++i) {
            if (event.results[i].isFinal){
                 console.log(event.results[i][0].transcript);
                 ans = event.results[i][0].transcript;
             }
        }
        if ( ans.includes("chicken") ){
            WA.loadSound("drink.mp3").play(soundConfig);
        }
        if ( ans.includes("water") ){
            WA.loadSound("dessert.mp3").play(soundConfig);
        }
        if ( ans.includes("cake") ){
            WA.loadSound("check.mp3").play(soundConfig);
        }
        if ( ans.includes("thank") ){
            WA.loadSound("thank.mp3").play(soundConfig);
        }
        //console.log(res);
    };

    // popUpPlay = WA.openPopup("tutoExplanation", "Title", [{
    //     label: "SEE",
    //     className: "success",
    //     callback: (popup) => {
    //         WA.nav.openCoWebSite("https://www.youtube.com/embed/BGSghRuCDJI?autoplay=1",false,"autoplay");
    //     }
    // }]);
    //WA.nav.openCoWebSite("https://www.youtube.com/embed/BGSghRuCDJI?autoplay=1", false,"autoplay");
});

WA.onLeaveZone('popupZone', () => {
    WA.nav.closeCoWebSite();
    // if(popUpPlay !== undefined) popUpPlay.close();
});
