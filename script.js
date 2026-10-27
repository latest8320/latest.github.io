const door1 = document.getElementById("d1");
const door2 = document.getElementById("d2");
const door3 = document.getElementById("d3");
const SB = document.getElementById("SB");
const PlayCountText = document.getElementById("playCountText");
const winRateText = document.getElementById("winRateText");
const RB = document.getElementById("RB");
const repeat10 = document.getElementById("repeat10");
const repeat100 = document.getElementById("repeat100");
const repeat1000 = document.getElementById("repeat1000");
const customrepeat = document.getElementById("customrepeat")
const repeatC = document.getElementById("repeatC")
const animaToggle = document.getElementById("animaToggle");

let selectedDoor;
let canChoose = true;
let cardoor; 
let openedDoor;
let playCount = 0;
let winCount = 0;

chooseCarDoor();

let possibleDoors = [];

door1.addEventListener(
    "click",
    () => {
        if (canChoose) {
            door1.style.borderColor = "green";
            door2.style.borderColor = "maroon";
            door3.style.borderColor = "maroon";
            SB.style.display = "block";
            selectedDoor = door1;
            openGoatDoor();
            canChoose = false;
        }
    }
)

door2.addEventListener(
    "click",
    () => {
        if (canChoose) {
            door1.style.borderColor = "maroon";
            door2.style.borderColor = "green";
            door3.style.borderColor = "maroon";
            SB.style.display = "block";
            selectedDoor = door2;
            openGoatDoor();
            canChoose = false;
        }
    }
)

door3.addEventListener(
    "click",
    () => {
        if (canChoose) {
            door1.style.borderColor = "maroon";
            door2.style.borderColor = "maroon";
            door3.style.borderColor = "green";
            SB.style.display = "block";
            selectedDoor = door3;
            openGoatDoor();
            canChoose = false;
        }
    }
)

SB.addEventListener(
    "click",
    () => {
        let switchedDoor;

        if (door1 !== selectedDoor && door1 !== openedDoor) {
            switchedDoor = door1;
        }

        if (door2 !== selectedDoor && door2 !== openedDoor) {
            switchedDoor = door2;
        }

        if (door3 !== selectedDoor && door3 !== openedDoor) {
            switchedDoor = door3;
        }

        switchedDoor.style.borderColor = "green"
        selectedDoor.style.borderColor = "maroon"

        if (switchedDoor === cardoor) {
            revealDoor(switchedDoor, "🚗");
        } else {
            revealDoor(switchedDoor, "🐐");
        }

        if (selectedDoor === cardoor) {
            revealDoor(selectedDoor, "🚗");
        } else {
            revealDoor(selectedDoor, "🐐");
        }

        playCount = playCount + 1
        PlayCountText.textContent = "시도 횟수 : " + playCount + "회"

        if (switchedDoor === cardoor) {
            winCount = winCount + 1
        }

        const winRate = ((winCount / playCount) * 100).toFixed(1);
            winRateText.textContent = "당첨 확률 : " + winRate + "%";
        
        SB.style.display = "none";
        RB.style.display = "block";
    }
);

RB.addEventListener(
    "click",
    () => {
        revealDoor(door1, "문");
        revealDoor(door2, "문");
        revealDoor(door3, "문");

        door1.style.borderColor = "maroon";
        door2.style.borderColor = "maroon";
        door3.style.borderColor = "maroon";

        selectedDoor = undefined;
        openedDoor = undefined;
        possibleDoors = [];

        canChoose = true;

        chooseCarDoor();

        RB.style.display = "none";
    }
);


SB.style.display = "none"
RB.style.display = "none"

repeat10.addEventListener(
    "click",
    () => {
        runAnimatedSimulation(10);
    }
);

repeat100.addEventListener(
    "click",
    () => {
        runAnimatedSimulation(100);
    }
);

repeat1000.addEventListener(
    "click",
    () => {
        runAnimatedSimulation(1000);
    }
);

