const avengersNames = ['Thor', 'Cap', 'Tony Stark', 'Black Panther', 'Black Widow', 'Hulk', 'Spider-Man'];
let randomName = avengersNames[Math.floor(Math.random() * avengersNames.length)];

let meetingId;
let name;


const main = async () => {
    /* Events handlers */
    VoxeetSDK.conference.on('streamAdded', (participant, stream) => {
        if (stream.type === 'ScreenShare') return addScreenShareNode(stream);
        addVideoNode(participant, stream);
        addParticipantNode(participant);
    });

    VoxeetSDK.conference.on('streamRemoved', (participant, stream) => {
        if (stream.type === 'ScreenShare') return removeScreenShareNode();
        removeVideoNode(participant);
        removeParticipantNode(participant);
    });

    VoxeetSDK.conference.on('participants', (user) => {
        console.log("User", user);
    });
    

    try {
        await VoxeetSDK.initialize('OWRuY2ZjcDhhaHM1aA==', 'NGw3ajZvMjlvYzhycGhjaDk1Z25icWlkazY=');
        
        await VoxeetSDK.session.open({ name: name });
        initUI();
    } catch (e) {
        alert('Something went wrong : ' + e);
    }
}

window.onload = function(){

    const queryString = window.location.search;
    console.log(queryString);

    const urlParams = new URLSearchParams(queryString);
    console.log("urlParams", urlParams);


    
    if(urlParams.has('id')){
        meetingId = urlParams.get('id');
        console.log("meting url", meetingId);
    }

    if(urlParams.has('name')){
        name = urlParams.get('name');
        console.log("name url", name);
    }
    main();
}