repeatC.addEventListener(
    "click",
    () => {
        const times = Number(customrepeat.value);
        if(animaToggle.checked) {
            if(times >= 100000) {
                const continueSimulation = confirm(
                 "이렇게 하면 시간이 굉장히 오래 걸릴 수 있습니다.\n애니메이션을 끄시는 것을 권장드립니다.\n계속하시겠습니까?"
                );
                if (!continueSimulation) {
                    return;
                }
            }
            runAnimatedSimulation(times);
        } else {
            runSimulation(times);
        }
    }
);

function revealDoor(door, content) {
    door.classList.add("flip");
    setTimeout(
        () => {
            door.textContent=content;
            door.classList.remove("flip");
        },
        100
    );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function openGoatDoor() {
    possibleDoors = [];

    if (door1 !== selectedDoor && door1 !== cardoor) {
        possibleDoors.push(door1);
    }

    if (door2 !== selectedDoor && door2 !== cardoor) {
        possibleDoors.push(door2);
    }

    if (door3 !== selectedDoor && door3 !== cardoor) {
        possibleDoors.push(door3);
    }

    console.log(possibleDoors);

    const randomIndex = Math.floor(
        Math.random() * possibleDoors.length
    );

    openedDoor = possibleDoors[randomIndex];

    revealDoor(openedDoor, "🐐")
    openedDoor.style.borderColor = "grey"
}

function chooseCarDoor() {
    const randomNumber = Math.floor(Math.random() * 3);

    if (randomNumber === 0) {
        cardoor = door1;
    }

    if (randomNumber === 1) {
        cardoor = door2;
    }

    if (randomNumber === 2) {
        cardoor = door3;
    }
}

function runSimulation(times) {
    for (let i = 0; i < times; i = i + 1) {
        const carDoor = Math.floor(Math.random() * 3);
        const firstChoice = Math.floor(Math.random() * 3);
        playCount = playCount + 1;
        if (firstChoice !== carDoor) {
            winCount = winCount + 1;
        }
    }
    const winRate = ((winCount / playCount) * 100).toFixed(1);
    PlayCountText.textContent = "시도 횟수 : " + playCount + "회";
    winRateText.textContent = "당첨 확률 : " + winRate + "%";
}

async function runAnimatedSimulation(times) {
    const doors = [door1, door2, door3];
    for (let i = 0; i < times; i = i + 1) {
        door1.textContent = "문";
        door2.textContent = "문";
        door3.textContent = "문";

        door1.style.borderColor = "maroon";
        door2.style.borderColor = "maroon";
        door3.style.borderColor = "maroon";

        chooseCarDoor();

        const randomChoice = Math.floor(Math.random()*3);
        selectedDoor = doors[randomChoice];
        selectedDoor.style.borderColor = "green";
        await sleep(1);

        openGoatDoor();
        await sleep(1);

        let switchedDoor;
        if (door1 !== selectedDoor && door1 !== openedDoor) {
            switchedDoor = door1;
        }
        if (door2 !== selectedDoor && door2 !== openedDoor) {
          switchedDoor = door2;
        }  
        if (door3 !== selectedDoor && door3 !== openedDoor) {
           switchedDoor = door3;
        }
        switchedDoor.style.borderColor = "green";
        selectedDoor.style.borderColor = "maroon";
        await sleep(1);

        if (switchedDoor === cardoor) {
            revealDoor(switchedDoor, "🚗");
        } else {
            revealDoor(switchedDoor, "🐐");
        }
        if (selectedDoor === cardoor) {
           revealDoor(selectedDoor, "🚗");
        } else {
           revealDoor(selectedDoor, "🐐");
        }

        await sleep(1);

        playCount = playCount + 1;
        if (switchedDoor === cardoor) {
            winCount = winCount + 1;
        }
        const winRate = ((winCount / playCount)*100).toFixed(1);
        PlayCountText.textContent = "시도 횟수 : " + playCount + "회";
        winRateText.textContent = "당첨 확률 : " + winRate + "%";
    }
}